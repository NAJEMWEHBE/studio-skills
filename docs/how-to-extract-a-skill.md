# Extracting a lesson into a skill

When a lesson grows into a whole workflow, it outgrows a line in `RULES.md`. The `self-improvement` skill then proposes extracting it into a skill of its own; the rules for that live in `skills/self-improvement/references/lesson-lifecycle.md`. This page is the human side.

## When

Extract when the lesson runs past about 200 words, is a multi-step workflow, or has its own checklist or decision tree. If you can say it in two or three sentences, promote it to `RULES.md` instead: too many tiny skills are hard to keep track of.

## Where it goes

- **Claude Code:** `.claude/skills/<name>/SKILL.md` in the project, where Claude Code loads it automatically. To share it, copy it into your fork's `skills/` folder.
- **claude.ai:** Claude prints the `SKILL.md`. Save it in a folder named after the skill, zip the folder, and upload it under Settings → Capabilities → Skills (labels not confirmed; see `how-to-use-in-claude-ai.md`).

Name it like a domain: lowercase and hyphenated, such as `obs-fallback-procedure`.

## What the skill needs

```yaml
---
name: obs-fallback-procedure
description: Switching a live OBS stream to the fallback relay. Use when the primary relay fails mid-stream or before a planned relay change.
---
```

The body is the workflow from the lesson, as numbered steps with a clear done-state.

## What changes in the lesson files

Claude proposes, and writes after you accept:

- the original entry gets `Status: promoted` and `Promoted-To: obs-fallback-procedure`;
- `RULES.md` gets a one-line pointer: *"For a relay failure mid-stream, use the `obs-fallback-procedure` skill. (LRN-20260201-007)"*

## Undoing it

If the skill turns out unused or wrong, ask Claude to demote it: the pointer leaves `RULES.md`, the entry is archived, and a new lesson records why, so it isn't extracted again.
