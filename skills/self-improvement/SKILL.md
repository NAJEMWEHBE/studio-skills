---
name: self-improvement
description: Lesson log for repeated work - drafts lessons for the user to approve and promotes recurring ones into the domain's rules. Use in a project with a .learnings/ folder when the user corrects Claude, a tool or command fails, an assumption proves wrong, the user asks for something Claude can't do, at the start of work in that domain, or when the user asks to start, review, promote or archive lessons.
---

# self-improvement

Every correction is a lesson, and a lesson that keeps recurring becomes a rule. You draft lessons, the user approves each one, and the approved lessons guide the next session in the same domain. A domain is one area of work, named like a skill folder: `live-streaming`, `marketing`, `video-editing`.

## The lessons root

Lessons live with the user, outside any installed skill: a plugin update replaces the skill's folder, and claude.ai keeps a read-only copy.

- **Claude Code:** `.learnings/` at the project root. Each domain has a folder, `.learnings/<domain>/`, holding four files; lessons that apply to every domain go in `.learnings/universal/`. When the user wants one lesson log across all their projects, use `${CLAUDE_PLUGIN_DATA}/learnings/` (set when this skill runs as a plugin) with the same layout.
- **claude.ai** (no write access): the four files sit in the Project's knowledge. After each accepted change, print the whole updated file for the user to save over the old one.

| File | Holds |
|---|---|
| `LEARNINGS.md` | Corrections, knowledge gaps, best practices |
| `ERRORS.md` | Command, tool or API failures, with reproduction steps |
| `FEATURE_REQUESTS.md` | Capabilities the user wanted that you couldn't deliver |
| `RULES.md` | Promoted rules, one line each, with the lesson they came from |

A lesson goes in one file only, the one for its main signal; link related entries with `See Also`. A lesson for several domains lives once, in its main domain's folder, with every domain listed in `Area`.

**Starting a domain:** when the user asks, copy the four files from this skill's `templates/` folder into `.learnings/<domain>/`, dropping `.template` from each name and putting the domain name in each heading, and make sure the project's `.gitignore` has the line `**/.learnings/private/`.

## The loop

### PREP: before substantive work in a domain

Read the domain's four files, `.learnings/universal/`, and every entry in other domains' files whose `Area` lists this domain. Done when you have told the user in one line which rules and which `active` high or critical lessons bear on today's task, by ID, or that none do. Propose archiving any `active` lesson that has clearly gone stale (`references/lesson-lifecycle.md`).

### DO: during the work

Watch for the signals:

- the user corrects you, or edits your output (the diff is the lesson; `Source: user_feedback`);
- a tool, command or API fails unexpectedly;
- an assumption proves wrong;
- the user asks for something you can't do;
- a better approach turns up for a recurring task.

Each time one fires, add a one-line note to a session log in your working notes: what happened and what was right. Full drafts wait for REFLECT.

When you are about to do something a lesson or rule warns against, stop and name it: *"LRN-20260101-003 warns against [the action]. Should I do something different?"*

### REFLECT: at the end of the session or a natural break

For each note in the session log:

1. Look up its Pattern-Key (`references/pattern-key-guide.md`) in the domain's files.
   - **New key:** draft a new entry in the lesson format (`references/lesson-format.md`), with `Status: active` and `Recurrence-Count: 1`.
   - **Existing key:** draft the change to that entry instead: `Recurrence-Count` up by one, `Last-Seen` today.
   - **Contradicts a rule:** say so and follow "Conflict and demotion" in `references/lesson-lifecycle.md`.
2. Check the promotion triggers in `references/lesson-lifecycle.md`. When one holds, add the promotion proposal to the same draft.
3. Show the drafts and ask accept / edit / reject for each.
4. Write what the user accepted, with their edits.

A note not worth a lesson is dropped; zero lessons is a fine result. Done when every note has been proposed or dropped, and every accepted draft is written (in claude.ai: printed in full).

When the user asks to **review** lessons, list the `active` ones by priority with their IDs. To **promote** or **archive**, follow `references/lesson-lifecycle.md`.

## The approval gate

A new lesson, a change to an existing entry, a promotion, an archival: each reaches a file only after the user replies accept or edit to a draft that shows it. Two moments tempt you past the gate. When the point was already agreed in chat, the exact wording still needs a yes. When the session is ending, propose the drafts as the last thing you do.

## Placeholders

Write placeholders for every client, person, address, hostname and port in a lesson: `[CLIENT]`, `[CONTACT]`, `[SERVER_IP]`, `[HOSTNAME]`. Real values go only in `.learnings/private/<name>.local.md`, which git ignores. Credentials stay out of every lesson file, private ones included; write `[CREDENTIAL]`. When you can't tell whether a detail identifies someone, ask before drafting.

## Example REFLECT

```
Claude: Before we wrap, two drafts:

1. Change to an existing lesson:
   LRN-20260115-001 live-streaming.bitrate.cap, Recurrence-Count 2 -> 3, Last-Seen 2026-02-03.
   That makes it eligible for promotion. Add to RULES.md:
   "- Set OBS to 3500 kbps CBR for streams through the primary relay. (LRN-20260115-001)"
   Accept / edit / reject?

2. New ERRORS entry:
   ## [ERR-20260203-001] live-streaming.obs.reconnect-limit
   **Priority**: medium
   **Status**: active
   ### Summary
   OBS stopped reconnecting before the relay came back from a restart.
   [rest of the draft]
   Accept / edit / reject?

User: Accept 1. Reject 2, the relay restart was planned maintenance, a one-off.

Claude: Updated LRN-20260115-001 and added the rule to RULES.md. Dropped 2.
```
