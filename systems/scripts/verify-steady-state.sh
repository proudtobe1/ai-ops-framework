#!/bin/bash

# Enforce strict error trapping for world-class CI predictability
# -e: Exit immediately if any command exits with a non-zero status
# -u: Treat unset variables as an error
# -o pipefail: Return status of the last command to exit with a non-zero status
set -euo pipefail

echo "===================================================="
echo "       STARTING STEADY-STATE INTEGRITY AUDIT        "
echo "===================================================="

# 1. Establish Absolute Project Root Context (POSIX Safe)
cd "$(dirname "$0")/../../"
PROJECT_ROOT="$(pwd)"

echo "🎯 Context Locked to Project Root: ${PROJECT_ROOT}"

# 2. Dependency Checks
echo "🔍 Verifying Linter Engine Dependencies..."
if [ ! -f "systems/scripts/ai-ops-system-linter.js" ]; then
    echo "❌ [FAIL] Structural Error: System linter script is missing."
    exit 1
fi

# 3. Core Programmatic Schema Verification Execution
echo "🔄 Invoking Programmatic Validation Matrix..."

# Because 'set -e' is active, if the linter fails, the script will instantly 
# terminate here with a non-zero exit code.
node systems/scripts/ai-ops-system-linter.js

echo "===================================================="
echo "✅ AUDIT COMPLETE: Framework is in a 100% Steady State."
echo "===================================================="
