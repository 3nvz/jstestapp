const express = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { requireAdmin } = require("../middlewares/requireAdmin");

const router = express.Router();

// Looks protected (authenticate + requireAdmin)
router.get("/admin/keys", authenticate, requireAdmin, (req, res) => {
  res.json({ apiKeys: ["k_live_123", "k_live_456"] });
});

module.exports = router;
