const express = require("express");
const { charge } = require("../services/paymentService");
const router = express.Router();

/**
 * Intended feature:
 * Charge a user account
 */
router.post("/pay", express.json(), async (req, res) => {
  const { user, amount } = req.body; // attacker-controlled

  try {
    await charge(user, amount);
    res.json({ status: "payment successful" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
