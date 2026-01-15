const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'data.sqlite');

function openDb() {
  return new sqlite3.Database(DB_PATH);
}

function initDb() {
  const db = openDb();

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      is_admin INTEGER NOT NULL DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    )`);

    // Seed data (very insecure passwords, intentional)
    db.get('SELECT COUNT(*) AS c FROM users', (err, row) => {
      if (err) return;
      if (row && row.c === 0) {
        db.run("INSERT INTO users(username,password,is_admin) VALUES('alice','alice123',0)");
        db.run("INSERT INTO users(username,password,is_admin) VALUES('admin','admin',1)");

        db.run("INSERT INTO notes(owner,title,body) VALUES('alice','Groceries','Eggs, milk, cereal')");
        db.run("INSERT INTO notes(owner,title,body) VALUES('admin','Secrets','Do not store secrets here')");
      }
    });
  });

  db.close();
}

module.exports = { openDb, initDb, DB_PATH };
