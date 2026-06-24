const { execSync } = require('child_process');

console.log("--- AI-Ops Framework: Validation Suite ---");

try {
    execSync('bash systems/scripts/verify-steady-state.sh', { stdio: 'inherit' });
    console.log("[PASS] Integrity Audit Passed.");
} catch (e) {
    console.error("[FAIL] Integrity Audit Failed.");
    process.exit(1);
}
console.log("--- Validation Complete: Repository is World-Class ---");
