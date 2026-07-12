'use strict';
const { execSync } = require('child_process');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../');

console.log("====================================================");
console.log("       STARTING MASTER VALIDATION SUITE             ");
console.log("====================================================");

// 2. Define the Test Execution Roster
// This scales to automatically incorporate our hardened tests.
const testRoster = [
    {
        name: "Steady-State Schema Audit",
        command: "bash systems/scripts/verify-steady-state.sh"
    },
    {
        name: "Adversarial Drift Test",
        command: "node tests/drift_adversary_test.js"
    },
    {
        name: "Soundness Test",
        command: "node tests/soundness_test.js"
    }
];

let failureCount = 0;

// 3. Execute Validation Matrix
for (const test of testRoster) {
    console.log(`\n▶️ Executing: ${test.name}...`);
    try {
        // Enforce execution from the PROJECT_ROOT regardless of where the runner was invoked
        execSync(test.command, { cwd: PROJECT_ROOT, stdio: 'inherit' });
    } catch (e) {
        console.error(`\n❌ [FAIL] ${test.name} triggered a pipeline halt.`);
        failureCount++;
    }
}

// 4. Final Aggregation & Hard Pipeline Exit
console.log("\n====================================================");
if (failureCount > 0) {
    console.error(`❌ MASTER VALIDATION FAILED: ${failureCount} test(s) failed.`);
    console.log("====================================================");
    process.exit(1);
} else {
    console.log("✅ MASTER VALIDATION PASSED: 100% System Integrity.");
    console.log("====================================================");
    process.exit(0);
}
