const express = require("express");
const { requireAdmin } = require("../middlewares/requireAdmin");

const router = express.Router();

/**
 * Admin-only endpoint
 */
router.post(
  "/admin/export",
  requireAdmin,
  (req, res) => {
    res.json({
      status: "ok",
      data: "sensitive export data"
    });
  }
);

module.exports = router;
