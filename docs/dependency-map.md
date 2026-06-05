# Dependency Map

A structured map showing how workflows, templates, systems, prompts, and documentation depend on and interact with each other.

---

## 1. Overview

The AI‑Ops Framework is intentionally modular.  
Each component has a clear purpose and defined relationships with other components.

This dependency map clarifies:

- What depends on what  
- How components interact  
- How AI agents should load modules  
- How changes propagate across the system  

---

## 2. High‑Level Dependency Graph

**Workflows → Templates → Systems → Outputs**  
**Documentation → All Layers**  
**Prompts → Workflows + Templates + Systems**  
**Use Cases → All Layers**

---

## 3. Component‑Level Dependencies

### Workflows depend on:
- Templates (for structured outputs)  
- Systems (for decision logic)  
- Documentation (for context and guidance)  

### Templates depend on:
- Systems (for logic and structure)  
- Documentation (for usage guidance)  

### Systems depend on:
- Nothing above them — they are foundational  
- Documentation (for explanation and diagrams)  

### Use Cases depend on:
- Workflows  
- Templates  
- Systems  
- Prompts  

### Prompts depend on:
- Workflows  
- Templates  
- Systems  

### Documentation depends on:
- All components (for reference and explanation)

---

## 4. Detailed Dependency Table

| Component Type | Depends On | Provides To |
|----------------|------------|-------------|
| Workflows | Templates, Systems | Prompts, Use Cases |
| Templates | Systems | Workflows, Prompts |
| Systems | — | Workflows, Templates, Prompts, Use Cases |
| Use Cases | Workflows, Templates, Systems | Documentation |
| Prompts | Workflows, Templates, Systems | AI Agents |
| Documentation | All components | All components |

---

## 5. Example Dependency Flow

### Weekly Summary Flow

1. **Workflow:** `workflow-operational-cadence.md`  
2. **Template:** `template-status-update.md`  
3. **System:** `system-operating-model.md`  
4. **Prompt:** `prompt-weekly-summary.md`  
5. **Output:** Weekly summary  

---

## 6. Change Propagation Rules

### If a workflow changes:
- Prompts may need updates  
- Use cases may need updates  

### If a template changes:
- Workflows referencing it must be reviewed  
- Prompts must be updated  

### If a system model changes:
- Workflows must be validated  
- Templates may need updates  
- Prompts must be updated  

### If documentation changes:
- No downstream updates required  

---

## 7. AI Agent Loading Order

AI agents should load components in this order:

1. Systems  
2. Templates  
3. Workflows  
4. Prompts  
5. Use cases (optional)  

This ensures the agent understands logic → structure → process → execution.

---

## 8. Summary

The dependency map provides:

- A clear understanding of how components relate  
- A guide for updating modules safely  
- A reference for AI agent loading  
- A foundation for future expansion  
