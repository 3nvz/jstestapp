const { fetchUrl } = require("../utils/httpClient");

/**
 * Looks safe:
 * Business logic layer
 */
async function generatePreview(targetUrl) {
  // Some light transformation to look legit
  const normalized = targetUrl.trim();

  return await fetchUrl(normalized);
}

module.exports = { generatePreview };
