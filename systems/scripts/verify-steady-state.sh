#!/bin/bash

# Enforce strict error trapping for world-class CI predictability
# -e: Exit immediately if any command exits with a non-zero status
# -u: Treat unset variables as an error
# -o pipefail: Return status of the last command to exit with a non-zero status
set -euo pipefail

echo "===================================================="
echo "       STARTING STEADY-STATE INTEGRITY AUDIT        "
echo "===================================================="

# 1. Establish Absolute Project Root Context
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../../" && pwd)"
cd "${PROJECT_ROOT}"

echo "🎯 Context Locked to Project Root: ${PROJECT_ROOT}"

# 2. Dependency Checks
echo "🔍 Verifying Linter Engine Dependencies..."
if [ ! -f "systems/scripts/ai-ops-system-linter.js" ]; then
    echo "❌ [FAIL] Structural Error: System linter script is missing."
    exit 1
fi

# 3. Core Programmatic Schema Verification Execution
echo "🔄 Invoking Programmatic Validation Matrix..."
if node systems/scripts/ai-ops-system-linter.js; then
    echo "===================================================="
    echo "✅ AUDIT COMPLETE: Framework is in a 100% Steady State."
    echo "===================================================="
    exit 0
else
    echo "===================================================="
    echo "❌ AUDIT FAILED: Structural integrity constraints broken."
    echo "===================================================="
    exit 1
fi
