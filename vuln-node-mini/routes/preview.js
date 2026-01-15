const express = require("express");
const { generatePreview } = require("../services/previewService");
const router = express.Router();

/**
 * Intended feature:
 * Preview a URL before sharing it
 */
router.get("/link/preview", async (req, res) => {
  const url = req.query.url; // attacker-controlled

  if (!url) {
    return res.status(400).json({ error: "url required" });
  }

  try {
    const body = await generatePreview(url);
    res.json({ preview: body.slice(0, 300) });
  } catch (e) {
    res.status(500).json({ error: "fetch failed" });
  }
});

module.exports = router;
