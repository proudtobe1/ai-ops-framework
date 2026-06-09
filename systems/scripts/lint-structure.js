#!/usr/bin/env node

/**
 * AI‑Ops Framework — Structural Integrity Linter
 * Production-Grade Version (V2.1)
 */

const fs = require("fs");
const path = require("path");

const ignoreList = [".git", "node_modules", "schema", "logs", "temp"];
const manifestPath = "ai-ops-manifest.json";

// ... [Keep allowedPatterns and governanceFiles as previously defined] ...

const optionAFolders = ["workflows", "templates", "systems", "use-cases", "starter-prompts"];

function listFiles(dir) {
  let results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (ignoreList.includes(entry.name)) return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(listFiles(full));
    else results.push(full);
  });
  return results;
}

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

// 2. Alphabetical Ordering (Locale-aware)
Object.keys(manifest.modules).forEach(category => {
  const list = manifest.modules[category];
  const sorted = [...list].sort((a, b) => a.localeCompare(b));
  if (JSON.stringify(list) !== JSON.stringify(sorted)) {
    errorStack.push(`Alphabetical Ordering: ${category} is not sorted (expected: ${JSON.stringify(sorted)})`);
  }
});

// 3. Deprecated Filenames
const deprecated = allFiles.filter((f) => path.basename(f).startsWith("ai-ops-agent-"));
if (deprecated.length > 0) errorStack.push(`Deprecated Files: Found ${deprecated.length} files.`);

// 4. Option A Formatting (Path-robust)
const optionAErrors = allFiles.filter(file => {
  const rel = path.relative(".", file);
  const isInOptionA = optionAFolders.some(folder => rel.startsWith(folder + path.sep));
  return isInOptionA && fs.readFileSync(file, "utf8").includes("```");
});
if (optionAErrors.length > 0) errorStack.push(`Option A Violations: Backticks found in ${optionAErrors.length} files.`);

// Final Report
if (errorStack.length > 0) {
  console.error("\n❌ Structural Integrity Failed:");
  errorStack.forEach(err => console.error(` - ${err}`));
  process.exit(1);
}

console.log("🎉 All structural integrity checks passed.");
