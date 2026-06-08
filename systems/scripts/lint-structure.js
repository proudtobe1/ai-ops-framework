#!/usr/bin/env node

/**
 * AI‑Ops Framework — Structural Integrity Linter (Corrected)
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

    // Skip noise directories
    if (file === ".git" || file === "node_modules" || file.includes("schema")) {
      return;
    }

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
  /^.*\.js$/, // allow JS files
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
  const base = path.basename(file);

  // Ignore this linter itself
  if (file === "scripts/lint-structure.js") continue;

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

// Only enforce Option A in these folders, NOT docs
const optionAFolders = [
  "workflows",
  "templates",
  "systems",
  "use-cases",
  "starter-prompts",
];

let optionAErrors = [];

for (const file of allFiles) {
  const relative = file.replace(/^[.][/\\]?/, ""); // normalize

  // Only check files in the Option A folders
  if (!optionAFolders.some((folder) => relative.startsWith(folder + "/"))) {
    continue;
  }

  const text = fs.readFileSync(file, "utf8");
  if (text.includes("```")) {
    optionAErrors.push(relative);
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
