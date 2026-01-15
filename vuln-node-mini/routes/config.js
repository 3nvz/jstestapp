const express = require("express");
const { getAppConfig } = require("../services/appConfigService");
const router = express.Router();

/**
 * Intended feature:
 * Allow users to preview config changes
 */
router.post("/config/preview", express.json(), (req, res) => {
  const overrides = req.body; // attacker-controlled JSON

  const config = getAppConfig(overrides);

  // Authorization depends on polluted property
  if (config.auth.isAdmin === true) {
    return res.json({ status: "admin mode enabled" });
  }

  res.json({ status: "preview ok", config });
});

module.exports = router;
