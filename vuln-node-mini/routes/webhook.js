const express = require("express");
const bodyParser = require("body-parser");
const { processWebhook } = require("../services/webhookService");
const router = express.Router();

/**
 * Intended feature:
 * Receive trusted third-party webhooks
 */
router.post(
  "/webhook/receive",
  bodyParser.raw({ type: "*/*" }),
  (req, res) => {
    try {
      const event = processWebhook(req.headers, req.body);
      res.json({ status: "ok", event });
    } catch (e) {
      res.status(401).json({ error: e.message });
    }
  }
);

module.exports = router;
