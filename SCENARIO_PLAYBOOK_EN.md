# Zoho Sprints Scenario Simulations — English Presenter Playbook

[User guide](SKILLS_USAGE_GUIDE_EN.md) | [الدليل العربي للمحاكاة](SCENARIO_PLAYBOOK_AR.md)

These are **fictional training conversations, not actual Zoho results**. Bracketed values are placeholders. For each case, read the request, the expected response, and the teaching point. Real execution requires verified identity and role, current Zoho MCP tools and permissions, complete relevant coverage, and read-back after a write. This repository does not allow a browser or direct Zoho API access.

**Short presentation route:** 1 → 3 → 6 → 9 → 13 → 16 → 18. **Full presentation:** use all 20 cases. Cases 1–16 cover capabilities; 17–20 cover blockers and recovery.

## 1. Check the connection

**User:** “Check Zoho MCP, the workspace and available operations. Make no changes.”

**Expected assistant:** “I checked the connection with a safe read. Access status: [..]. Relevant operations: [..]. No write occurred.” If the check fails, classify transport, authentication, missing tool, permission or unknown cause.

**Teaching point:** A diagnostic needs no Admin/Developer role and authorizes no mutation. A create tool's presence does not prove account permission.

## 2. Browse a Developer's own work

**User:** “Show my Stories and Tasks in the active sprint for [project].”

**Expected assistant:** “I verified your role, exact Zoho user ID and the sprint. These are only your assigned items: [fictional items]. Coverage: [pages].” If identity is unresolved, ask for the missing value without displaying team work.

**Teaching point:** Filter by the exact Zoho ID; do not disclose another Developer's work even if an internal MCP list includes it.

## 3. Build knowledge for an existing project

**User:** “Use $zoho-project-knowledge to document [project]'s Story, Task, sprint and release conventions.”

**Expected assistant:** “I built a reference scoped to this project, cited source item IDs for each rule, and separated observed facts from inferred patterns. Coverage is [complete/unknown] because [..].”

**Teaching point:** The knowledge base is not proof of a Zoho write. Do not transfer its rules to another project.

## 4. Audit Git against Zoho

**User:** “Audit changes in [repository path] against [project] items. Report only.”

**Expected assistant:** “I matched [commit] to [Story/Task] using the work description, files and evidence. I recorded unmatched changes, items without Git evidence and conflicts. I created no Zoho items.”

**Teaching point:** A commit shows a code change; it does not prove Story acceptance or release.

## 5. Reconcile approved BMAD

**User:** “Compare approved BMAD artifacts at [path] with [project], and identify existing and missing work.”

**Expected assistant:** “I verified the approved source and searched Backlog, relevant sprints and children. Here are matched sections, gaps and conflicts with section references. Unapproved drafts were excluded.”

**Teaching point:** A BMAD section may already be represented by a Task; do not create one Story per section automatically.

## 6. Prepare a new project

**User:** “Prepare [project] from [requirements], including the necessary sprints and structure.”

**Expected assistant:** “I drafted the project and sprint scope, verified the Admin role, live create tool, permission, fields and duplicates. I created only the requested items and read back project and sprint IDs; any missing prerequisite remains explicit.”

**Teaching point:** `zoho-workflow` routes stages; the wording of a request does not confer Admin rights. Project creation does not implicitly create Stories or a release.

## 7. Draft a World Cup Story

**User:** “Use $user-story-authoring to draft a World Cup Story for [business outcome]. Draft only.”

**Expected assistant:** “I provide Arabic and English names, role/want/value, numbered testable acceptance criteria, dependencies, requester, tester, estimate, open fields and any BMAD/Git reference.”

**Teaching point:** A draft is not a Zoho item. World Cup conventions do not apply automatically to other projects.

## 8. Create a Story in an eligible sprint

**User:** “Create Story [title] in [project] in the appropriate active sprint.”

**Expected assistant:** “I verified role, fields and complete duplicate coverage. For a Developer, the sprint must have Zoho Active status and the current instant must be within its dates in the verified timezone. I ask if two eligible sprints remain. After creation, I read back the item type, ID, sprint and assignee.”

**Teaching point:** A sprint's label or date overlap alone is insufficient. Incomplete duplicate coverage blocks a create.

## 9. Create a Task under a Story

**User:** “Create a Task for [change] under Story [ID].”

**Expected assistant:** “I verified the parent type and, for a Developer, that the parent is assigned to them. I checked duplicates, described the concrete change, acceptance test, dependencies, assignee and project-specific estimate. I read back the Task, parent link, sprint and fields.”

**Teaching point:** A Task is executable child work. The World Cup zero-point Task rule is project-specific.

## 10. Create a reproducible Bug

**User:** “Record a Bug under Story [ID] for [defect].”

**Expected assistant:** “I verified the parent, duplicates and permissions; recorded environment, reproduction steps, expected/actual behavior, impact and safe evidence; selected the real Bug type; and read back the new item.”

**Teaching point:** Do not relabel a defect as a Task to avoid triage or close it without verification evidence.

## 11. Document actual delivery

**User:** “Compare the implementation of [Story] with its criteria and add actual-delivery notes.”

**Expected assistant:** “For each criterion I report `delivered`, `partial`, `not_delivered`, `delivered_differently` or `unverified` with evidence. I preserve the original requirements, append a marked delivery section using the specified separator, and read back the description.”

**Teaching point:** Existing code is not Story acceptance; do not rewrite original requirements to match implementation.

## 12. Join an existing matching Story

**User:** “If a matching Story exists, add me as an assignee instead of creating a copy.”

**Expected assistant:** “I verify the match, your exact user ID and assignment permission. I preserve all current assignees, add only you, then read back membership. If the tool or permission is absent, I leave an owner/Admin assignment request pending.”

**Teaching point:** A Developer cannot see another person's Story details until assignment is verified.

## 13. Link a dependency

**User:** “Link [Task A] as blocking [Task B] in [project].”

**Expected assistant:** “I read both items and their existing links, resolve direction and link type from this project's configuration, link once and read it back.”

**Teaching point:** Shared module or assignee does not prove a dependency. Failed link discovery is `unknown_coverage`.

## 14. Consolidate small Stories

**User:** “Consolidate Stories [A, B, C] that describe one outcome.”

**Expected assistant:** “I keep one survivor and its ID, merge acceptance scope, mark absorbed Stories `[Merged into ...]`, move them to Backlog within the authorization, and read back names, points, status and links.”

**Teaching point:** A merge does not use `Part n` and does not delete absorbed Stories.

## 15. Carry over work and close a sprint

**User:** “Review unfinished items in Sprint [old], carry approved work into [new], then close [old].”

**Expected assistant:** “I read all items and children, classify each as complete, carry, split or cancel with reason, and ask about any unresolved disposition. I apply `Part 1 -`, then `Part 2 -` at the next continuation; verify parents, links and fields; close only when every item is handled and the operation is permitted; then read back sprint status.”

**Teaching point:** Closing a sprint does not mark its items Done. A field that refuses an update is reported as `unsupported_write`.

## 16. Plan and assess a release

**User:** “Prepare a release for [project] and root Stories [IDs], then assess readiness.”

**Expected assistant:** “I read current releases, stages and associations. For mobile, I read the code version first; otherwise I continue the last mobile version in Zoho. I reuse a matching open release or create the appropriate one, associate root Stories and read back the associations. I do not mark `Released` without acceptance evidence and request scope for that stage.”

**Teaching point:** A release is a deployable version, not a sprint or status flag. Creating one does not change Story status.

## 17. Duplicate or incomplete coverage

**User:** “Create a new Story for [feature] now.”

**Expected assistant:** “A Backlog match is reused or proposed for an authorized move/assignment. If Backlog, a relevant page or children cannot be searched, I record `unknown_coverage` and leave creation pending. I do not disclose out-of-scope match details to a Developer.”

**Teaching point:** Outcomes are `exact`, `likely`, `related`, `none_in_scope` or `unknown_coverage`. One sprint's results cannot prove project-wide absence.

## 18. Ambiguous creation

**User:** “Create Task [title] under [Story].” The MCP call then times out.

**Expected assistant:** “The operation is `pending_verification`. I record and later reconcile it. An immediate empty search does not prove failure, so I do not retry Create automatically.”

**Teaching point:** Retrying a non-idempotent create can duplicate work. The tool response alone is not read-back evidence.

## 19. Long description or missing tool

**User:** “Save this full Story description.” MCP returns `414`, or exposes no update tool.

**Expected assistant:** “I keep the write pending and name the connector limit. I may prepare the complete text locally, but I do not truncate it, move it to a comment while claiming the description was saved, or use a browser or direct Zoho API.”

**Teaching point:** A complete local draft is different from a persisted Zoho description.

## 20. Resume a previous session

**User:** “Continue where we stopped in [project].”

**Expected assistant:** “I read this project's checkpoint and pending-operation ledger, refresh the relevant Zoho and local evidence, reconcile `pending_verification` first, and retain confirmed work. I report verified and pending outcomes, one next action, or say no action is needed.”

**Teaching point:** A checkpoint is a lead, not proof of current Zoho state; it belongs in the resolved project folder only.

## Presenter close

After each case ask: “What is source-verified, what is pending, and what single next step remains?” Never present a fictional response as live execution.
