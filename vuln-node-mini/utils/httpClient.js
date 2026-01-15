const fetch = require("node-fetch");

/**
 * Intended helper:
 * Make outbound HTTP requests
 *
 * Real bug:
 * No restriction on destination
 */
async function fetchUrl(url) {
  const res = await fetch(url, { timeout: 3000 });
  return res.text();
}

module.exports = { fetchUrl };