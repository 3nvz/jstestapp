const express = require("express");
const { requireRole } = require("../middlewares/requireRole");
const router = express.Router();

// ⬇️ decorator-style protection
router.get(
  "/admin/dashboard",
  requireRole("admin"),
  (req, res) => {
    res.json({ secrets: "admin-only data" });
  }
);

module.exports = router;
