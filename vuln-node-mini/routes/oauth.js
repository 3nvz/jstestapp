const express = require("express");
const { oauthLogin } = require("../services/oauthService");
const router = express.Router();

/**
 * Intended feature:
 * OAuth callback endpoint
 */
router.get("/auth/oauth/callback", async (req, res) => {
  const code = req.query.code; // attacker-controlled

  if (!code) {
    return res.status(400).json({ error: "missing code" });
  }

  try {
    const user = await oauthLogin(code);
    res.json({ status: "logged in", user });
  } catch (e) {
    res.status(500).json({ error: "login failed" });
  }
});

module.exports = router;
