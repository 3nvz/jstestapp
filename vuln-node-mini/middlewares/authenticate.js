/**
 * Intended middleware:
 * Authenticate user
 */
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    // ❌ BUG: passing error to next() instead of blocking
    return next(new Error("unauthenticated"));
  }

  // Simulated decoded user
  req.user = {
    id: "123",
    role: req.headers["x-role"] || "user"
  };

  next();
}

module.exports = { authenticate };
