/**
 * Intended helper:
 * Load and merge user-provided config overrides
 *
 * Real bug:
 * Unsafe deep merge → prototype pollution
 */
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] = target[key] || {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

function loadConfig(defaults, overrides) {
  deepMerge(defaults, overrides); // ❌ pollution happens here
  return defaults;
}

module.exports = { loadConfig };
