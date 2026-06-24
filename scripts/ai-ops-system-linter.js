/**
 * ai-ops-system-linter.js
 * Automated validation engine for the AI-Ops Framework.
 * Verifies manifest structural integrity and physical file-path alignment.
 */

const fs = require('fs');
const path = require('path');

// Target file locations relative to repo root
const MANIFEST_PATH = path.join(__dirname, '../ai-ops-manifest.json');

function runLinter() {
  console.log('🚀 Starting AI-Ops Framework Linting Verification...\n');

  // 1. Verify file exists
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ Critical Error: ai-ops-manifest.json not found at ' + MANIFEST_PATH);
    process.exit(1);
  }

  // 2. Read and Parse JSON (Catches Truncation & Syntax Issues)
  let manifest;
  try {
    const rawManifest = fs.readFileSync(MANIFEST_PATH, 'utf8');
    manifest = JSON.parse(rawManifest);
    console.log('✅ Syntax Check: ai-ops-manifest.json parsed successfully.');
  } catch (error) {
    console.error('❌ Syntax Error: Failed to parse ai-ops-manifest.json.');
    console.error(`👉 Details: ${error.message}`);
    process.exit(1);
  }

  // 3. Structural Entrypoint Real-World Path Validation
  console.log('\n🔍 Verifying Manifest Entrypoint Target Paths...');
  if (manifest.entrypoints) {
    let pathErrors = 0;
    for (const [key, value] of Object.entries(manifest.entrypoints)) {
      // Resolve path relative to repo root
      const resolvedPath = path.resolve(__dirname, '..', value);
      
      if (fs.existsSync(resolvedPath)) {
        console.log(`  • [${key}]: Found valid target directory at -> ${value}`);
      } else {
        console.error(`  ❌ [${key}]: Broken entrypoint definition! Directory does not exist at -> ${value}`);
        pathErrors++;
      }
    }

    if (pathErrors > 0) {
      console.error(`\n❌ Linting failed: ${pathErrors} broken path route alignment(s) detected.`);
      process.exit(1);
    }
  } else {
    console.error('❌ Validation Error: "entrypoints" block missing in manifest.');
    process.exit(1);
  }

  console.log('\n🎉 Validation Clean: Manifest structural integrity matches physical repo structure.');
  process.exit(0);
}

runLinter();
