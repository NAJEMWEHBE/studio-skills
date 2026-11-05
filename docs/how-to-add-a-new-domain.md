# Adding a domain

A domain is one area of work with its own rules: `live-streaming`, `marketing`, `video-editing`. It has two parts:

- **Lessons**, which need nothing but a folder: ask Claude to *"start a lesson log for marketing"* and the `self-improvement` skill creates `.learnings/marketing/` in your project. Many domains need only this.
- **A domain skill** (optional): a playbook Claude follows for that work, like `skills/live-streaming/`. Write one when the domain has a checklist or reference material worth loading every time.

## 1. Pick the name

Lowercase, hyphenated, descriptive: `marketing`, `video-editing`, `wedding-photography`. Not `stuff`, `MarketingThings` or `marketing_v2`. The same name is the lesson folder, the skill folder, and the first part of every Pattern-Key, so pick it once.

## 2. Write the domain skill (optional)

In your fork, create `skills/<name>/SKILL.md`. (Without a fork, Claude Code also loads skills from `.claude/skills/<name>/` in a project.)

```yaml
---
name: <name>
description: <What it is, in a few words>. Use when <branch>, <branch> or <branch>.
---
```

- `name` matches the folder.
- The description says what the skill is first, then one trigger per distinct case; it stays under 1024 characters, with no `<` or `>` in the final text.

For the body, `skills/live-streaming/SKILL.md` is a working pattern:

- a line pointing to the `self-improvement` skill's PREP for this domain, so measured values from the lessons override the skill's defaults;
- a checklist with a clear done-state;
- the rules that hold while working;
- a failure-mode table;
- longer material in `references/` and `examples/`, each named in the step that needs it.

Keep it short: under 150 lines where possible.

## 3. Start the lesson log

In the project where you do the work, ask Claude to start the lesson log for the domain. If you have rules in your head already, give them to Claude as lessons to draft; accept each one.

## 4. Test it

Run a few real sessions. Claude should list the relevant lessons at the start, draft lessons at the end, and write nothing you haven't accepted. If the skill doesn't fire when it should, sharpen its description's triggers. `evals/` has cases you can copy for the new skill.

## 5. List it

Add the skill to the **Skills** table in `README.md`. CI checks its frontmatter on every push.
