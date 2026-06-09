#!/usr/bin/env node

/**
 * AI‑Ops Framework — Structural Integrity Linter
 * Optimized for robustness and cross-platform compatibility
 */

const fs = require("fs");
const path = require("path");

// ------------------------------
// Configuration
// ------------------------------
const ignoreList = [".git", "node_modules", "schema", "logs", "temp"];
const manifestPath = "ai-ops-manifest.json";

const allowedPatterns = [
  /^ai-ops-[a-z0-9-]+\.md$/,
  /^prompt-[a-z0-9-]+\.md$/,
  /^.*\.json$/,
  /^.*\.ya?ml$/,
  /^.*\.md$/,
  /^.*\.js$/,
];

const governanceFiles = [
  "README.md", "LICENSE", "CONTRIBUTING.md",
  "CONTRIBUTING_DETAILED.md", "CODE_OF_CONDUCT.md", "PROJECT_GOVERNANCE.md",
];

const optionAFolders = [
  "workflows", "templates", "systems", "use-cases", "starter-prompts",
];

// ------------------------------
// Helper: Recursively list files
// ------------------------------
function listFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    if (ignoreList.includes(file)) return;
    
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(listFiles(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

// ------------------------------
// Execution Logic
// ------------------------------
if (!fs.existsSync(manifestPath)) {
  console.error("❌ Manifest not found.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const allFiles = listFiles(".");
let errorStack = [];

console.log("🔍 Running Structural Integrity Checks...");

// 1. Naming Convention Enforcement
const namingErrors = allFiles.filter(file => {
  const base = path.basename(file);
  if (file === "scripts/lint-structure.js") return false;
  return !(allowedPatterns.some((p) => p.test(base)) || governanceFiles.includes(base));
});
if (namingErrors.length > 0) errorStack.push(`Naming Conventions: ${namingErrors.length} invalid filenames.`);

// 2. Alphabetical Ordering
Object.keys(manifest.modules).forEach(category => {
  const list = manifest.modules[category];
  const sorted = [...list].sort();
  if (JSON.stringify(list) !== JSON.stringify(sorted)) {
    errorStack.push(`Alphabetical Ordering: ${category} is not sorted.`);
  }
});

// 3. Deprecated Filenames
const deprecated = allFiles.filter((f) => path.basename(f).startsWith("ai-ops-agent-"));
if (deprecated.length > 0) errorStack.push(`Deprecated Files: Found ${deprecated.length} files.`);

// 4. Option A Formatting (No backticks)
const optionAErrors = allFiles.filter(file => {
  const normalized = file.split(path.sep).slice(0, 1).join(path.sep);
  if (!optionAFolders.includes(normalized)) return false;
  return fs.readFileSync(file, "utf8").includes("```");
});
if (optionAErrors.length > 0) errorStack.push(`Option A Violations: Backticks found in ${optionAErrors.length} files.`);

// ------------------------------
// Final Report
// ------------------------------
if (errorStack.length > 0) {
  console.error("\n❌ Structural Integrity Failed:");
  errorStack.forEach(err => console.error(` - ${err}`));
  process.exit(1);
}

console.log("🎉 All structural integrity checks passed.");
