# How to extract a sub-skill

Sometimes a single lesson grows into a whole workflow that's too big to live as a paragraph in a domain `SKILL.md`. When that happens, *extract* it into its own sub-skill.

## When to extract

Extract a lesson into a sub-skill when **any** of these is true:

- The lesson has grown beyond ~200 words.
- The lesson documents a multi-step workflow with 5+ steps.
- The lesson has its own checklist, sub-rules, or decision tree.
- Multiple other lessons reference it as background.

If the lesson is shorter than that, just **promote** it as a paragraph or bullet inside the domain's `SKILL.md`. Don't extract small lessons — you'll end up with too many tiny files.

## How to extract

### Step 1 — Confirm the trigger

Re-read the lesson. If you can summarize it in 2-3 sentences without losing meaning, *don't extract* — promote as a paragraph instead. Extraction is for content that genuinely doesn't fit.

### Step 2 — Pick a sub-skill name

The sub-skill folder should sit under the domain's `sub-skills/` folder:

```
skills/<domain>/sub-skills/<sub-skill-name>/
```

Naming follows the same rules as a domain skill: lowercase, hyphenated, descriptive.

Example: an OBS multi-bitrate fallback procedure under live-streaming becomes:

```
skills/live-streaming/sub-skills/obs-fallback-procedure/SKILL.md
```

### Step 3 — Create the sub-skill folder and SKILL.md

Inside the new sub-skill folder, create a `SKILL.md` with frontmatter:

```yaml
---
name: <sub-skill-name>
description: <one-or-two-sentence description, third person, with "Use when..." trigger>
---
```

The body should be the workflow content from the original lesson, expanded with whatever context, examples, and sub-rules are needed.

### Step 4 — Update the parent skill's SKILL.md

Open the domain's `SKILL.md` (e.g. `skills/live-streaming/SKILL.md`) and add a reference to the new sub-skill in the appropriate section:

```
For OBS multi-bitrate fallback during a stream, see `sub-skills/obs-fallback-procedure/SKILL.md`.
```

### Step 5 — Mark the original lesson as promoted

Open the lesson in `.learnings/LEARNINGS.md` and:

1. Change `Status: active` to `Status: promoted`.
2. Add a new metadata field: `Promoted-To: skills/<domain>/sub-skills/<sub-skill-name>/SKILL.md`
3. Leave the lesson entry in `.learnings/` for historical context — don't delete it.

Example:

```
## [LRN-20260201-007] obs.fallback.multi-bitrate

**Logged**: 2026-02-01T15:00:00Z
**Priority**: high
**Status**: promoted
...

### Metadata
- Source: conversation
- Pattern-Key: obs.fallback.multi-bitrate
- Recurrence-Count: 4
- First-Seen: 2025-11-12
- Last-Seen: 2026-02-01
- Promoted-To: skills/live-streaming/sub-skills/obs-fallback-procedure/SKILL.md
- See Also: LRN-20260101-001, LRN-20260101-004
```

### Step 6 — Test it

Open a claude.ai Project with the domain skill (and now its sub-skills) uploaded as Project knowledge. In a real session, verify Claude:

- Knows the parent SKILL.md mentions the sub-skill.
- Reads the sub-skill when the trigger condition fires.
- References the sub-skill by file path when applying its rules.

If Claude doesn't naturally reach for the sub-skill, the description in the sub-skill's frontmatter is too vague. Tighten the trigger conditions.

## What NOT to do

- **Don't extract every multi-step lesson.** Some workflows are best kept compact in the parent SKILL.md.
- **Don't leave the original lesson without `Status: promoted`.** It will keep getting matched on Pattern-Key and the system will think the rule is still un-promoted.
- **Don't forget to reference the sub-skill from the parent SKILL.md.** An orphaned sub-skill is one Claude won't find.
- **Don't extract a lesson into a sub-skill in someone else's domain.** Sub-skills live inside their domain's folder. If a workflow truly applies to multiple domains, it's a candidate for the meta-skill area, not a domain-specific sub-skill.

## When to undo an extraction

If a sub-skill turns out to be unused or wrong:

1. Move its useful content back into the parent SKILL.md (or delete it).
2. Update the original lesson's `Status` from `promoted` back to `active`, or to `archived` if the rule turned out to be wrong.
3. Log a new lesson explaining *why* it was demoted — that's itself a learning.

This rarely happens, but it's allowed.
