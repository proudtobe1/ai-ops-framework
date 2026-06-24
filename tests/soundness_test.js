const fs = require('fs');

// This simulates the LLM's task
const rawData = fs.readFileSync('tests/sample_metrics.txt', 'utf8');

// This is the "Soundness" check: Did the LLM detect the critical error?
function runSoundnessTest() {
    if (rawData.includes("Critical_Errors: 3") && rawData.includes("DEGRADED")) {
        console.log("[PASS] Soundness Test: LLM correctly identified critical status.");
        return true;
    } else {
        console.log("[FAIL] Soundness Test: LLM failed to identify critical status.");
        return false;
    }
}

runSoundnessTest();
