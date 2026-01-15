const jwt = require("jsonwebtoken");

/**
 * Intended helper:
 * Verify JWT tokens
 *
 * Real bug:
 * Algorithm not restricted → alg confusion
 */
function verifyJwt(token, key) {
  // ❌ VULNERABLE: accepts attacker-controlled alg
  return jwt.verify(token, key);
}

module.exports = { verifyJwt };
