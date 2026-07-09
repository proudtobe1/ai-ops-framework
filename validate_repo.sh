#!/bin/bash

# ==========================================
# AI-Ops Framework Master Validation Runner
# ==========================================

# Strict mode: Exit immediately on error, undefined variable, or pipe failure
set -euo pipefail

echo "🚀 --- Starting World-Class Validation ---"

# 1. Validate Core Architectural Directories
echo "🔍 [1/3] Verifying Core Directory Structure..."
for dir in ".github" "docs" "systems" "tests" "validators" "scripts"; do
  if [ ! -d "$dir" ]; then
    echo "❌ FAIL: Core architectural directory '$dir/' is missing."
    exit 1
  fi
done
echo "✅ All core directories present."

# 2. Validate Core Manifests & Registries
echo "🔍 [2/3] Verifying Master Registry Files..."
for file in "ai-ops-manifest.json" "README.md" "mkdocs.yml" ".markdownlint.json"; do
  if [ ! -f "$file" ]; then
    echo "❌ FAIL: Core configuration file '$file' is missing."
    exit 1
  fi
done
echo "✅ All core registries present."

# 3. Execute Granular Steady-State Audit
echo "🔍 [3/3] Executing Granular Steady-State Checks..."
if [ -f "systems/scripts/verify-steady-state.sh" ]; then
  bash systems/scripts/verify-steady-state.sh
else
  echo "⚠️ WARNING: 'systems/scripts/verify-steady-state.sh' not found. Skipping granular script audit."
fi

echo "🏁 --- Validation Complete: Repo is World-Class ---"
