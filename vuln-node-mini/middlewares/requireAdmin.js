/**
 * Intended middleware:
 * Require admin role
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return next(new Error("forbidden")); // ❌ BUG: should block, not pass error
  }

  next();
}

module.exports = { requireAdmin };
