const fs = require('fs');
const path = require('path');

// Establish Absolute Context
const payloadPath = path.join(__dirname, 'llm_output.json');

function validateLLMOutput(filePath) {
    console.log("====================================================");
    console.log("       STARTING STRICT JSON SCHEMA TEST             ");
    console.log("====================================================");
    
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        
        // 1. Attempt to parse the file as JSON
        // If this fails, the LLM output contains hallucinated conversational fluff
        const json = JSON.parse(rawData);

        // 2. Validate the structure (Strict schema enforcement)
        if (typeof json.status === 'string' && typeof json.critical_errors === 'number') {
            console.log("✅ [PASS] Strict JSON Validation: Format is sound and strictly typed.");
            console.log("====================================================");
            process.exit(0); // Send clean success code to master CI runner
        } else {
            console.error("❌ [FAIL] Strict JSON Validation: Missing mandatory fields or type mismatch.");
            console.log("====================================================");
            process.exit(1); // Instantly fail the CI pipeline and block the build
        }
    } catch (e) {
        console.error("❌ [FAIL] Strict JSON Validation: Output is not valid JSON (Found fluff/broken text).");
        console.log("====================================================");
        process.exit(1); // Instantly fail the CI pipeline
    }
}

// Run the test using the dynamic absolute path
validateLLMOutput(payloadPath);
