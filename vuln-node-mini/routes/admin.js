const express = require("express");
const { requireAuth } = require("../middlewares/requireAuth");
const { requireAdmin } = require("../middlewares/requireAdmin");

const router = express.Router();

/**
 * ❌ BUG:
 * Middleware only applies to routes *defined after this line*
 */
router.use(requireAuth);
router.use(requireAdmin);

/**
 * Admin-only endpoint (protected)
 */
router.get("/admin/metrics", (req, res) => {
  res.json({ secrets: "top-secret-metrics" });
});

/**
 * ❌ VULNERABLE:
 * Route defined BEFORE middleware is added
 */
router.get("/admin/debug", (req, res) => {
  res.json({
    debug: "internal state",
    env: process.env
  });
});

module.exports = router;
