# Lesson lifecycle

What happens to a lesson after it is logged: promotion to a rule, extraction to a workflow skill, demotion when a rule stops holding, and archival. Every change here is a draft the user accepts or edits first, through the same gate as a new lesson.

Paths below are relative to the domain folder in the lessons root (`.learnings/<domain>/` in Claude Code; the Project's knowledge files in claude.ai).

## Promotion triggers

A LEARNINGS entry is **eligible** for promotion when any one of these holds:

1. `Recurrence-Count` is 3 or more.
2. `Priority` is `high` or `critical`, even on first occurrence.
3. It applies to more than one workflow in the domain (the user confirms which).

Check the triggers in REFLECT, every time an entry is drafted or its count goes up. When one holds, put the promotion proposal in the same draft: *"Bump LRN-20260115-001 to Recurrence 3, which makes it eligible: promote it to RULES.md as '...'? Accept / edit / reject."* The user can decline; the entry then stays `active` and is proposed again only when its count rises.

## Promote or extract

| Outcome | When | What happens |
|---|---|---|
| **Promote** | The lesson fits in one or two sentences | Add it to `RULES.md` in the rule format (`lesson-format.md`). Set the entry to `Status: promoted` with `Promoted-To: RULES.md`. |
| **Extract** | The lesson runs past about 200 words, or is a multi-step workflow | Write it as its own skill. Claude Code: `.claude/skills/<name>/SKILL.md` in the project. claude.ai: print the `SKILL.md` for the user to zip and upload as a skill. Set the entry to `Status: promoted` with `Promoted-To: <skill name>`, and add a one-line pointer to it in `RULES.md`. |

The entry stays in its file as history either way. `RULES.md` belongs to the user: where it differs from a shipped domain skill, follow `RULES.md`. A user who maintains their own fork can copy a rule into that fork's domain `SKILL.md` by hand.

## Conflict and demotion

When a new note contradicts a rule in `RULES.md` or an extracted skill:

1. Tell the user: *"This contradicts LRN-XXX, promoted to RULES.md. Has the situation changed?"*
2. The situation changed: propose demotion. Remove the rule (or the extracted skill's pointer in `RULES.md`, asking whether to delete the skill too), set the original entry to `Status: archived`, and draft a new lesson saying why it was demoted, so a later session does not promote it again.
3. The new note is wrong or a one-off: drop it. The rule stands.

## Archival

Propose archiving an `active` entry when:

- the tool, service or workflow it names no longer exists;
- a newer lesson supersedes it (the newer one gets `See Also` to it);
- the situation changed (new vendor, new hardware, new policy) and the user confirms it no longer holds;
- `Last-Seen` is more than 12 months old and the user agrees it no longer matters.

To archive: set `Status: archived` and leave the entry in place. A `promoted` entry is demoted first (above).
