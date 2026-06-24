const fs = require('fs');
const path = require('path');

// Always look for the manifest at the project root
const MANIFEST_PATH = path.join(process.cwd(), 'ai-ops-manifest.json');

if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`❌ Structural Error: Manifest not found at root path: ${MANIFEST_PATH}`);
    process.exit(1);
}

try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    console.log("✅ Manifest validated successfully.");
    process.exit(0);
} catch (e) {
    console.error("❌ Structural Error: Failed to parse manifest JSON.");
    process.exit(1);
}
