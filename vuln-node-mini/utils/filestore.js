const fs = require("fs");
const path = require("path");

/**
 * Intended helper:
 * Read a user-owned file from storage
 *
 * Real bug:
 * No path boundary enforcement
 */
function readUserFile(baseDir, filename) {
  const fullPath = path.join(baseDir, filename);
  return fs.readFileSync(fullPath, "utf8");
}

module.exports = { readUserFile };