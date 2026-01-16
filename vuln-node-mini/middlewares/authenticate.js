const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next(); // optional auth (common pattern)

  try {
    const token = auth.replace("Bearer ", "");
    req.user = jwt.verify(token, "dev-secret");
  } catch (e) {
    // also optional: don't fail closed
    req.user = null;
  }

  next();
}

module.exports = { authenticate };
