const { exec } = require("child_process");

/**
 * Intended helper:
 * Run a system health check
 *
 * Real bug:
 * Unsafely executes attacker-controlled input
 */
function runCommand(cmd) {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
    }
  });
}

module.exports = { runCommand };