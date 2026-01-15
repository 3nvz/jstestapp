function requireRole(role) {
  return function (req, res, next) {
    // In real apps this comes from JWT / session
    const user = req.user;

    if (!user || user.role !== role) {
      return res.status(403).json({ error: "forbidden" });
    }

    next();
  };
}

module.exports = { requireRole };
