const path = require("path");
const { readUserFile } = require("../utils/fileStore");

/**
 * Looks safe:
 * Encapsulates document logic
 */
function getDocument(userId, docName) {
  const userDir = path.join(__dirname, "../data/users", userId);

  return readUserFile(userDir, docName);
}

module.exports = { getDocument };
