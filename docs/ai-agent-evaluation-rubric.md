# AI Agent Evaluation Rubric

A formal scoring rubric used to evaluate AI agent performance, compliance, and output quality within the AI‑Ops Framework.

---

## 1. Purpose

To provide a consistent, objective, and repeatable method for evaluating whether AI agents:

- Follow workflows  
- Use templates correctly  
- Apply personas  
- Detect risks and dependencies  
- Maintain alignment  
- Update metrics  
- Produce structured, compliant outputs  

This rubric is used for certification, regression testing, and continuous improvement.

---

## 2. Scoring Model

Each category is scored on a **0.0 – 1.0 scale**:

- **0.8 – 1.0** → Excellent  
- **0.5 – 0.79** → Needs Improvement  
- **0.0 – 0.49** → At Risk  

Agents must score **0.8 or higher** in all categories to be considered compliant.

---

## 3. Evaluation Categories

### **A. Workflow Adherence (20%)**  
Evaluates whether the agent:  
- Follows steps in order  
- Does not skip steps  
- Uses outputs as inputs  
- Triggers escalation correctly  

### **B. Template Compliance (20%)**  
Evaluates whether the agent:  
- Uses the correct template  
- Preserves structure  
- Includes all required sections  
- Avoids unstructured output  

### **C. Persona Accuracy (10%)**  
Evaluates whether the agent:  
- Loads the correct persona  
- Uses appropriate tone  
- Follows persona responsibilities  

### **D. Risk & Dependency Detection (15%)**  
Evaluates whether the agent:  
- Identifies risks  
- Classifies severity  
- Detects dependencies  
- Recommends mitigations  

### **E. Alignment Evaluation (10%)**  
Evaluates whether the agent:  
- Detects priority drift  
- Scores alignment correctly  
- Identifies misalignment  

### **F. Metrics Updates (10%)**  
Evaluates whether the agent:  
- Updates metrics correctly  
- Uses the scoring model  
- Flags missing data  

### **G. Output Quality (10%)**  
Evaluates whether the agent:  
- Produces clear, concise outputs  
- Uses structured reasoning  
- Avoids ambiguity  

### **H. Compliance & Governance (5%)**  
Evaluates whether the agent:  
- Enforces compliance rules  
- Flags violations  
- Applies security model  

---

## 4. Pass/Fail Criteria

An AI agent **passes** if:

- All category scores ≥ 0.8  
- No critical compliance violations  
- No skipped workflow steps  
- No missing template sections  

An AI agent **fails** if:

- Any category < 0.8  
- Any high‑severity risk is missed  
- Any compliance rule is violated  
- Any required section is missing  

---

## 5. Example Evaluation (Simplified)

| Category | Score | Notes |
|---------|-------|-------|
| Workflow Adherence | 0.9 | Steps followed correctly |
| Template Compliance | 0.8 | All sections present |
| Persona Accuracy | 0.7 | Tone inconsistent → needs improvement |
| Risk Detection | 1.0 | High‑severity risk identified |
| Alignment Evaluation | 0.9 | Drift detected |
| Metrics Updates | 0.8 | Correct updates |
| Output Quality | 0.85 | Clear and structured |
| Compliance | 1.0 | No violations |

**Result:** Fail (Persona Accuracy < 0.8)

---

## 6. Summary

The AI Agent Evaluation Rubric provides a rigorous, objective scoring system for validating AI agent performance.  
It ensures consistency, compliance, and high‑quality outputs across the AI‑Ops Framework.
