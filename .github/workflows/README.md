# Workflows Directory — Automation & Continuous Integration

## Overview
The `workflows` directory contains the continuous integration (CI) and automated pipeline configurations for the repository. These workflows validate structural integrity, enforce code quality baselines, and simulate documentation deployment on every push and pull request.

---

## 📁 Automation Workflow Registry

* [ci.yml](./ci.yml) — Synchronous multi-language syntax linter suite (Markdown, JSON, YAML) mapped to pull request intake validation gates.
* [docs-autobuild.yml](./docs-autobuild.yml) — Automated MkDocs compilation and live Mermaid syntax validation pipeline.
