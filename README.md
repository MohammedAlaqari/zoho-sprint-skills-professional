# Zoho Sprints Skills Professional

[![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-blue)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-informational.svg)](LICENSE)
[![Node.js 22+](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org/)
[![CI](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml/badge.svg)](https://github.com/MohammedAlaqari/zoho-sprint-skills-professional/actions/workflows/skills.yml)

**Zoho Sprints Skills Professional** is a collection of agent skills that turns AI coding agents into structured assistants for **Zoho Sprints** projects — planning, authoring, and delivery work executed through your own Zoho Sprints MCP connection.

Version **3.0.0** ships **seven skills**, including a guided, resumable multi-stage workflow, Story and developer Task authoring, read/write checks, a local audit ledger contract, and generated portable skill distributions.

> The package contains no Zoho MCP endpoint, OAuth credentials, or personal data. Connect your own MCP server and keep secrets local to your environment.

## Overview

The package helps an AI coding agent work on Zoho Sprints in a controlled and auditable way:

- **Guided, resumable workflow** — phase maps built from evidence, pending decisions asked only when required, and a per-project resume checkpoint.
- **Story and Task authoring** — user stories and developer Tasks/Bugs with acceptance criteria, routing, duplicate checks, and Sprint window validation.
- **Read / write checks** — connection checks, read coverage, write verification, and audit continuity before acting.
- **Local audit ledger** — change ledger, pending actions, and audit reports kept inside the target project.
- **Large descriptions** — oversized writes stay pending with a byte-preserving separator instead of silent truncation.

## Skills

| Skill | Responsibility |
|---|---|
| `zoho-workflow` | Guided, resumable multi-stage workflow with pending decisions and per-project resume points. |
| `zoho-sprints` | Core Sprints operations: admin management, browse / create / join, Git audit, BMAD import, delivery documentation, self-assignment, checks, references. |
| `user-story-authoring` | User story authoring: templates (Arabic / English), team routing, estimation, Zoho fields and sprints. |
| `zoho-project-knowledge` | Project knowledge base for agents. |
| `zoho-work-item-linking` | Work item linking and dependency handling. |
| `zoho-release-management` | Release management: versioning and mobile version detection. |
| `zoho-task-authoring` | Developer Task / Bug authoring under a parent story. |

## Requirements

- Node.js 22 or later (to run the package tooling).
- An AI coding agent that supports Skills and MCP (Claude Code, Codex, Cursor, Kiro, OpenCode, Antigravity, or generic).
- A Zoho account with a working Zoho Sprints MCP server and valid permissions.

## Installation

The package contains no MCP endpoint and no credentials.

From the `zoho-sprints-professional` folder:

```powershell
cd 'F:\zoho sprint skills\zoho-sprints-professional'
npm run check
node tools/install.mjs --editor codex --target 'C:\path\to\your\project'
```

Supported editors: `codex`, `claude`, `opencode`, `cursor`, `kiro`, `antigravity`, `generic`.

An existing installation is refused unless `--force` is passed explicitly. Review the current installation first; backups are kept in `.zoho-sprints-skill-backups/`.

## Quick Start

1. Configure the MCP server in your agent.
2. Create `.zoho-sprints/profile.yaml` from the skill's `assets/profile.example.yaml` (role, workspace, user, project, timezone).
3. Run the connection check, then follow the `zoho-workflow` guided flow.

## Documentation

| Audience | Guide |
|---|---|
| Arabic | [User guide](SKILLS_USAGE_GUIDE_AR.md) · [Scenarios](SCENARIO_PLAYBOOK_AR.md) |
| English | [User guide](SKILLS_USAGE_GUIDE_EN.md) · [Scenarios](SCENARIO_PLAYBOOK_EN.md) |
| Technical | [Getting started (Arabic)](zoho-sprints-professional/GETTING_STARTED_MCP_AR.md) · [Architecture](zoho-sprints-professional/docs/ARCHITECTURE_AR.md) |

## Development

```powershell
npm run check   # tests + package consistency check
npm run sync    # regenerate portable skills and manifest
npm test        # run the contract tests
```

CI runs the same checks via the `skills-ci` GitHub Actions workflow.

## Limitations

- MCP-only design: the package never calls the Zoho API directly and ships no credentials.
- Oversized description writes remain pending until the current Zoho MCP `UpdateItem` / `CreateSubItem` tools support request bodies.

## License

Released under the [MIT License](LICENSE).

---

**Arabic version:** [مهارات Zoho Sprints Professional](README_AR.md) · **Release report:** [zoho-sprints-professional/RELEASE-REPORT.md](zoho-sprints-professional/RELEASE-REPORT.md)
