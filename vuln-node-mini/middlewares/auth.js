/**
 * Simple auth middleware
 */
function authenticate(req, res, next) {
  // Simulate decoded JWT
  req.user = {
    id: "123",
    role: req.headers["x-role"] || "user" // attacker-controlled for demo
  };

  next();
}

module.exports = { authenticate };
