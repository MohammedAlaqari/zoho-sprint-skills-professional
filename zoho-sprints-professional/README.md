# Zoho Sprints Professional Skills

[![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-blue)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](../../LICENSE)
[![Node.js 22+](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org/)
[![CI](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml/badge.svg)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml)

Version **3.0.0** contains seven Zoho Sprints skills, including a guided, resumable multi-stage workflow and Story and developer Task authoring, with read/write checks, a local audit ledger contract, and generated portable distributions.

For end users and presentations: [Arabic user guide](../../SKILLS_USAGE_GUIDE_AR.md), [English user guide](../../SKILLS_USAGE_GUIDE_EN.md), [Arabic simulations](../../SCENARIO_PLAYBOOK_AR.md), and [English simulations](../../SCENARIO_PLAYBOOK_EN.md).

## Skills

| Skill | Purpose |
|---|---|
| `zoho-workflow` | Guided, resumable multi-stage workflow with pending decisions and per-project resume points. |
| `zoho-sprints` | Core Sprints operations: admin management, browse / create / join, Git audit, BMAD import, delivery documentation, self-assignment, checks, references. |
| `user-story-authoring` | User story authoring: templates (Arabic / English), team routing, estimation, Zoho fields and sprints. |
| `zoho-project-knowledge` | Project knowledge base for agents. |
| `zoho-work-item-linking` | Work item linking and dependency handling. |
| `zoho-release-management` | Release management: versioning and mobile version detection. |
| `zoho-task-authoring` | Developer Task / Bug authoring under a parent story. |

## Installation

Requires Node.js 22+. Run `npm run check` before installing. Use:

```powershell
node tools/install.mjs --editor codex --target <project>
```

for a first install; add `--force` only after reviewing an existing installation. MCP authentication and the project-local role profile are configured separately.

Supported editors: `codex`, `claude`, `opencode`, `cursor`, `kiro`, `antigravity`, `generic`.

The package contains no private MCP endpoint or OAuth credentials.

The current Zoho MCP tool sends descriptions as query parameters; MCP-only workflows must leave oversized writes pending rather than silently truncating them or switching to the direct API.

## Documentation

- [Getting started and MCP setup (Arabic)](GETTING_STARTED_MCP_AR.md)
- [Release report](RELEASE-REPORT.md)
- [Requirements traceability (Arabic)](docs/REQUIREMENTS-TRACEABILITY_AR.md)
- [Architecture (Arabic)](docs/ARCHITECTURE_AR.md)
- [Comparison and gaps (Arabic)](docs/COMPARISON-AND-GAPS_AR.md)

## License

Released under the [MIT License](../../LICENSE).

See the [Arabic guide](README_AR.md) and [requirements map](docs/REQUIREMENTS-TRACEABILITY_AR.md).
