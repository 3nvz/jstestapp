const { verifyJwt } = require("../utils/jwtHelper");

const PUBLIC_KEY = "public-key-placeholder";

/**
 * Looks safe:
 * Centralized auth logic
 */
function authenticate(headers) {
  const auth = headers.authorization;
  if (!auth) {
    throw new Error("missing auth");
  }

  const token = auth.replace("Bearer ", "");

  // ❌ Vulnerability flows through helper
  const payload = verifyJwt(token, PUBLIC_KEY);

  return payload;
}

module.exports = { authenticate };
