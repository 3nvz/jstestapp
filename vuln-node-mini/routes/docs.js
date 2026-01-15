const express = require("express");
const { getDocument } = require("../services/docService");
const router = express.Router();

/**
 * Intended feature:
 * Users download their own documents
 */
router.get("/docs/download", (req, res) => {
  const userId = req.query.userId;   // attacker-controlled
  const doc = req.query.doc;         // attacker-controlled

  if (!userId || !doc) {
    return res.status(400).json({ error: "missing parameters" });
  }

  try {
    const content = getDocument(userId, doc);
    res.type("text/plain").send(content);
  } catch (e) {
    res.status(500).json({ error: "cannot read file" });
  }
});

module.exports = router;
