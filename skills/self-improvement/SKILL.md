---
name: self-improvement
description: Captures lessons during a session and promotes recurring ones into persistent rules. Use when the user corrects Claude, a tool fails, an assumption was wrong, a capability is missing, or a better approach is found — and at session start to review existing lessons in the domain.
---

# self-improvement

The engine that captures lessons during a session and promotes recurring ones into permanent rules. Domain-agnostic — works the same way whether the work is live streaming, marketing, video editing, filming, problem-solving, building, or anything else.

## Core principle

**Every correction is a lesson. Every recurring lesson becomes a rule.**

Claude captures lessons in real time. The user is the quality filter — nothing gets logged without their approval. When a lesson keeps showing up, it graduates from a temporary log into a permanent rule baked into the domain skill.

## When to use this skill

Use whenever any of these signals appear during a session:

1. The user corrects Claude (e.g., *"no, that's wrong"*, *"actually do it this way"*).
2. A tool, command, or API fails unexpectedly.
3. The user requests a capability Claude couldn't deliver.
4. Claude realizes its assumption was wrong.
5. A better approach is discovered for a recurring task.

Also use **before** starting any major task in a domain — review the existing lessons in that domain's `.learnings/` files first.

## The three-phase loop

Every session in a domain follows this loop.

### PREP — at session start

Before doing anything substantive, scan the active domain's lesson files:

- `skills/<domain>/.learnings/LEARNINGS.md`
- `skills/<domain>/.learnings/ERRORS.md`
- `skills/<domain>/.learnings/FEATURE_REQUESTS.md`

Note any lessons with `Status: active` and high or critical priority. These are the guardrails for this session.

### DO — during the session

Work on whatever the task is. As you work, watch for any of the five trigger signals above.

When you're about to repeat a logged mistake, **stop and flag it in real time**:

> *"There's an existing lesson here — `LRN-20260101-003` warns against [the action you're about to take]. Should I do something different?"*

This is the most valuable behavior in the system: catching the mistake **before** it happens, by referencing the lesson library you scanned in PREP.

**Keep a running session log.** As trigger signals fire during DO, jot a one-line note in your working memory or a scratchpad — what happened, what was wrong, what was right. Don't draft full lesson entries yet (that's REFLECT). The log just ensures REFLECT has accurate material instead of relying on memory of a long session.

### REFLECT — at session end (or any natural breakpoint)

Propose 0 or more new lessons based on what happened. **Never log silently.** For each proposed lesson:

1. Show the user a draft entry in the lesson format below.
2. Wait for accept / edit / reject.
3. Only after explicit accept (possibly with edits) do you write it to the appropriate file.

If nothing happened worth logging, propose zero lessons. Quality over quantity.

## The three signal files

Strict separation. Same lesson does not go in two files.

| File | What goes in it | Example trigger |
|---|---|---|
| `LEARNINGS.md` | Corrections, knowledge gaps, best practices, insights | User says *"actually it's cheaper to..."* |
| `ERRORS.md` | Command, tool, or API failures with reproduction context | OBS connection drops at 7000 kbps |
| `FEATURE_REQUESTS.md` | Capabilities the user wanted but Claude couldn't deliver | *"Can you sync OBS scenes from a CSV?"* — Claude can't yet |

If a lesson could plausibly fit in two files, ask: *what's the primary signal?* Pick one. Cross-reference with `See Also` in the metadata.

## Cross-domain lessons

Some lessons apply to more than one domain (e.g., a sanitization rule that's true for both live-streaming and marketing). Don't duplicate the entry across domain folders.

- **Pick the most-relevant domain as the home.** Store the entry once, in `skills/<primary>/.learnings/`.
- **Tag all applicable domains in `Area`.** Comma-separated: `Area: live-streaming, marketing`.
- During PREP for any tagged domain, search across `.learnings/` files for entries whose `Area` includes the current domain — not just the current domain's folder.
- **If a lesson is truly universal** (applies to the system itself or every domain), home it in `skills/self-improvement/.learnings/` instead.

## Lesson entry format

All entries — in all three files — share the same structure: a heading `## [PREFIX-YYYYMMDD-XXX] category`, then `Logged` / `Priority` / `Status` / `Area` fields, then `Summary` / `Details` / `Suggested Action` sections, then a `Metadata` block (`Source`, `Pattern-Key`, `Recurrence-Count`, `First-Seen`, `Last-Seen`, `See Also`).

ID prefixes: `LRN-` for LEARNINGS, `ERR-` for ERRORS, `FR-` for FEATURE_REQUESTS.

**ID collisions on merge.** If two sessions independently produce the same `PREFIX-YYYYMMDD-XXX` ID and the files later get merged, bump the second entry to the next free sequence number and update any `See Also` references that pointed to it.

Full schema, allowed `Status` values per file, and worked examples: `references/lesson-format.md`.

## Pattern-Key + recurrence rule

The `Pattern-Key` is a stable identifier that groups recurring lessons. Format: `<domain>.<topic>.<aspect>` (e.g. `streaming.bitrate.cap`, `marketing.email.subject-line`).

**Rule:** When a new lesson shares a Pattern-Key with an existing one, *do not create a duplicate*. Instead:

- Increment `Recurrence-Count` on the existing entry.
- Update `Last-Seen` to today.
- If `Recurrence-Count` hits 3, auto-flag the entry for promotion review.

See `references/pattern-key-guide.md` for naming conventions.

## Promotion criteria (eager)

A lesson graduates from `.learnings/` into the domain skill's main `SKILL.md` (or its own sub-skill) when **any one** of these is true:

- `Recurrence-Count >= 3`, OR
- The lesson **prevents a critical or high-priority mistake**, OR
- The lesson **applies across multiple workflows** in the domain.

When the trigger fires, **propose** promotion to the user. The user makes the final call.

When promoting:

1. Add the rule to the domain's `SKILL.md` in the appropriate section.
2. Mark the lesson entry: `Status: promoted` and add `Promoted-To: <file path>`.
3. Leave the entry in `.learnings/` for historical context — don't delete it.

Decision tree: see `references/promotion-criteria.md`.

## Conflict resolution

When a newly proposed lesson contradicts an existing **promoted** rule (in the domain's `SKILL.md` or a sub-skill), don't silently log the new lesson. Surface the conflict.

1. Tell the user: *"This contradicts `LRN-XXX`, which was promoted into `<file>`. Has the situation changed?"*
2. If the old rule no longer applies → propose **demotion**: remove the rule from the domain skill, mark the original `.learnings/` entry `Status: archived`, and **log a new lesson explaining *why* it was demoted** so a future session doesn't re-promote it.
3. If the new lesson is wrong or context-specific → reject it. The promoted rule stands.

Full demotion process: `references/promotion-criteria.md`.

## Archival

Lessons don't expire automatically — but stale entries clutter the library. During PREP, if you spot an `active` lesson whose context no longer applies, propose archival.

Triggers for archival:

- The tool, service, or workflow the lesson references no longer exists.
- A newer lesson supersedes it (in which case the new lesson should `See Also` the old one).
- The underlying situation has changed materially (vendor swap, hardware change, policy change), and the user confirms the rule no longer holds.
- `Last-Seen` is >12 months old AND the user, when prompted, agrees the lesson is no longer relevant.

To archive: set `Status: archived`. Leave the entry in place — it's history, don't delete it. If the lesson is `promoted` (the rule lives in a domain `SKILL.md`), archival also requires demotion — see Conflict resolution above.

## Skill extraction trigger

When a single lesson grows past ~200 words OR documents a complete multi-step workflow, *extract it into its own SKILL.md inside the same domain*. Example:

- A lesson about *"OBS multi-bitrate fallback procedure"* with 8 steps → extract to `skills/live-streaming/sub-skills/obs-fallback-procedure/SKILL.md`.
- The original `.learnings/` entry stays, with `Status: promoted` and `Promoted-To: <path>`.

## Edit-feedback loop

When the user edits Claude's output (a draft, a configuration, a plan), treat the diff as a lesson source. The edits reveal preferences and rules Claude didn't know.

- Compare what Claude produced vs. what the user changed it to.
- Propose a `best_practice` lesson capturing **what changed** and **why** (ask the user if the why isn't obvious).
- Use `Source: user_feedback` in the metadata.

## Hard safety rules — never violate

These are non-negotiable. Violating them defeats the entire system.

- **NEVER log secrets** — passwords, API keys, tokens, credentials of any kind.
- **NEVER log specifics that identify clients, servers, or people** — IP addresses, hostnames, real client names, real project codenames, phone numbers, personal email addresses.
- **Use placeholders** instead: `[CLIENT]`, `[CREDENTIAL]`, `[SERVER_IP]`, `[CONTACT]`.
- **For private working notes that need real values**, write them only to `.learnings/private/<file>.local.md`. The repo-wide `.gitignore` blocks this folder from ever being committed.

If you're about to log something and you're not sure if it's safe, **stop and ask**.

## User approval gate (the most important rule)

**Claude proposes. The user disposes.**

Every lesson must be:

1. Drafted by Claude in the lesson format.
2. Shown to the user.
3. Accepted, edited, or rejected by the user.
4. Only then written to the file.

**Nothing gets logged silently. Ever. No exceptions.**

### Anti-rationalization table

When you (future-Claude) feel tempted to skip the approval gate, here are the excuses you'll use and why each one is wrong:

| Excuse | Reality |
|---|---|
| *"This is obvious, no need to ask"* | Obvious to you ≠ obvious to the user. Ask. |
| *"User is busy, I'll log it now and they can review later"* | "Review later" never happens. The lesson sneaks in and quietly drifts the system. Ask now. |
| *"I'm just editing my own previous lesson, that's not really new logging"* | Same rule applies. Edits change the meaning of lessons that downstream sessions will read. Ask. |
| *"The session is ending, no time to ask"* | Then propose it as the *last thing* before the session ends. Don't skip the gate to save 30 seconds. |
| *"The lesson is small / minor / trivial"* | Small undisciplined logs compound into a noisy lesson library. Ask. |
| *"We've already discussed this in chat, the user already implicitly agreed"* | Implicit ≠ explicit. The lesson's exact wording matters for future sessions. Ask. |

If you find yourself thinking any of these things, **stop, draft the lesson properly, and ask.**

## Quick reference

| When this happens | Do this |
|---|---|
| Session start in a domain | Read `skills/<domain>/.learnings/*.md`, note active high-priority lessons |
| About to repeat a logged mistake | Stop, reference the LRN-ID, ask user how to proceed |
| User corrects you | Propose a LEARNINGS entry, get approval, log it |
| A command/tool fails unexpectedly | Propose an ERRORS entry, get approval, log it |
| User asks for a capability you can't deliver | Propose a FEATURE_REQUESTS entry, get approval, log it |
| Recurrence-Count hits 3 on an entry | Auto-flag for promotion review |
| Promotion approved | Add rule to domain SKILL.md, mark entry `promoted` |
| New lesson contradicts a promoted rule | Surface the conflict, propose demotion, log the *why* |
| Lesson applies to multiple domains | Store once under primary; tag all in `Area:`; search across folders during PREP |
| Active lesson is stale or no longer applies | Propose archival; if promoted, also demote |
| Lesson grows beyond ~200 words | Extract to its own sub-skill |
| About to log without asking | Stop. Read the anti-rationalization table above. Ask. |

## What a typical REFLECT looks like

```
[Claude]: "Before we wrap, I noticed two things worth logging:

1. LEARNINGS proposal:

   ## [LRN-20260115-001] streaming.bitrate.cap
   **Priority**: high
   **Status**: pending
   ### Summary
   The active relay caps reliable bitrate at 3500 kbps.
   [full draft]
   
   Accept / edit / reject?

2. ERRORS proposal:

   ## [ERR-20260115-002] obs.connection.timeout
   **Priority**: medium
   **Status**: pending
   ### Summary
   OBS connection dropped after 12 minutes at 6500 kbps.
   [full draft]
   
   Accept / edit / reject?"

[User]: "Accept #1. Reject #2 — that was a one-off network blip, not a real pattern."

[Claude]: "Logged #1 to LEARNINGS.md. Skipped #2."
```

## File map

```
skills/self-improvement/
├── SKILL.md                          (this file)
├── templates/
│   ├── LEARNINGS.template.md         (empty starter for new domains)
│   ├── ERRORS.template.md
│   └── FEATURE_REQUESTS.template.md
└── references/
    ├── lesson-format.md              (full format spec + 2 worked examples)
    ├── promotion-criteria.md         (decision tree for promotion / extraction)
    └── pattern-key-guide.md          (naming conventions)
```
