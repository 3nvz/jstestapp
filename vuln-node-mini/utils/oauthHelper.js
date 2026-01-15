/**
 * Intended helper:
 * Exchange OAuth code for user profile
 *
 * Real bug:
 * Does not bind OAuth response to initiating user/session
 */
async function exchangeCodeForProfile(code) {
  // Simulated OAuth provider response
  return {
    email: "victim@site.com",
    providerId: "oauth-123"
  };
}

module.exports = { exchangeCodeForProfile };
