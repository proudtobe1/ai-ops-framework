#!/usr/bin/env node

/**
 * AI‑Ops Framework — Structural Integrity Linter
 *
 * This script enforces:
 * 1. Naming conventions
 * 2. Alphabetical ordering of module lists
 * 3. No deprecated filenames
 * 4. Option A formatting (no backticks in content files)
 *
 * Run manually with:
 *   node scripts/lint-structure.js
 */

const fs = require("fs");
const path = require("path");

// ------------------------------
// Helper: Recursively list files
// ------------------------------
function listFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
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
// Load manifest
// ------------------------------
const manifestPath = "ai-ops-manifest.json";
if (!fs.existsSync(manifestPath)) {
  console.error("❌ Manifest not found at ai-ops-manifest.json");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// ------------------------------
// 1. Naming Convention Enforcement
// ------------------------------
console.log("🔍 Checking naming conventions...");

const allowedPatterns = [
  /^ai-ops-[a-z0-9-]+\.md$/,
  /^prompt-[a-z0-9-]+\.md$/,
  /^.*\.json$/,
  /^.*\.ya?ml$/,
  /^.*\.md$/,
  /^.*\.js$/,
];

const governanceFiles = [
  "README.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "CONTRIBUTING_DETAILED.md",
  "CODE_OF_CONDUCT.md",
  "PROJECT_GOVERNANCE.md",
];

const allFiles = listFiles(".");

let namingErrors = [];

for (const file of allFiles) {
  if (file.includes(".git") || file.includes("schema")) continue;

  const base = path.basename(file);

  const allowed =
    allowedPatterns.some((p) => p.test(base)) ||
    governanceFiles.includes(base);

  if (!allowed) namingErrors.push(file);
}

if (namingErrors.length > 0) {
  console.error("❌ Invalid filenames detected:");
  namingErrors.forEach((f) => console.error(" - " + f));
  process.exit(1);
}

console.log("✅ Naming conventions OK");

// ------------------------------
// 2. Alphabetical Ordering
// ------------------------------
console.log("🔍 Checking alphabetical ordering...");

let orderingFailed = false;

for (const category of Object.keys(manifest.modules)) {
  const list = manifest.modules[category];
  const sorted = [...list].sort();

  if (JSON.stringify(list) !== JSON.stringify(sorted)) {
    console.error(`❌ ${category} is not alphabetized.`);
    orderingFailed = true;
  }
}

if (orderingFailed) process.exit(1);

console.log("✅ Alphabetical ordering OK");

// ------------------------------
// 3. Deprecated Filenames
// ------------------------------
console.log("🔍 Checking for deprecated filenames...");

const deprecated = allFiles.filter((f) =>
  path.basename(f).startsWith("ai-ops-agent-")
);

if (deprecated.length > 0) {
  console.error("❌ Deprecated filenames detected:");
  deprecated.forEach((f) => console.error(" - " + f));
  process.exit(1);
}

console.log("✅ No deprecated filenames");

// ------------------------------
// 4. Option A Formatting
// ------------------------------
console.log("🔍 Checking Option A formatting...");

const contentDirs = [
  "workflows",
  "templates",
  "systems",
  "use-cases",
  "starter-prompts",
  "docs",
];

let optionAErrors = [];

for (const dir of contentDirs) {
  if (!fs.existsSync(dir)) continue;

  const files = listFiles(dir);
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (text.includes("```")) {
      optionAErrors.push(file);
    }
  }
}

if (optionAErrors.length > 0) {
  console.error("❌ Option A violations detected (backticks found):");
  optionAErrors.forEach((f) => console.error(" - " + f));
  process.exit(1);
}

console.log("✅ Option A formatting OK");

// ------------------------------
// Final
// ------------------------------
console.log("🎉 Structural integrity checks passed.");
