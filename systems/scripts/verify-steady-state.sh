#!/bin/bash

echo "--- Starting Steady State Integrity Audit ---"

CORE_SYSTEMS=("systems/ai-ops-system-operating-model.md" "systems/ai-ops-system-alignment-engine.md" "systems/ai-ops-system-security-compliance.md" "systems/ai-ops-system-behavioral-guardrails.md")
WORKFLOWS=("systems/workflows/ai-ops-workflow-operational-cadence.md" "systems/workflows/ai-ops-workflow-decision-automation.md" "systems/workflows/ai-ops-workflow-ai-agent-integration.md")
TEMPLATES=("docs/templates/ai-ops-template-status-update.md" "docs/templates/ai-ops-template-decision-record.md" "docs/templates/ai-ops-template-alignment-check.md")

echo "[1/3] Checking Core System Engines..."
for file in "${CORE_SYSTEMS[@]}"; do
  if [ -f "$file" ]; then echo "  [PASS] Found: $file"; else echo "  [FAIL] Missing: $file"; exit 1; fi
done

echo "[2/3] Checking Operational Workflows..."
for file in "${WORKFLOWS[@]}"; do
  if [ -f "$file" ]; then echo "  [PASS] Found: $file"; else echo "  [FAIL] Missing: $file"; exit 1; fi
done

echo "[3/3] Checking Templates..."
for file in "${TEMPLATES[@]}"; do
  if [ -f "$file" ]; then echo "  [PASS] Found: $file"; else echo "  [FAIL] Missing: $file"; exit 1; fi
done

echo "--- Running Structural Linter ---"
if [ -f "systems/scripts/ai-ops-system-linter.js" ]; then
  node systems/scripts/ai-ops-system-linter.js
  echo "--- Linter Execution Complete ---"
else
  echo "[FAIL] Linter script missing."
  exit 1
fi

echo "--- Audit Complete: Framework is in Steady State ---"
