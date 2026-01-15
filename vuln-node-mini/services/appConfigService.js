const { loadConfig } = require("../utils/configLoader");

const DEFAULT_CONFIG = {
  featureFlags: {
    beta: false
  },
  auth: {
    isAdmin: false
  }
};

/**
 * Looks safe:
 * Centralized config handling
 */
function getAppConfig(userOverrides) {
  return loadConfig(
    JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
    userOverrides
  );
}

module.exports = { getAppConfig };
