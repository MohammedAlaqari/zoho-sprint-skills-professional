# Guided session and resumption

Use this for a request that spans more than one specialist or more than one turn. Keep the conversation natural: the user supplies the outcome, while this workflow chooses the next useful operation from evidence. A focused request goes directly to its specialist.

## Opening move

1. Read the user's goal and any existing project checkpoint. Resolve the intended project from the user's request, private profile, and live Zoho data when item work is needed. A display name alone is not an exact project or user ID.
2. State the observed starting point in one or two sentences: project, goal, current stage, and evidence or missing input. Give the next action you are taking. Do not show a generic menu when the goal is clear.
3. If several goals or projects genuinely fit, make a small choice explicit after checking available context. Offer at most three context-specific options, recommend one when evidence supports it, and explain what each choice changes. Do not infer Admin rights from the user's answer alone; follow `zoho-sprints` identity verification.

Requests such as «ابدأ»، «كمّل»، or «ما التالي؟» start or resume this same loop. Use the user's existing goal and project checkpoint when available instead of asking for the objective again.

## Work loop

1. Perform the smallest relevant read or specialist step. For Zoho work, use `zoho-sprints` and its live MCP schema. For local drafts, use the target project's verified rules; `user-story-authoring` is specific to World Cup / Sports Activities.
2. Update the stage from the result, not from a fixed sequence. Record which outcome is verified, partial, blocked, or unverified. Do not equate a draft, a tool success, a Git commit, or a BMAD status with Zoho acceptance.
3. Continue through authorized dependent steps in this request. Do not hand the user a list of skills to invoke or ask them to approve each ordinary step. Before an external write, apply the specialist's target, duplicate, field, permission, and read-back rules.
4. If a decision is needed, ask the smallest question that unlocks the next action. Bundle related missing values when a single answer can provide them. State the observed options, the recommended option if any, and its consequence. Leave dependent work pending until the user answers; continue independent work when useful. An answer resumes this stage, not a new workflow.
   Use the host's short input tool when available; otherwise ask in the conversation. A choice is not submitted merely because an option was preselected or time passed.
5. After a write, read back the target and relevant relation. If the response is ambiguous, record `pending_verification` in the Zoho audit ledger and reconcile before another create or update.

## Recovery cases

| Evidence | Next interactive move |
|---|---|
| No verified role or current-user ID | Continue connection diagnostics only; ask for the missing role/profile information before item output or writes. Verify exact ID against Zoho. |
| Several eligible sprint targets | Finish duplicate and date checks, then ask the user to choose among the eligible targets with their consequences. |
| `unknown_coverage` or likely duplicate | Report the exact unread scope or overlap and resolve it. Do not create while the duplicate check is uncertain. |
| Unsupported native field or MCP write | Keep that write pending and identify the missing operation. Do not put field values in a description and call the field complete. |
| MCP-only request and long description returns `414` | Keep the description update pending; do not switch to a direct API or truncate the text. Continue unrelated work if useful. |
| Timed-out or ambiguous create | Inspect the ledger and later live state; do not blindly retry. |
| User correction or changed source | Preserve verified work, update the decision and checkpoint, and re-evaluate the affected stage. |

## Checkpoint and resume

For multi-turn work with a resolved local project folder, maintain `.zoho-sprints/WORKFLOW_STATUS.md` using [the template](../assets/workflow-status.template.md). Write it after a meaningful transition, a pending decision/write, or a handoff. Replace the workflow-owned summary with current facts while preserving any clearly marked manual notes. Keep one checkpoint per project; never put project A's data in project B's folder. Keep it private or deliberately sanitize it before sharing. If there is no resolved local project folder, include the same compact state in the reply instead of writing into an unrelated repository.

On resume, compare the checkpoint's project identity, source references, pending action IDs, and last verified time with current Zoho and local state. Revalidate only evidence needed for the next action; do not rerun every earlier stage. Treat a pending write as a recovery task, not as a failed write to replay. Do not store tokens, private MCP URLs, customer secrets, full code diffs, or another Developer's restricted item details in the checkpoint.

## Reply shape

For an in-progress multi-stage result, keep the user-facing update compact:

> **المشروع والهدف:** …
> **المرحلة الحالية:** … — لأن …
> **تم التحقق:** …
> **المعلّق:** …
> **الخطوة التالية:** فعل محدد باستخدام المهارة المناسبة؛ الشرط: …

When a decision is required, ask it directly after the evidence and stop the dependent action. When the requested outcome is verified, report completion and omit a forced next stage.
