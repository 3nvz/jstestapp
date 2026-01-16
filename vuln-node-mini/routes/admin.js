const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { requireRole } = require("../middlewares/requireRole");

const router = express.Router();

/**
 * Intended feature:
 * Admin-only endpoint
 */
router.get(
  "/admin/config",
  authenticate,
  requireRole("admin"), // ✅ looks protected
  (req, res) => {
    res.json({
      status: "ok",
      secretConfig: "admin-only configuration"
    });
  }
);

module.exports = router;
