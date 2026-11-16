# Evidence-based phase map

These are selectable work states, not mandatory steps or Zoho item statuses. Enter at the state the user's goal and current evidence require. Skip irrelevant states, revisit one when evidence changes, and end when the requested outcome is verified.

| State | Use when | Specialist and required outcome | Exit evidence |
|---|---|---|---|
| Orient | Project, goal, access route, role, or source scope is unresolved | `zoho-sprints` for connection/identity when needed; resolve one project and the requested outcome | Exact project scope and permissible next read are known; writes still require specialist preflight |
| Assess | Existing Zoho work or project conventions must be understood, or Git/BMAD work reconciled | `zoho-project-knowledge` for a justified baseline; `zoho-sprints` for scoped reads, audit, duplicate coverage | Sources and coverage recorded; existing matches and gaps classified |
| Specify | A requirement, gap, defect, or Story must become reviewable work | `user-story-authoring` for World Cup Stories, `zoho-sprints` Story workflow for other projects, `zoho-task-authoring` for Tasks/Bugs | Draft has testable criteria, parent/dependencies, source trace, and known missing native fields |
| Apply | A specific Zoho write is within the user's request | `zoho-sprints` with exact target, role, schema, permissions, duplicate check and required fields | Write result recorded; any ambiguity goes to recovery, never straight to another create |
| Verify | A write, delivery claim, or acceptance needs evidence | `zoho-sprints` read-back and actual-delivery workflow as applicable | Persisted fields and relations verified, or precise partial/unverified status recorded |
| Organize | Dependencies, duplicate disposition, carry-over, or sprint close are requested | `zoho-work-item-linking` and `zoho-sprints` as needed | Links, parent/sprint and status read back; unresolved disposition remains pending |
| Release | A deployable version or release readiness is in scope | `zoho-release-management` | Version source, associations, stage and acceptance evidence verified, or release blocker recorded |

Transitions follow dependencies, not row order. For example, a release request may start at Release and move to Assess if associations are unclear; an ambiguous Apply result moves to Verify/recovery; a new defect can start at Specify. Do not create a project knowledge base, Story, Sprint, or Release merely to traverse the map.

Before changing a Zoho item, check the connected tool's current capabilities and the `zoho-sprints` policy. A stage label is never authorization or proof that a required field, duplicate search, or user decision is complete.
