const { verifySignature } = require("../utils/signature");

const WEBHOOK_SECRET = "super-secret-key";

/**
 * Looks safe:
 * Encapsulates webhook validation
 */
function processWebhook(headers, body) {
  const sig = headers["x-webhook-signature"];

  if (!sig) {
    throw new Error("missing signature");
  }

  // ❌ Vulnerability flows through helper
  if (!verifySignature(WEBHOOK_SECRET, body, sig)) {
    throw new Error("invalid signature");
  }

  // Process trusted event
  return JSON.parse(body);
}

module.exports = { processWebhook };
