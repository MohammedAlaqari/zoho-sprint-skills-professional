# Zoho Sprints Professional Skills

Version 3.0.0 contains seven Zoho Sprints skills, including a guided, resumable multi-stage workflow and Story and developer Task authoring, with read/write checks, a local audit ledger contract, and generated portable distributions. See the [Arabic guide](README_AR.md) and [requirements map](docs/REQUIREMENTS-TRACEABILITY_AR.md).

Requires Node.js 22+. Run `npm run check` before installing. Use `node tools/install.mjs --editor codex --target <project>` for a first install; add `--force` only after reviewing an existing installation. MCP authentication and the project-local role profile are configured separately. The package contains no private MCP endpoint or OAuth credentials. The current Zoho MCP tool sends descriptions as query parameters; MCP-only workflows must leave oversized writes pending rather than silently truncating them or switching to the direct API.
