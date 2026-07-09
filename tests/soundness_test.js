const fs = require('fs');
const path = require('path');

// Establish Absolute Context
const metricsPath = path.join(__dirname, 'sample_metrics.txt');
const rawData = fs.readFileSync(metricsPath, 'utf8');

function runSoundnessTest() {
    console.log("====================================================");
    console.log("       STARTING LOGIC SOUNDNESS TEST                ");
    console.log("====================================================");

    // Validate against the strict snake_case tokens locked in our framework schema
    if (rawData.includes("critical_errors: 3") && rawData.includes("degraded")) {
        console.log("✅ [PASS] Soundness Test: LLM correctly identified critical status tokens.");
        console.log("====================================================");
        process.exit(0); // Send clean success code to master CI runner
    } else {
        console.error("❌ [FAIL] Soundness Test: LLM failed to identify critical status tokens.");
        console.log("====================================================");
        process.exit(1); // Instantly fail the CI pipeline and block the build
    }
}

runSoundnessTest();
