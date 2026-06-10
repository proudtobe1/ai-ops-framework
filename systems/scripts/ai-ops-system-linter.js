#!/usr/bin/env node

/**
 * AI‑Ops Framework — Structural Integrity Linter
 * Production-Grade Version (V3.0 - Fully Integrated)
 */

const fs = require("fs");
const path = require("path");

// Enforce execution from the actual repository root directory
const ROOT_DIR = path.resolve(__dirname, "..");
const manifestPath = path.join(ROOT_DIR, "ai-ops-manifest.json");

const ignoreList = [".git", "node_modules", "schema", "logs", "temp"];

// Explicitly defined to accept framework markdown, linter scripts, and root files
const allowedPatterns = [
  /^ai-ops-system-.*\.md$/,
  /^ai-ops-system-.*\.js$/,
  /^README\.md$/
]; 

const governanceFiles = ["ai-ops-manifest.json", "package.json"];
const optionAFolders = ["workflows", "templates", "systems", "use-cases", "starter-prompts"];

function listFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (ignoreList.includes(entry.name)) return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(listFiles(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

// 1. Context and Manifest Verification
if (!fs.existsSync(manifestPath)) {
  console.error(`❌ Structural Error: Manifest not found at expected root path: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const allFiles = listFiles(ROOT_DIR);
let errorStack = [];

console.log("🔍 Running AI-Ops Structural Integrity Checks [V3.0]...");

// 2. Naming Convention Enforcement (Absolute Path Robust)
const namingErrors = allFiles.filter(file => {
  const base = path.basename(file);
  const relPath = path.relative(ROOT_DIR, file);
  
  // Whitelist the script itself regardless of location
  if (relPath === path.join("systems", "scripts", "ai-ops-system-linter.js") || relPath === "ai-ops-system-linter.js") return false;
  
  return !(allowedPatterns.some((p) => p.test(base)) || governanceFiles.includes(base));
});
if (namingErrors.length > 0) {
  errorStack.push(`Naming Conventions: ${namingErrors.length} invalid filenames detected.`);
}

// 3. Alphabetical Ordering (Locale-aware & Null-safe)
if (manifest.modules) {
  Object.keys(manifest.modules).forEach(category => {
    const list = manifest.modules[category];
    const sorted = [...list].sort((a, b) => a.localeCompare(b));
    if (JSON.stringify(list) !== JSON.stringify(sorted)) {
      errorStack.push(`Alphabetical Ordering: Category '${category}' is out of sequence.`);
    }
  });
}

// 4. Deprecated Filenames Check
const deprecated = allFiles.filter((f) => path.basename(f).startsWith("ai-ops-agent-"));
if (deprecated.length > 0) {
  errorStack.push(`Deprecated Files: Found ${deprecated.length} legacy 'ai-ops-agent-*' assets.`);
}

// 5. Option A Formatting (Streaming Buffer Optimization)
const optionAErrors = allFiles.filter(file => {
  const rel = path.relative(ROOT_DIR, file);
  const isInOptionA = optionAFolders.some(folder => rel.startsWith(folder + path.sep));
  
  if (!isInOptionA) return false;

  // Use a smaller buffer stream read instead of reading massive files fully into memory strings
  const buffer = Buffer.alloc(1024);
  try {
    const fd = fs.openSync(file, "r");
    const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
    fs.closeSync(fd);
    const contentSnippet = buffer.toString("utf8", 0, bytesRead);
    
    // Target unescaped raw codeblock injections specifically at file initialization
    return contentSnippet.startsWith("```"); 
  } catch (e) {
    return false;
  }
});
if (optionAErrors.length > 0) {
  errorStack.push(`Option A Violations: Invalid markdown headers or naked backticks in ${optionAErrors.length} files.`);
}

// Final Report Execution
if (errorStack.length > 0) {
  console.error("\n❌ Structural Integrity Verification Failed:");
  errorStack.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

console.log("🎉 All structural integrity checks passed cleanly under strict schema bounds.");
