---
name: zoho-task-authoring
description: Use when turning a Story, defect, or approved requirement into an executable Zoho Sprints Task or Bug under a parent Story, including the Task title, description, acceptance criteria, test expectation, estimate, assignee and duplicate check for Admin or Developer roles.
---

# Zoho Task Authoring

A Task is executable work under a Story. A Bug is a defect under a Story. Neither is a Story: if the work needs a user, a business value and independent acceptance, use `user-story-authoring` instead.

Load `zoho-sprints` for role, read coverage, field completeness, permissions and write verification. For the World Cup / Sports Activities project, load `user-story-authoring` for its routing and estimation rules. For other projects, use verified project-specific team, layout and estimation evidence; do not carry World Cup field IDs or conventions across projects.

## Non-negotiable rules

- A Task or Bug always has a verified parent User Story. Never create an orphan Task, and never relabel a Story as a Task to avoid writing acceptance criteria.
- Admin may create a child under any Story in scope. A Developer may create a child only under a Story assigned to that Developer's exact Zoho user ID.
- Search the Backlog plus every relevant active, upcoming, completed and canceled sprint, including existing children, before creating. A likely or unknown match stays pending; never copy a Backlog match into the parent.
- Resolve the live Task/Bug item type, priority, sprint, parent and assignee IDs from Zoho. Do not reuse IDs from another project or workspace.
- Resolve the assignee from the target project's verified team and assignment rules. Apply the **Current Project Team**, Analyst and backup rules only when the target project is World Cup / Sports Activities and those fields are verified there.
- Preserve an existing description byte-for-byte. Append the exact separator `##+=================================================##` on its own line, then the new section. Use `zoho-sprints/scripts/append-description.mjs`. If MCP rejects a long payload, follow the `zoho-sprints` large-description rule: use a direct API fallback only when permitted; leave MCP-only writes pending.
- A write is not complete until the child, its parent link, sprint, type, assignee and description are read back. An ambiguous response stays pending.
- Use the target project's verified Task estimation convention. In World Cup / Sports Activities, Tasks carry `0` points by default. Use points or hours elsewhere only when that project tracks Task effort; never invent an estimate to fill a required field.

## Choose the path

| Role and request | Path |
|---|---|
| Admin adds work under a Story | Read the Story, then follow the drafting sequence below |
| Admin converts a defect into a Bug | Same sequence, Bug type, plus reproduction fields |
| Developer adds work under an assigned Story | Verify assignee contains the current user's exact ID before drafting |
| Developer wants a new independent Story | Stop; use the Developer Story workflow in `zoho-sprints` |
| The request is really a Story | Stop; use `user-story-authoring` |

## Drafting sequence

1. **Read the parent.** Confirm type, sprint, status, assignees, acceptance criteria and existing children. Identify which criterion the Task serves.
2. **Search for duplicates.** Record the scopes searched and the classification: exact, likely, related, none-in-scope or unknown coverage. Incomplete coverage blocks creation.
3. **Draft the work.** Use [the Task template](assets/task-template-ar-en.md). State the observed need, the specific change, observable acceptance criteria, the test that proves it, dependencies and the expected evidence. Mark assumptions instead of inventing product rules.
4. **Map the fields.** Resolve title, Arabic and English names when required, description, parent, sprint, type, priority, assignee and dates from the target project's live layout. Treat `UDF_CHAR3` and `UDF_CHAR4` as World Cup examples only after verifying the actual layout. Do not assume a universal mandatory list.
5. **Present the preflight.** Show the target parent, proposed title and description, acceptance criteria, assignee and source of every ID. Wait for authorization where the user requires it.
6. **Write and read back.** Create or update only the authorized fields, then read the child and the parent. Report exact IDs and any field that did not persist.

## Bug path

A Bug keeps the same parent, duplicate check and read-back rules, and adds:

- environment or build where the defect appears;
- steps to reproduce, expected result and actual result;
- severity and business impact;
- evidence (log, screenshot, failing test) without secrets or customer data.

Do not convert a Bug into a Task to avoid triage, and do not close a Bug without verification evidence.

## Estimation and priority

- Estimate by analogy only when the project tracks Task effort; otherwise follow its verified empty or zero-point convention and record that the project does not measure Tasks.
- Set priority from impact, urgency, risk and dependency, with one sentence of rationale. Do not equate High with large.
- A Task that grows beyond its parent Story's scope becomes a new Story, not a larger Task.

## Output contract

Return: parent Story ID, proposed or created Task/Bug ID, type, sprint, assignee IDs, points, duplicate-search result, description hash before/after when a description was written, read-back result, and any unresolved field.

For a multi-stage workflow, add one evidence-based next action using the `zoho-workflow` handoff format. After a verified child write, recommend linking or starting the next dependent Task only when the parent's remaining criteria require it; otherwise recommend delivery evidence or Story review.
