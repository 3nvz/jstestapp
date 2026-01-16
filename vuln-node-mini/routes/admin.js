const express = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { requireAdmin } = require("../middlewares/requireAdmin");

const router = express.Router();

/**
 * Intended feature:
 * Admin-only endpoint
 */
router.get(
  "/admin/secrets",
  authenticate,
  requireAdmin,
  (req, res) => {
    // ❌ Handler still runs if error middleware is missing
    res.json({ secret: "admin-only secret data" });
  }
);

module.exports = router;
