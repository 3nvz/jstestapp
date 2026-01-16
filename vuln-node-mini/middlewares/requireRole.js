/**
 * Intended middleware:
 * Ensure user has required role
 *
 * Real bug:
 * Async check is not awaited → next() always runs
 */
async function requireRole(role) {
  return async function (req, res, next) {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "unauthenticated" });
    }

    // ❌ BUG: async check not awaited
    checkRole(user, role);

    // Execution continues regardless of result
    next();
  };
}

// Simulated async role check
async function checkRole(user, role) {
  if (user.role !== role) {
    throw new Error("forbidden");
  }
}

module.exports = { requireRole };
