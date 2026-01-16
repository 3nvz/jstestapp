/**
 * Intended middleware:
 * Protect admin routes
 */
function requireAdmin(req, res, next) {
  // Simulated authenticated user
  req.user = {
    id: "123",
    role: req.headers["x-role"] || "user"
  };

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "forbidden" });
  }

  next();
}

module.exports = { requireAdmin };
