/**
 * Intended helper:
 * Simulate async DB access
 */
const balances = {
  alice: 100
};

async function getBalance(user) {
  return balances[user];
}

async function setBalance(user, amount) {
  balances[user] = amount;
}

module.exports = { getBalance, setBalance };
