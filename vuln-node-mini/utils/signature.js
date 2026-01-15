const crypto = require("crypto");

/**
 * Intended helper:
 * Verify webhook signatures
 *
 * Real bug:
 * Uses startsWith() on hex digest → partial match bypass
 */
function verifySignature(secret, payload, signature) {
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  // ❌ VULNERABLE: partial comparison
  return hmac.startsWith(signature);
}

module.exports = { verifySignature };
