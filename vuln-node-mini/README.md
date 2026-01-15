# vuln-node-mini (INTENTIONALLY VULNERABLE)

This is a tiny Node.js/Express app with **intentional vulnerabilities** for local testing/training.

## Quick start

```bash
cd vuln-node-mini
npm install
npm start
# open http://127.0.0.1:3000
```

## What’s vulnerable (high level)

- **SQL injection**: string-concatenated queries against SQLite.
- **Command injection**: `child_process.exec()` fed from a request param.
- **Path traversal / arbitrary file read**: `sendFile()` with an unsanitized path.
- **Reflected XSS**: unsafe rendering of user input.
- **Prototype pollution**: naive deep merge that allows `__proto__` / `constructor.prototype`.
- **Insecure auth**: hardcoded session secret, weak login logic.

> Only run this locally in a safe environment.

## Routes

- `/` – home
- `/search?q=` – SQLi-prone search
- `/admin/ping?host=` – command injection
- `/files?path=` – path traversal
- `/echo?msg=` – reflected XSS
- `/settings` (POST JSON) – prototype pollution via deep merge

