# Task Template — Arabic / English

Use for a Zoho Sprints Task or Bug under a verified parent Story. Keep the description structured and multi-line; never send one blob.

## English description

```markdown
## Goal
<the single outcome this Task delivers, linked to the parent criterion>

## Scope
- <what is included>
- <what is explicitly excluded>

## Acceptance Criteria
1. <observable, testable result>
2. <observable, testable result>
3. <failure, empty or permission case when relevant>

## Test Expectation
- <unit/integration/manual check and the expected observation>

## Dependencies
- <parent Story, blocking Task, environment, provider or decision>

## Evidence Expected
- <commit, test name and result, screenshot, log or demo step>
```

## Bug addition

```markdown
## Environment
<build, browser/device, tenant, date>

## Steps to Reproduce
1. ...
2. ...

## Expected
<...>

## Actual
<...>

## Severity and Impact
<...>
```

## Arabic and English name fields

```text
Arabic name, if required by this project's layout: <اسم عربي قصير>
English name, if required by this project's layout: <short English name>
```

For World Cup / Sports Activities, verify `UDF_CHAR3` and `UDF_CHAR4` against the live layout before using them. Other projects may use different fields.

## Zoho field mapping

| Content | Zoho field |
|---|---|
| Title | live item title field |
| Arabic short name | verified project field, when required |
| English short name | verified project field, when required |
| Structured description | `description` |
| Parent | verified Story ID |
| Sprint | parent's sprint or the authorized target |
| Type | live Task or Bug item type ID |
| Priority | live priority ID + one-sentence rationale |
| Assignee | verified owner under this project's team rules |
| Points | target project's verified Task effort convention |

## Done check

- [ ] Parent Story verified and assigned appropriately for the role.
- [ ] Duplicate search covered Backlog and all relevant sprints and children.
- [ ] Every acceptance criterion is observable.
- [ ] Test expectation names the check and the expected result.
- [ ] Assignee resolved from the live project team, not guessed.
- [ ] Description preserves any prior text and uses the exact separator.
- [ ] Child and parent read back after the write.
