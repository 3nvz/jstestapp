/**
 * Intended middleware:
 * Require admin role
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "forbidden" });
  }

  next();
}

module.exports = { requireAdmin };
