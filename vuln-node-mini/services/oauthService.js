const { exchangeCodeForProfile } = require("../utils/oauthHelper");

// Fake DB
const users = {};

/**
 * Looks safe:
 * Central OAuth login handler
 */
async function oauthLogin(code) {
  const profile = await exchangeCodeForProfile(code);

  // ❌ VULNERABLE: auto-links account by email
  if (!users[profile.email]) {
    users[profile.email] = {
      email: profile.email,
      providerId: profile.providerId
    };
  }

  return users[profile.email];
}

module.exports = { oauthLogin };
