const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { exec } = require('child_process');

const { openDb, initDb } = require('./db');
const { deepMerge, isLoggedIn } = require('./utils');

initDb();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('hardcoded-session-secret')); // VULNERABLE: hardcoded secret
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use("/", require("./routes/profile"));
app.use("/", require("./routes/backup"));
app.use("/", require("./routes/fetch"));



// Global app settings object (intentionally mergeable)
const appSettings = {
  theme: { name: 'light' },
  security: { enableCsp: false }
};

app.get('/', (req, res) => {
  res.render('index', {
    user: req.cookies.user || null,
    settings: appSettings
  });
});

// VULNERABLE: reflected XSS (msg is rendered unescaped in template)
app.get('/echo', (req, res) => {
  res.render('echo', { msg: req.query.msg || '' });
});

// VULNERABLE: SQL injection via string concatenation
app.get('/search', (req, res) => {
  const q = req.query.q || '';
  const db = openDb();

  // INTENTIONAL BUG: string concatenation creates SQLi
  const sql = "SELECT id, owner, title, body FROM notes WHERE title LIKE '%" + q + "%'";

  db.all(sql, (err, rows) => {
    db.close();
    if (err) {
      return res.status(500).send('DB error: ' + err.message);
    }
    res.render('search', { q, rows });
  });
});

// VULNERABLE: command injection
app.get('/admin/ping', (req, res) => {
  if (!isLoggedIn(req)) {
    return res.status(401).send('Login required');
  }

  const host = req.query.host || '127.0.0.1';

  // INTENTIONAL BUG: command injection (no sanitization)
  exec('ping -c 1 ' + host, { timeout: 3000 }, (err, stdout, stderr) => {
    const out = (stdout || '') + (stderr || '');
    res.type('text/plain').send(out || (err ? String(err) : 'no output'));
  });
});

// VULNERABLE: path traversal / arbitrary file read
app.get('/files', (req, res) => {
  const p = req.query.path || 'README.md';

  // INTENTIONAL BUG: sendFile with user-controlled path
  const abs = path.join(__dirname, '..', p);
  res.sendFile(abs, (err) => {
    if (err) res.status(404).send('Not found');
  });
});

// Extremely weak "login" just to gate /admin/ping
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// VULNERABLE: weak auth, plain text passwords, no rate limiting, etc.
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = openDb();

  // INTENTIONAL BUG: SQL injection in login as well
  const sql = "SELECT username,is_admin FROM users WHERE username='" + (username || '') + "' AND password='" + (password || '') + "'";

  db.get(sql, (err, row) => {
    db.close();
    if (err || !row) {
      return res.status(401).render('login', { error: 'Invalid credentials' });
    }

    // INTENTIONAL BUG: unsigned cookie trust
    res.cookie('user', row.username);
    res.redirect('/');
  });
});

// VULNERABLE: prototype pollution via deepMerge into appSettings
app.post('/settings', (req, res) => {
  // Accept arbitrary JSON and merge into live settings
  const incoming = req.body || {};
  deepMerge(appSettings, incoming);
  res.json({ ok: true, settings: appSettings });
});

app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
});

// routes/profile.js
const express = require("express");
const router = express.Router();

let userProfile = {
  username: "admin",
  role: "user",
  isAdmin: false
};


function merge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] = target[key] || {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

router.post("/profile/update", express.json(), (req, res) => {
  const input = req.body; 

  merge(userProfile, input);

  if (userProfile.isAdmin === true) {
    return res.json({ status: "admin access granted" });
  }

  res.json({ status: "profile updated", profile: userProfile });
});

module.exports = router;

const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

router.post("/admin/backup", express.json(), (req, res) => {
  const { user } = req.body; 

  const cmd = `tar -czf /tmp/${user}.tar.gz /home/${user}`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ status: "backup complete" });
  });
});

module.exports = router;

const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

/**
 * Intended feature:
 * Fetch a preview of a user-supplied URL
 *
 * Real bug:
 * No validation → full SSRF
 */
router.get("/preview", async (req, res) => {
  const url = req.query.url; // attacker-controlled

  if (!url) {
    return res.status(400).json({ error: "url required" });
  }

  try {
    // ❌ VULNERABLE: unrestricted server-side fetch
    const r = await fetch(url, { timeout: 3000 });
    const body = await r.text();

    res.json({
      status: "ok",
      preview: body.slice(0, 500)
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

const express = require("express");
const path = require("path");
const router = express.Router();

/**
 * Intended feature:
 * Allow users to download their own uploaded files
 *
 * Real bug:
 * User controls file path → directory traversal
 */
router.get("/download", (req, res) => {
  const file = req.query.file; // attacker-controlled

  if (!file) {
    return res.status(400).json({ error: "file required" });
  }

  // ❌ VULNERABLE: no path normalization / allowlist
  const baseDir = path.join(__dirname, "../uploads");
  const fullPath = path.join(baseDir, file);

  res.sendFile(fullPath);
});

module.exports = router;

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`vuln-node-mini listening on http://127.0.0.1:${PORT}`);
});
