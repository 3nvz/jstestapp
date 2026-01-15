const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

/**
 * Intended helper:
 * Extract uploaded ZIP archives
 *
 * Real bug:
 * No validation of entry paths (ZIP Slip)
 */
async function extractZip(zipPath, destDir) {
  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: destDir }))
    .promise();
}

module.exports = { extractZip };