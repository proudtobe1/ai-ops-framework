# AI-Ops Framework

A collection of AI-enabled operational workflows, decision systems, and execution frameworks designed to improve organizational velocity, systemic alignment, and runtime governance.

## 🎯 Purpose

The framework exists to solve a simple problem:

> Modern teams are drowning in information but starving for clarity.

AI can fix that — but only if it’s applied through a **repeatable operating model**, not ad‑hoc prompts. This repository provides that model.

## 🧠 Core Principles

1. **Clarity over complexity** — Systems must be immediately understandable.
2. **Repeatability over improvisation** — Operations should follow reliable, scalable patterns.
3. **Human judgment + AI acceleration** — AI augments and speeds up execution; humans remain the critical decision-makers.
4. **Modularity** — Plug-and-play components tailored to organizational needs.
5. **Scalability** — Built to grow seamlessly from seed-stage startups to enterprise operations.

## 🛡️ Core Validation Vectors & Architecture

To ensure enterprise-grade reliability, the repository incorporates strict runtime governance across five core validation vectors:

1. **Vector 1: Provenance Logging (`validators/provenance_logger.py`)** — Secures input-to-output lineage tracking and metadata generation.
2. **Vector 2: Schema Enforcement (`validators/schema_enforcer.py`)** — Validates runtime JSON and payload structures against strict system schemas.
3. **Vector 3: Judge Calibration (`validators/judge_calibration.py`)** — Measures Mean Absolute Error (MAE) and rubric adherence for LLM-as-a-Judge outputs against gold-standard baselines.
4. **Vector 4: Seed Stability (`validators/seed_stability.py`)** — Enforces deterministic execution and statistical variance control across random generations.
5. **Vector 5: Vector Drift (`validators/vector_drift.py`)** — Monitors embedding distributions to detect and flag semantic drift over time.

## 🚀 Quickstart

### 1. Prerequisites

To get the most out of this framework, you will need access to a modern Large Language Model (LLM) environment (e.g., ChatGPT, Claude, Gemini) or an AI orchestration layer capable of parsing structured text/markdown, alongside a Python 3.11+ and Node.js environment for local test execution.

### 2. Clone the Repository

Run the following commands to set up the framework locally:

```bash
git clone https://github.com/proudtobe1/ai-ops-framework.git
cd ai-ops-framework
```

### 3. Explore the Core Components

* `systems/` — Foundational operating models, governance structures, and decision systems.
* `workflows/` — Operational processes and cadences.
* `templates/` — Communication and reporting structures.
* `validators/` — Core Python validation engines implementing the 5 core vectors.
* `examples/` — Human-executable demonstration scripts.
* `tests/` — Automated pytest and Node.js test suites.
* `docs/` — Architecture diagrams and extended documentation.

### 4. Load the Framework

Review the practical examples in `EXAMPLES.md` to see how to load these configurations, workflows, and templates directly into your LLM or automation layer to generate your first structured operational output.

## 📦 Installation & Integration

The `ai-ops-framework` provides both **Python** validation engines (vector drift, judge calibration, seed stability) and **JavaScript/Node.js** tooling (manifest linters and runtime schema checkers).

---

### 🐍 Python Validation Engine (`pip`)

Install the Python vector validation modules directly into your project or virtual environment using `pip`:

```bash
pip install git+[https://github.com/proudtobe1/ai-ops-framework.git](https://github.com/proudtobe1/ai-ops-framework.git)
```

#### Dependencies & Local Test Runner
If running or testing the framework locally:

```bash
# Install core dependencies
python3 -m pip install pytest jsonschema pydantic numpy

# Run full vector validation test suite
PYTHONPATH=. python3 -m pytest tests/ -v
```

---

### 🟨 JavaScript / Node.js Tooling (`npm`)

Install the JS schema linter and runtime test utilities directly from GitHub into your Node project:

```bash
npm install git+[https://github.com/proudtobe1/ai-ops-framework.git](https://github.com/proudtobe1/ai-ops-framework.git)
```

#### Run Local Linters & Runtime Verification

```bash
# Run the programmatic system manifest linter
bash systems/scripts/verify-steady-state.sh

# Run Node runtime test suite
node tests/strict_json_test.js
node tests/drift_adversary_test.js
node tests/soundness_test.js
```

## 🛠️ How to Use This Repository

* **For Operators & Chiefs of Staff:** Leverage the `workflows/` directory to build highly repeatable, automated operational rhythms.
* **For Founders & Executives:** Use the `systems/` directory to formally define how your organization governs, aligns, and executes.
* **For Cross-Functional Teams:** Use the `templates/` directory to standardize reporting, status updates, and clear documentation.
* **For Contributors:** Review the `docs/` folder to understand the underlying architecture and philosophical design choices.

## 📚 Repository Structure & Naming Conventions

* `systems/` -> Files follow: `ai-ops-system-[name].md`
* `workflows/` -> Files follow: `ai-ops-workflow-[name].md`
* `templates/` -> Files follow: `ai-ops-template-[name].md`
* `use-cases/` -> Files follow: `ai-ops-use-case-[name].md`
* `starter-prompts/` -> Files follow: `prompt-[name].md`
* `docs/` -> Conceptual models and deep-dive reference documentation.

## 🗺️ Roadmap

See `ROADMAP.md` for planned enhancements, upcoming functional modules, and long‑term technical direction.

## 🤝 Contributing & Governance

We welcome community contributions! To get started, please read our quickstart guide in `CONTRIBUTING.md`. For detailed technical rules, stylistic guidelines, and how architectural decisions are validated by the governance board, see `CONTRIBUTING_DETAILED.md` and `PROJECT_GOVERNANCE.md`. All contributors are expected to adhere to our standards outlined in `CODE_OF_CONDUCT.md`.

## 📁 Root Directory Registry

### Physical Core Baseline
* `.markdownlint.json` — Formatting and validation engine configuration.
* `LICENSE` — MIT legal perimeter and compliance boundary.
* `README.md` — Framework entry point and system registry map.
* `ai-ops-manifest.json` — Automated machine-readable operational manifest.
* `mkdocs.yml` — Documentation deployment pipeline schema.

### Governance & Contribution
* `CODE_OF_CONDUCT.md`
* `CONTRIBUTING.md`
* `CONTRIBUTING_DETAILED.md`
* `PROJECT_GOVERNANCE.md`

### Reference & Documentation
* `FAQ.md` — Frequently asked structural questions.
* `GLOSSARY.md` — Standardized operating taxonomy definitions.
* `EXAMPLES.md` — Practical execution runs and loading scripts.

### Model Metadata & Registry
* `AI_OPS_MODEL_CARD.md` — Framework capability and orientation parameters.
* `AI_OPS_MODULE_REGISTRY.md` — Extended sub-module system registration index.
