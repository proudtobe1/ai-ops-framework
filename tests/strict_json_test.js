const fs = require('fs');

function validateLLMOutput(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        
        // 1. Attempt to parse the file as JSON
        // If this fails, the LLM output is not "sound"
        const json = JSON.parse(rawData);

        // 2. Validate the structure (Strict schema enforcement)
        if (typeof json.status === 'string' && typeof json.critical_errors === 'number') {
            console.log("[PASS] Strict JSON Validation: Format is sound.");
            return true;
        } else {
            console.error("[FAIL] Strict JSON Validation: Missing mandatory fields.");
            return false;
        }
    } catch (e) {
        console.error("[FAIL] Strict JSON Validation: Output is not valid JSON (Found fluff/broken text).");
        process.exit(1);
    }
}

// Run the test
validateLLMOutput('tests/llm_output.json');
