const express = require("express");
const { runCommand } = require("../utils/runner");
const router = express.Router();

/**
 * Intended feature:
 * Allow users to ping a host for diagnostics
 */
router.get("/diagnostics/ping", (req, res) => {
  const host = req.query.host; // attacker-controlled

  if (!host) {
    return res.status(400).json({ error: "host required" });
  }

  // Looks safe at first glance
  const cmd = `ping -c 1 ${host}`;

  // ❌ Vulnerability is hidden in utils/runner.js
  runCommand(cmd);

  res.json({ status: "ping started" });
});

module.exports = router;