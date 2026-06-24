#!/bin/bash
echo "--- Starting World-Class Validation ---"
# Check Core Directories
[ -d "systems" ] || { echo "FAIL: systems/ missing"; exit 1; }
[ -d "docs/templates" ] || { echo "FAIL: docs/templates/ missing"; exit 1; }
# Check Core Files
[ -f "docs/PROJECT_MASTER_LOG.md" ] || { echo "FAIL: Master Log missing"; exit 1; }
# Run Steady State Audit
bash systems/scripts/verify-steady-state.sh
echo "--- Validation Complete: Repo is World-Class ---"
