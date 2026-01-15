// Intentionally unsafe helpers

// VULNERABLE: naive deep merge allows prototype pollution
function deepMerge(target, source) {
  for (const key of Object.keys(source || {})) {
    const v = source[key];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], v);
    } else {
      target[key] = v;
    }
  }
  return target;
}

// VULNERABLE: simplistic “auth” check
function isLoggedIn(req) {
  return Boolean(req.cookies && req.cookies.user);
}

module.exports = { deepMerge, isLoggedIn };
