# Promotion criteria

When does a lesson graduate from `.learnings/` into a permanent rule?

## The rule (eager promotion)

A lesson is **eligible** for promotion when **any one** of these is true:

1. `Recurrence-Count >= 3` — the same Pattern-Key has fired three or more times.
2. The lesson **prevents a critical or high-priority mistake** — even on first occurrence.
3. The lesson **applies across multiple workflows** in the same domain.

If any one trigger is met, propose promotion to the user. The user makes the final call.

## Decision flow

1. A new lesson is logged.
2. Check whether this Pattern-Key already exists in the file:
   - **Yes** → increment `Recurrence-Count`, update `Last-Seen`, then check trigger conditions.
   - **No** → set `Recurrence-Count = 1`, then check trigger conditions.
3. Check trigger conditions (any ONE = eligible for promotion):
   - `Recurrence-Count >= 3`, OR
   - Priority is `critical` or `high`, OR
   - Lesson applies across multiple workflows in the domain.
4. If eligible → **propose promotion to the user**. The user decides.
5. If not eligible → stay in `.learnings/` for now.

## Promotion vs. extraction

Sometimes a lesson is too big to be a rule — it's a whole workflow. Two outcomes are possible:

| Outcome | When | What happens |
|---|---|---|
| **Promote** | Lesson is a one-or-two-sentence rule | Add a bullet/paragraph to the domain's `SKILL.md` in the appropriate section. Mark entry `Status: promoted`. |
| **Extract** | Lesson is >~200 words OR documents a multi-step workflow | Create a new sub-skill: `skills/<domain>/sub-skills/<name>/SKILL.md`. Move the workflow there. Mark entry `Status: promoted` with `Promoted-To: <path>`. |

## Demotion (rare but possible)

If a promoted rule turns out to be wrong or no longer applies:

1. Remove the rule from the domain `SKILL.md` (or the sub-skill).
2. Mark the original `.learnings/` entry `Status: archived`.
3. **Log a new lesson explaining *why* it was demoted** — that's itself a learning, and it prevents the rule from being re-promoted later.

## Anti-pattern: silent promotion

Promotion is **never silent**. The user must approve each promotion the same way they approve each lesson. The "auto-flag" only flags — it does not promote on its own. If you find yourself promoting without asking, stop. Re-read the user-approval-gate section in the main `SKILL.md`.
