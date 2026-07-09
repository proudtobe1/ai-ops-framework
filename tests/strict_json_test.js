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
        const json = JSON.parse(rawData);

        // 2. Validate the structure (Strict schema enforcement)
        if (typeof json.status === 'string' && typeof json.critical_errors === 'number') {
            console.log("✅ [PASS] Strict JSON Validation: Format is sound and strictly typed.");
            console.log("====================================================");
            // Script naturally completes here, allowing asynchronous stdout to flush cleanly 
            // and exiting with a default code of 0.
        } else {
            console.error("❌ [FAIL] Strict JSON Validation: Missing mandatory fields or type mismatch.");
            console.log("====================================================");
            process.exitCode = 1; // Gracefully flag the pipeline failure without truncating I/O
        }
    } catch (e) {
        // Expose the actual system error so we aren't flying blind in the CI runner
        console.error(`❌ [FAIL] Strict JSON Validation Error: ${e.message}`);
        console.log("====================================================");
        process.exitCode = 1;
    }
}

// Run the test using the dynamic absolute path
validateLLMOutput(payloadPath);
