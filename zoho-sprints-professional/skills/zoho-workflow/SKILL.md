---
name: zoho-workflow
description: Use when guiding a multi-stage Zoho Sprints project workflow or resuming one across chats. Select the next stage from evidence, ask only decisions that block progress, coordinate specialist skills, and keep a project-scoped checkpoint. Use a specialist directly for one focused operation.
---

# Zoho Workflow

Guide one project objective from its current evidence to a verified outcome. This skill coordinates work; it does not grant Zoho permissions or replace specialist rules. For any Zoho read or write, load `zoho-sprints` and follow its role, coverage, authorization, MCP capability, and read-back rules. Follow the working repository's `AGENTS.md` and access constraints.

For a multi-stage request, read [the guided session](references/guided-session.md) and [phase map](references/phase-map.md). Use the [checkpoint template](assets/workflow-status.template.md) only when the workflow spans turns in a resolved local project folder. A focused request can go straight to its specialist without starting a full guided session.

## Start or resume

1. Identify the **one project**, the user's concrete outcome, and the permitted sources. If a matching project checkpoint exists, read it before choosing a stage. Treat it as a lead: recheck live Zoho state, role, pending actions, and relevant source changes before acting.
2. Gather enough evidence to choose the smallest useful stage. Do not make a new project complete a full knowledge-base audit when the request can be fulfilled safely with narrower reads. Do not import BMAD or audit Git without a relevant source.
3. If the goal or project is genuinely ambiguous, show the observed options and ask one concise question. Do the independent work first. Do not ask the user to select a phase when the request and evidence already identify it.
4. State the current stage and the evidence that placed the work there. Complete every step already covered by the user's request, re-evaluating after each result. A stage can be skipped, revisited, or run more than once.

## Route to the specialist

| Current need | Specialist |
|---|---|
| Learn a project's real conventions or build a scoped knowledge base | `zoho-project-knowledge` |
| Read/manage Zoho, audit Git, reconcile approved BMAD, or perform a verified item write | `zoho-sprints` |
| Draft or review a World Cup / Sports Activities User Story | `user-story-authoring` |
| Draft a Story in another project | `zoho-sprints` Story workflow with that project's verified rules; do not carry World Cup fields or cadence across projects |
| Turn a Story or defect into executable developer work | `zoho-task-authoring` |
| Link dependencies, parent/child work, duplicates, or carry-over | `zoho-work-item-linking` |
| Plan or verify a deployable release | `zoho-release-management` |

Use [the phase map](references/phase-map.md) to determine the next outcome and its evidence. The table routes work; it is not a fixed pipeline. A release question can start at release planning, and a single Task request can start with `zoho-task-authoring`.

## Interactive loop

After each specialist result, do one of the following:

- **Continue:** the next action is within the user's goal and authorization, and its prerequisites are verified. Perform it now; do not end with a recommendation for work already authorized.
- **Ask a decision:** a specific missing value or genuine product choice blocks the next action. Present the evidence, 2–3 viable choices when useful, a recommended choice with its effect, and ask only for the unresolved decision. When the user answers, continue from the same stage.
- **Reconcile:** coverage is incomplete, a duplicate is likely, evidence conflicts, or a create/update result is ambiguous. Resolve the uncertainty before another write; never retry a non-idempotent create merely because an immediate search is empty.
- **Stop the affected action:** MCP lacks the operation, identity or required fields are unresolved, or access is denied. State the exact blocker and keep the action pending. Continue independent work in the user's scope when useful.
- **Finish:** the requested outcome is verified and no required action remains. Report what was done, its evidence, and any material limit.

The user may change scope or correct a decision mid-session. Update the working state, preserve completed evidence, and reassess the next stage. Do not silently discard the original goal or replay a prior write.

## Progress and checkpoint

Keep a compact progress view for multi-stage work: goal, project, current stage, completed outputs with source or Zoho IDs, one current blocker or decision, and next action. When a resolved local project folder exists and the workflow spans turns, create or update its private `.zoho-sprints/WORKFLOW_STATUS.md` at a meaningful stage transition, pending result, or handoff using [the template](assets/workflow-status.template.md). Do not create a checkpoint in an unrelated project folder or store secrets, full diffs, or another Developer's item details. The checkpoint is not proof of current Zoho state; refresh it on resume. Keep non-idempotent write intent and recovery in the `zoho-sprints` ledger, not only in this summary.

For a substantial result, name the **current stage**, **completed result**, **next action**, **specialist**, **evidence-based reason**, and **prerequisite**. For a follow-up outside the current request, use `الخطوة التالية الموصى بها: <action> باستخدام <skill> — <reason>. الشرط: <prerequisite>`. When a user decision is pending, ask it directly and keep the dependent work pending. When complete, say `لا توجد خطوة لازمة الآن` if no useful follow-up remains.
