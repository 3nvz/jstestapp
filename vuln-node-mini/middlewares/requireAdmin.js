/**
 * Intended: require admin
 * Bug: if user isn't set, it "lets it through" (fail-open)
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return next(); // ❌ VULNERABLE: should be 401/403, not allow
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "forbidden" });
  }

  next();
}

module.exports = { requireAdmin };
