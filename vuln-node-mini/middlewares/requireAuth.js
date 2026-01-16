/**
 * Intended middleware:
 * Require authenticated user
 */
function requireAuth(req, res, next) {
  // Simulate auth context
  req.user = {
    id: "123",
    role: req.headers["x-role"] || "user"
  };

  next();
}

module.exports = { requireAuth };
