const express = require("express");
const { authenticate } = require("../services/authService");
const router = express.Router();

/**
 * Intended feature:
 * Admin-only endpoint
 */
router.get("/admin/metrics", (req, res) => {
  try {
    const user = authenticate(req.headers);

    if (user.role !== "admin") {
      return res.status(403).json({ error: "forbidden" });
    }

    res.json({ status: "ok", secrets: "top-secret-metrics" });
  } catch (e) {
    res.status(401).json({ error: "unauthorized" });
  }
});

module.exports = router;
