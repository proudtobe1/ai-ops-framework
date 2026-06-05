# AI Agent Integration Guide

A practical guide for integrating the AI‑Ops Framework with AI agents such as Claude, GPT, or local LLMs.

---

## 1. Overview

AI agents use the AI‑Ops Framework by loading workflows, templates, and system models as structured context.  
This enables consistent, repeatable, and aligned operational outputs.

---

## 2. Integration Model

AI agents interact with the framework through three steps:

### Step 1 — Load  
Retrieve relevant files from:
- `workflows/`
- `templates/`
- `systems/`

### Step 2 — Apply  
The agent interprets:
- Workflow steps  
- Template structure  
- System logic  

### Step 3 — Generate  
The agent produces structured outputs such as:
- Weekly summaries  
- Risk reports  
- Decision recommendations  
- Cross‑team alignment updates  

---

## 3. Loading Components

### Example: Load a Workflow

```python
from pathlib import Path

workflow = Path("workflows/workflow-operational-cadence.md").read_text()
```

### Example: Load a Template

```python
template = Path("templates/template-status-update.md").read_text()
```

### Example: Load a System Model

```python
system = Path("systems/system-operating-model.md").read_text()
```

---

## 4. Constructing an AI Prompt

### Example Prompt Structure

```text
You are an AI assistant. Use the following components:

Workflow:
{{workflow}}

Template:
{{template}}

System Model:
{{system}}

Task:
Generate a weekly operational summary based on the provided inputs.
```

---

## 5. Recommended Agent Behaviors

### 1. Follow Workflow Steps  
Agents should execute workflows sequentially.

### 2. Use Template Structure  
Outputs must follow the template’s sections and formatting.

### 3. Apply System Logic  
Agents should use system models for:
- Prioritization  
- Risk evaluation  
- Decision framing  

### 4. Maintain Consistency  
Outputs must remain aligned with the framework’s terminology and structure.

---

## 6. Retrieval Best Practices

### Chunking  
Store workflows, templates, and systems as separate retrievable units.

### Metadata  
Tag each file with:
- Type (workflow, template, system)  
- Purpose  
- Version  

### Context Window  
Load only the components relevant to the task.

---

## 7. Example: Weekly Summary Agent

### Inputs
- Team updates  
- Risk signals  
- Priority changes  

### Components Loaded
- `workflow-operational-cadence.md`  
- `template-status-update.md`  
- `system-operating-model.md`  

### Output
- Structured weekly summary  
- Risks  
- Priorities  
- Recommended actions  

---

## 8. Summary

This guide enables AI agents to:
- Load the framework  
- Apply workflows, templates, and systems  
- Generate consistent, structured operational outputs  
- Integrate seamlessly with automation layers  
