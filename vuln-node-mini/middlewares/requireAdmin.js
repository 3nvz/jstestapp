/**
 * Intended middleware:
 * Require admin role
 */
function requireAdmin(req, res, next) {
  // ❌ BUG: allow preflight requests through
  if (req.method === "OPTIONS") {
    return next();
  }

  const role = req.headers["x-role"]; // simplified auth context

  if (role !== "admin") {
    return res.status(403).json({ error: "forbidden" });
  }

  next();
}

module.exports = { requireAdmin };
