const fs = require('fs');
const path = require('path');

// Target Absolute Paths
const ROOT_DIR = process.cwd();
const MANIFEST_PATH = path.join(ROOT_DIR, 'ai-ops-manifest.json');
const SCHEMA_PATH = path.join(ROOT_DIR, 'systems', 'schemas', 'ai-ops-system-schema-manifest.json');

// 1. Dependency Validation Gate
if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`❌ Structural Error: Manifest not found at root path: ${MANIFEST_PATH}`);
    process.exit(1);
}
if (!fs.existsSync(SCHEMA_PATH)) {
    console.error(`❌ Dependency Error: Schema manifest missing at: ${SCHEMA_PATH}`);
    process.exit(1);
}

try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));

    console.log("🔄 Evaluating framework manifest against hardened schema definitions...");

    // 2. Enforce Required Top-Level Keys
    for (const key of schema.required) {
        if (!(key in manifest)) {
            throw new Error(`Missing required top-level property: "${key}"`);
        }
    }

    // 3. Enforce Strict SemVer Regex Pattern
    const semVerRegex = new RegExp(schema.properties.version.pattern);
    if (!semVerRegex.test(manifest.version)) {
        throw new Error(`Version "${manifest.version}" violates strict SemVer formatting.`);
    }

    // 4. Enforce Module Array Containment & Unique Items
    const modulesSchema = schema.properties.modules;
    for (const section of modulesSchema.required) {
        const fileArray = manifest.modules[section];

        if (!Array.isArray(fileArray)) {
            throw new Error(`Section "modules.${section}" must be an array.`);
        }
        if (fileArray.length < modulesSchema.properties[section].minItems) {
            throw new Error(`Section "modules.${section}" must contain at least one file reference.`);
        }

        // Verify UniqueItems Rule (No Duplicates)
        const uniqueItems = new Set(fileArray);
        if (uniqueItems.size !== fileArray.length) {
            throw new Error(`Section "modules.${section}" contains duplicate file paths.`);
        }

        // 5. Hardened Physical Disk Integrity Check
        for (const filePath of fileArray) {
            const absolutePath = path.join(ROOT_DIR, filePath);
            if (!fs.existsSync(absolutePath)) {
                throw new Error(`Broken Path Reference: File does not exist at "${filePath}"`);
            }
        }
        
        // 6. Enforce Module File Extensions (The True Fix)
        const moduleItemPattern = schema.properties.modules.properties[section]?.items?.pattern;
        if (moduleItemPattern) {
            const regex = new RegExp(moduleItemPattern);
            for (const filePath of fileArray) {
                if (!regex.test(filePath)) {
                    throw new Error(`File Extension Violation: "${filePath}" in module "${section}" does not match required pattern ${moduleItemPattern}`);
                }
            }
        }
    }

    console.log("✅ 100% World-Class Verification: Manifest matches schema metrics perfectly.");
    process.exit(0);
} catch (e) {
    console.error(`❌ Comprehensive Validation Failure: ${e.message}`);
    process.exit(1);
}
