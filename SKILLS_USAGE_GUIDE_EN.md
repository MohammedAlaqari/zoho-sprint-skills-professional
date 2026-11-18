# Zoho Sprints Skills: User Guide

[الدليل العربي](SKILLS_USAGE_GUIDE_AR.md) | [Arabic scenario simulations](SCENARIO_PLAYBOOK_AR.md) | [English scenario simulations](SCENARIO_PLAYBOOK_EN.md)

This guide explains how to request work from the seven skills in this repository. The skills guide the assistant; the connected Zoho account, current MCP tools, and project rules determine what can actually be done. All Zoho access for this repository goes through the configured MCP connection. The examples below are prompts, not recorded Zoho results.

## Start in one prompt

Open the project in Codex and name the **project** and **outcome**:

> Use $zoho-workflow for [project name]. My goal is [specific outcome]. Check the relevant Zoho and local evidence, complete the steps already covered by this request, and ask only for a decision that blocks the next step. If the work spans chats, keep a checkpoint in the resolved local project folder.

Use a specialist directly for one focused operation. A skill can be invoked with `$skill-name` or by name in the request. If a newly installed skill does not appear in an existing session, reload the project or start a new session.

## Choose a skill

| Need | Skill | Expected result |
|---|---|---|
| Coordinate several stages or resume work | [zoho-workflow](.agents/skills/zoho-workflow/SKILL.md) | Current stage, verified progress, blocker, and next action |
| Check MCP, browse or manage Zoho, audit Git, reconcile approved BMAD | [zoho-sprints](.agents/skills/zoho-sprints/SKILL.md) | Scoped findings or a verified change with IDs |
| Draft or review a World Cup / Sports Activities Story | [user-story-authoring](.agents/skills/user-story-authoring/SKILL.md) | Bilingual Story, testable criteria, open fields |
| Draft an executable Task or Bug under a Story | [zoho-task-authoring](.agents/skills/zoho-task-authoring/SKILL.md) | Child-item draft, duplicate check, test expectation |
| Learn one project's conventions | [zoho-project-knowledge](.agents/skills/zoho-project-knowledge/SKILL.md) | Project-specific knowledge base and coverage gaps |
| Link, merge, clone, split or carry work over | [zoho-work-item-linking](.agents/skills/zoho-work-item-linking/SKILL.md) | Correct relationship or continuation, verified afterward |
| Plan, associate or assess a release | [zoho-release-management](.agents/skills/zoho-release-management/SKILL.md) | Version source, stage, associations, readiness evidence |

Any skill that reads or writes Zoho also follows `zoho-sprints` rules. `user-story-authoring` contains World Cup / Sports Activities conventions; another project needs its own verified fields and cadence.

## Set up identity and check the connection

Start with a read-only request:

> Use $zoho-sprints to check the configured Zoho MCP connection, available operations, and whether a workspace can be read. Make no changes.

For project work, the assistant needs the exact project and your verified Zoho user ID and role. The local example is [.agents/skills/zoho-sprints/assets/profile.example.yaml](.agents/skills/zoho-sprints/assets/profile.example.yaml). Place a private copy at `.zoho-sprints/profile.yaml` in the working project and confirm its values from Zoho. Do not store OAuth tokens or passwords in that profile. If the role or identity conflicts, resolve it before a write. A connection check alone does not require an Admin or Developer role.

The source skills live at `.agents/skills/` for Codex and also at `.opencode/skills/` for OpenCode. The package installer supports other editors; see [installation instructions](zoho-sprints-professional/README.md). Run `npm run check` before installing the package. Installation and MCP authentication are separate steps.

## What happens during a guided session

1. The assistant identifies one project, the requested outcome and any relevant checkpoint. It refreshes live evidence before acting.
2. It chooses the smallest useful stage: orientation, assessment, drafting, application, verification, organization or release. These are choices based on evidence, not a fixed sequence.
3. It uses the relevant specialist, checks scope and required fields, and searches for duplicates before creating items.
4. If an actual decision is missing, it asks for that value while completing independent work. A specific create or update request can already authorize that change; routine steps do not need a separate prompt.
5. After a Zoho write, it reads back the affected record. An ambiguous creation stays pending until reconciled.

A multi-chat checkpoint may be stored in `<project>/.zoho-sprints/WORKFLOW_STATUS.md`. It is a resume aid, not proof of Zoho's current state.

## Copy-ready requests

Replace bracketed text with your project values. Supply a local repository or approved BMAD path only when it belongs to that project.

### Existing project and its work

> Use $zoho-workflow to assess [project] in Zoho against [repository path]. Tell me what is verified, what remains, and complete the review steps within this request.

> Use $zoho-project-knowledge to build a project-specific knowledge base for [project] from its Backlog, sprints, Stories, Tasks, Bugs, epics and releases. Record source IDs and incomplete coverage.

> Use $zoho-sprints to audit [repository path] against [project]. Match Git changes to existing Zoho items and report gaps. Do not create items.

> Use $zoho-sprints to reconcile approved BMAD artifacts at [path] with [project]. Identify existing, missing and conflicting work with section references. Do not assume drafts are approved.

### New project, Story, Task or Bug

> Use $zoho-workflow to prepare [project] from [requirements path or text]. Draft reviewable Stories and identify the verified prerequisites for creating project items.

> Use $user-story-authoring to draft a World Cup Story for [business outcome]. Include bilingual names, user value, testable acceptance criteria, dependencies and missing fields. This is a draft.

> Use $zoho-sprints to create the approved Story [title] in [project] and the eligible active sprint. Check the project, role, time window, mandatory fields and duplicates, then read the result back.

> Use $zoho-task-authoring to draft a [Task/Bug] under Story [ID] in [project]. Include the concrete change, acceptance test, assignee and duplicate check. If I explicitly ask to create it, verify the write afterward.

### Relationships, carry-over and release

> Use $zoho-work-item-linking to determine and create the correct relationship between [item A] and [item B] in [project]. Read the existing links first and verify the new one.

> Use $zoho-work-item-linking to review unfinished work in Sprint [name] for [project], classify each item, and carry authorized work to [target sprint]. Apply Part n names and verify parent and links before completing the sprint if my instruction covers closure.

> Use $zoho-release-management to prepare a release for [project] containing [root Story IDs]. Read existing releases and the mobile code version if applicable; verify associations and readiness. Mark it Released only when acceptance evidence supports that stage and the request covers it.

## Read results and handle blockers

- A read, audit or draft request does not authorize a Zoho mutation. A specific create/update request may authorize the named change, subject to live permissions and checks.
- A Developer sees only their assigned work in the answer. A likely match outside that scope is referred for owner/Admin review without exposing its details.
- Duplicate checks cover Backlog plus relevant active, upcoming, completed and canceled sprints and children. Incomplete coverage blocks a create; an existing Backlog item is not copied into the active sprint.
- A successful MCP response is not proof that a write persisted. The assistant reads back the item, link, sprint or release. It does not automatically retry an ambiguous create.
- Large descriptions may exceed the current MCP transport limit. In this repository, the assistant leaves such writes pending and reports the connector limitation instead of using a browser or direct Zoho API.
- Implementation evidence does not by itself mean that a Story was accepted or a release was published. Actual delivery is recorded separately from the original requirements.

For a presentation, use the [English scenario simulations](SCENARIO_PLAYBOOK_EN.md) in order: connection, existing/new project, Story, Task/Bug, relationship, carry-over, release, and recovery. The [older Arabic reference](SKILLS_GUIDE_AR.md) is historical and may contain outdated examples; the current skill files and this guide take precedence.
