const express = require("express");
const multer = require("multer");
const { importArchive } = require("../services/importService");
const router = express.Router();

const upload = multer({ dest: "/tmp/uploads" });

/**
 * Intended feature:
 * Allow users to import data via ZIP
 */
router.post("/import/data", upload.single("archive"), async (req, res) => {
  const userId = req.body.userId; // attacker-controlled

  if (!req.file || !userId) {
    return res.status(400).json({ error: "missing input" });
  }

  try {
    await importArchive(userId, req.file.path);
    res.json({ status: "imported" });
  } catch (e) {
    res.status(500).json({ error: "import failed" });
  }
});

module.exports = router;
