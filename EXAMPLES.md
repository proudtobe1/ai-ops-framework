# Usage Example

This example demonstrates how to use the AI‑Ops Framework with an LLM or automation layer.

---

## Load the Framework

```python
import json
import os

# Load manifest
with open("model-manifest.json", "r") as f:
    manifest = json.load(f)

# Access components
workflows_path = manifest["entrypoints"]["workflows"]
templates_path = manifest["entrypoints"]["templates"]
systems_path = manifest["entrypoints"]["systems"]

print("Workflows:", os.listdir(workflows_path))
print("Templates:", os.listdir(templates_path))
print("Systems:", os.listdir(systems_path))
```

---

## Example: Generate a Weekly Status Update

```python
from pathlib import Path

template_path = Path("templates/template-status-update.md")

with open(template_path, "r") as f:
    template = f.read()

prompt = f"""
You are an AI assistant. Use the following template to generate a weekly status update:

{template}

Fill in each section based on the team's progress this week.
"""

print(prompt)
```

---

## Example: Use a Workflow

```python
workflow_path = Path("workflows/workflow-operational-cadence.md")

with open(workflow_path, "r") as f:
    workflow = f.read()

prompt = f"""
You are an AI assistant. Use the following workflow to guide a weekly operating cadence:

{workflow}

Generate the Monday alignment summary.
"""

print(prompt)
```

---

## Example: Use a System Model

```python
system_path = Path("systems/system-operating-model.md")

with open(system_path, "r") as f:
    system = f.read()

prompt = f"""
You are an AI assistant. Use the following operating model to structure a cross-functional planning session:

{system}

Produce a clear, structured plan.
"""

print(prompt)
```

---

## Summary

This usage example shows how to:

- Load the framework  
- Access workflows, templates, and systems  
- Use them with an LLM or automation layer  
- Generate structured operational outputs  
