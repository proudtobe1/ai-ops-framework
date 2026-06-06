# EXAMPLES

This file provides runnable, copy‑paste examples showing how to load and use the AI‑Ops Framework with an LLM or automation layer. Each example includes preconditions, inputs, sample prompts, expected outputs, and verification steps.

---

## 1. Load the Framework (manifest driven)

Purpose: Read the repository manifest and enumerate available components.

Preconditions:
- ai-ops-manifest.json exists at the repo root.
- Python 3.8+ is available.

Example (Python):

    import json
    from pathlib import Path

    manifest_path = Path("ai-ops-manifest.json")
    with manifest_path.open("r", encoding="utf-8") as f:
        manifest = json.load(f)

    entrypoints = manifest.get("entrypoints", {})
    for key, rel in entrypoints.items():
        p = Path(rel)
        print(f"{key.capitalize()}: {p} -> exists: {p.exists()}")
        if p.exists():
            print([str(x.name) for x in p.iterdir()])

Verification:
- Confirm entrypoints include systems, workflows, templates, and prompts.
- Confirm printed directories list expected files.

---

## 2. Load a System (ai-ops-system-example)

Goal: Load an ai-ops-system-[name].md file and produce a structured facilitator brief.

Preconditions:
- systems/ai-ops-system-example.md exists.
- ai-ops-manifest.json lists the system file.
- You have an LLM endpoint or local LLM wrapper.

Inputs (file read):

    from pathlib import Path
    system_path = Path("systems/ai-ops-system-example.md")
    system_text = system_path.read_text(encoding="utf-8")

Prompt (LLM):

    You are an AI assistant that ingests an operating model and returns a concise facilitator brief.

    Input: (contents of systems/ai-ops-system-example.md)

    Task:
    1. Extract the system's purpose in one sentence.
    2. List the primary roles and their responsibilities.
    3. Produce a 5-step agenda for a 60-minute cross-functional planning session.
    Return JSON with keys: purpose, roles, agenda.

Expected Output (example JSON):

    {
      "purpose": "Align cross-functional teams on quarterly priorities and risks.",
      "roles": [
        {"role": "Product Owner", "responsibilities": "Prioritize backlog; define success metrics"},
        {"role": "Engineering Lead", "responsibilities": "Estimate work; identify technical risks"},
        {"role": "Ops Lead", "responsibilities": "Coordinate deployments; monitor reliability"}
      ],
      "agenda": [
        "10m — Context and goals",
        "15m — Review metrics and recent incidents",
        "15m — Prioritize top initiatives",
        "10m — Identify risks and mitigations",
        "10m — Assign actions and next steps"
      ]
    }

Verification:
- Confirm JSON contains purpose, roles, and agenda.
- Confirm roles map to the system document.

---

## 3. Run a Workflow (ai-ops-workflow-weekly-ops-review)

Goal: Execute a weekly ops review workflow that validates inputs, summarizes highlights, surfaces risks, and renders a weekly report using a template.

Preconditions:
- workflows/ai-ops-workflow-weekly-ops-review.md exists.
- templates/ai-ops-template-weekly-report.md exists.
- ai-ops-manifest.json lists both files.

Inputs (JSON):

    {
      "team": "Platform",
      "period_start": "2026-05-25",
      "period_end": "2026-05-31",
      "highlights": [
        "Deployed feature X to production",
        "Resolved incident INC-1234"
      ],
      "risks": [
        "Database migration scheduled next week"
      ],
      "metrics": {
        "uptime": "99.98%",
        "deploys": 3
      }
    }

Prompt (LLM):

    You are an AI assistant that executes the ai-ops-workflow-weekly-ops-review workflow.

    Inputs:
    - team: Platform
    - period_start: 2026-05-25
    - period_end: 2026-05-31
    - highlights: Deployed feature X to production; Resolved incident INC-1234
    - risks: Database migration scheduled next week
    - metrics: uptime 99.98%, deploys 3

    Steps:
    1. Validate inputs and list any missing fields.
    2. Summarize highlights into 2–3 concise bullets.
    3. For each risk, propose one mitigation and an owner.
    4. Populate the ai-ops-template-weekly-report.md structure and return the final report in markdown.
    Return only the final markdown report.

Expected Output (markdown excerpt):

    # Platform Weekly Report (2026-05-25 — 2026-05-31)

    ## Highlights
    - Deployed feature X to production
    - Resolved incident INC-1234

    ## Metrics
    - Uptime: 99.98%
    - Deploys: 3

    ## Risks & Mitigations
    - Database migration scheduled next week — Mitigation: run pre-migration backup and smoke tests; Owner: Ops Lead

    ## Action Items
    - Run migration readiness checklist by 2026-06-02 (Owner: Ops Lead)

Verification:
- Confirm the report includes Highlights, Metrics, Risks & Mitigations, and Action Items.
- Confirm ai-ops-manifest.json lists the workflow and template.

---

## 4. Use a Template (ai-ops-template-weekly-report)

Goal: Fill an ai-ops-template-[name].md template to produce a polished deliverable.

Preconditions:
- templates/ai-ops-template-weekly-report.md exists and contains placeholders.

Inputs (template + data):

    from pathlib import Path
    template = Path("templates/ai-ops-template-weekly-report.md").read_text(encoding="utf-8")
    data = {
      "team": "Platform",
      "period": "2026-05-25 — 2026-05-31",
      "highlights": ["Deployed feature X to production", "Resolved incident INC-1234"],
      "metrics": {"uptime": "99.98%", "deploys": 3},
      "risks": ["Database migration scheduled next week"]
    }

Prompt (LLM):

    You are an AI assistant that fills templates.

    Template:
    <insert template contents here>

    Data:
    - team: Platform
    - period: 2026-05-25 — 2026-05-31
    - highlights: Deployed feature X to production; Resolved incident INC-1234
    - metrics: uptime 99.98%, deploys 3
    - risks: Database migration scheduled next week

    Task:
    Replace placeholders with the provided data and produce a final markdown report. Keep language concise and professional.

Expected Output:
- A complete markdown report with placeholders replaced and a short executive summary.

Verification:
- Confirm no template placeholders remain.
- Confirm the executive summary is under three sentences.

---

## Appendix — Quick commands and checks

Validate manifest paths:

    python - <<'PY'
    import json, os
    m=json.load(open('ai-ops-manifest.json'))
    missing=[p for p in m.get('files',[]) if not os.path.exists(p)]
    print('Missing files:', missing)
    PY

Find stale references:

    git grep -n "USAGE_EXAMPLE.md|GOVERNANCE_MODEL.md|MODEL_CARD.md|MODULE_REGISTRY.md|CONTRIBUTING_DEEP.md|model-manifest.json" || echo "No stale refs found"

Quick LLM smoke test:

    curl -s -X POST "https://api.example-llm.com/v1/generate" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      -d '{"prompt":"Summarize: Deployed feature X to production; Resolved incident INC-1234","max_tokens":200}'

---

## Summary

This file contains runnable examples for:
- manifest-driven framework loading,
- system ingestion and facilitator brief generation,
- workflow execution with template rendering,
- template filling for polished deliverables.

Use these examples as the canonical starting point for integrating the AI‑Ops Framework with your LLM or automation layer.
