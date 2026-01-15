const { getBalance, setBalance } = require("../utils/db");

/**
 * Looks safe:
 * Handles payment logic
 *
 * Real bug:
 * TOCTOU race condition
 */
async function charge(user, amount) {
  const balance = await getBalance(user);

  if (balance < amount) {
    throw new Error("insufficient funds");
  }

  // ❌ Race window between check and update
  await setBalance(user, balance - amount);
}

module.exports = { charge };
