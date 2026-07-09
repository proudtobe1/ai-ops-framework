# Workflow: AI Agent Integration

A workflow defining the required steps an AI agent must follow to correctly load, interpret, and operate within the AI‑Ops Framework.

## 1. Purpose

To ensure AI agents:
- Load all required system components.
- Follow the correct initialization sequence.
- Apply workflows, templates, personas, and metrics.
- Produce structured, aligned, compliant outputs.
- Maintain consistency across all tasks.

## 2. Trigger

This workflow is triggered when:
- An AI agent begins a structured task.
- A user requests a workflow‑driven output.
- A system process requires AI‑assisted execution.

## 3. Preconditions

AI agents must:
- Have programmatic access to the `systems/` directory models.
- Have access to workflows and the `docs/templates/` registry.
- Be able to load persona configurations.
- Be able to update quantitative state metrics.

## 4. Execution Sequence

Agents must execute the following sequence synchronously, without skipping or reordering steps:

### 4.1 step_1_load_system_models
AI agent loads core governance dependencies into the active context window:
- `systems/ai-ops-system-operating-model.md`
- `systems/ai-ops-system-reasoning-framework.md`
- `systems/ai-ops-system-operational-metrics.md`
- `systems/ai-ops-system-security-compliance.md`

### 4.2 step_2_load_required_workflows
AI agent loads the specific procedural workflow relevant to the assigned task.

### 4.3 step_3_load_templates
AI agent fetches the required output structure from the `docs/templates/` directory to prevent layout drift.

### 4.4 step_4_load_persona
If the task requires a specific role constraint, the agent loads the appropriate persona profile to govern tone and boundary permissions.

### 4.5 step_5_interpret_input
AI agent analyzes the payload for priorities, risks, dependencies, alignment, and missing context.

### 4.6 step_6_execute_workflow
AI agent processes the active task payload through the loaded procedural workflow.

### 4.7 step_7_generate_structured_output
AI agent serializes the response strictly into the loaded markdown template.

### 4.8 step_8_update_metrics
AI agent logs state changes to `velocity_metrics`, `clarity_metrics`, `alignment_metrics`, and `risk_exposure`.

### 4.9 step_9_validate_alignment
AI agent cross-references the output against `systems/ai-ops-system-drift-detection.md` to flag priority decay, misalignment, or new dependencies.

### 4.10 step_10_produce_communication_summary
AI agent condenses the execution result into a summary formatted according to `systems/ai-ops-system-communication-engine.md`.

## 5. Outputs

- Structured, template‑aligned markdown output.
- Updated telemetry and metrics.
- Alignment evaluation log.
- Risk and dependency state analysis.
- Communication summary payload.

## 6. Escalation Path

If the agent detects `high_severity` risks, compliance violations, critical misalignment, or a breaker state:
- *Action Required:* Instantly freeze autonomous execution and trigger the `docs/templates/ai-ops-template-escalation-report.md` hand-off protocol.

## 7. Summary

This workflow ensures AI agents operate consistently, predictably, and in full programmatic alignment with the AI‑Ops Framework. It defines the required initialization sequence and execution invariants for all structured tasks.
