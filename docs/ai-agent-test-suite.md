# AI Agent Test Suite

A structured test suite for validating that AI agents correctly load, interpret, and follow the AI‑Ops Framework.  
These tests ensure consistency, alignment, and compliance with system rules.

---

## 1. Purpose

To verify that AI agents:

- Load all required system components  
- Follow workflows step‑by‑step  
- Use templates correctly  
- Apply personas when required  
- Detect risks, dependencies, and priority drift  
- Produce structured, aligned outputs  
- Comply with behavior rules  

---

## 2. Test Categories

The test suite includes the following categories:

### A. System Loading Tests  
Validate that the agent loads:

- Operating Model  
- Decision Model  
- Metrics Model  
- Security & Compliance Model  
- Required workflows  
- Required templates  
- Personas (when applicable)

### B. Workflow Execution Tests  
Verify that the agent:

- Follows workflows in order  
- Does not skip steps  
- Uses outputs from one step as inputs to the next  
- Triggers escalation paths correctly  

### C. Template Compliance Tests  
Ensure the agent:

- Uses templates exactly as defined  
- Preserves section headers  
- Maintains structure  
- Produces complete outputs  

### D. Alignment Tests  
Confirm the agent:

- Evaluates alignment  
- Detects priority drift  
- Identifies dependencies  
- Scores alignment using system logic  

### E. Risk & Dependency Tests  
Validate that the agent:

- Detects risks  
- Classifies severity  
- Identifies dependencies  
- Recommends mitigations  

### F. Persona Behavior Tests  
Ensure the agent:

- Loads personas correctly  
- Adopts tone and behavior parameters  
- Follows persona responsibilities  

### G. Output Quality Tests  
Verify that outputs include:

- Clear structure  
- Decision rationale (if applicable)  
- Updated metrics (if applicable)  
- Communication summary  

---

## 3. Test Format

Each test includes:

- **Test Name**  
- **Purpose**  
- **Input**  
- **Expected Behavior**  
- **Pass Criteria**  

---

## 4. Example Tests

### Test A‑1: Load Operating Model  
**Purpose:** Ensure the agent loads the operating model.  
**Input:** “Begin a structured task.”  
**Expected Behavior:** Agent loads `system-operating-model.md`.  
**Pass Criteria:** Agent references operating model rules.

---

### Test B‑2: Workflow Step Order  
**Purpose:** Ensure workflow steps are followed in order.  
**Input:** “Run the decision‑making workflow.”  
**Expected Behavior:** Agent executes steps 1 → 2 → 3 → 4.  
**Pass Criteria:** No skipped or reordered steps.

---

### Test C‑3: Template Structure  
**Purpose:** Ensure templates are used correctly.  
**Input:** “Generate a decision record.”  
**Expected Behavior:** Agent uses `template-decision-record.md`.  
**Pass Criteria:** All sections present and correctly formatted.

---

### Test D‑1: Alignment Detection  
**Purpose:** Ensure the agent detects misalignment.  
**Input:** Misaligned priorities.  
**Expected Behavior:** Agent identifies drift and recommends adjustments.  
**Pass Criteria:** Alignment score + recommended corrections.

---

### Test E‑4: Risk Severity Classification  
**Purpose:** Ensure the agent classifies risk severity.  
**Input:** High‑impact blocker.  
**Expected Behavior:** Agent assigns correct severity.  
**Pass Criteria:** Severity level matches system logic.

---

### Test F‑2: Persona Adoption  
**Purpose:** Ensure persona behavior is applied.  
**Input:** “Act as the Risk Manager.”  
**Expected Behavior:** Agent adopts Risk Manager tone and responsibilities.  
**Pass Criteria:** Output matches persona parameters.

---

## 5. Test Execution

Tests may be executed:

- Manually  
- Via automated scripts  
- As part of CI/CD  
- As part of agent onboarding  
- During regression testing  

---

## 6. Summary

The AI Agent Test Suite ensures that all AI agents interacting with the AI‑Ops Framework behave consistently, follow system rules, and produce high‑quality, aligned outputs.
