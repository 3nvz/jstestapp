const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "unauthenticated" });

  try {
    req.user = jwt.verify(auth.replace("Bearer ", ""), "secret");
    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
}

module.exports = { authenticate };