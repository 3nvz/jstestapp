const express = require("express");
const router = express.Router();

/**
 * Admin endpoints
 */
router.get("/dashboard", (req, res) => {
  res.json({ secret: "admin dashboard data" });
});

router.get("/settings", (req, res) => {
  res.json({ secret: "admin settings" });
});

module.exports = router;
