const path = require("path");
const { extractZip } = require("../utils/unzipper");

/**
 * Looks safe:
 * Handles import logic
 */
async function importArchive(userId, zipPath) {
  const userDir = path.join(__dirname, "../data/users", userId);

  await extractZip(zipPath, userDir);
}

module.exports = { importArchive };
