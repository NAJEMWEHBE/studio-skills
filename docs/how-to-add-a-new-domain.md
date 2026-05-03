# How to add a new domain skill

A "domain skill" is a folder under `skills/` that captures the rules for a specific area of work. The first one is `live-streaming`. To add another (e.g. `marketing`, `video-editing`, `filming`), follow this guide.

## Prerequisites

- The repository is set up (you have `studio-skills/` on your machine and on GitHub).
- The `self-improvement` skill is built and you understand how it works (see `skills/self-improvement/SKILL.md`).
- You have a clear idea of what the new domain is and a few real rules you want to seed it with.

## Step-by-step

### Step 1 — Pick a domain name

The folder name should be:

- Lowercase
- Hyphenated (no spaces, no underscores)
- Descriptive (someone reading the folder name should know what's in it)

Good examples: `marketing`, `video-editing`, `filming`, `wedding-photography`, `podcast-production`.

Bad examples: `stuff`, `misc`, `MarketingThings`, `marketing_v2`.

### Step 2 — Copy the live-streaming folder as a template

In your local copy of `studio-skills/`:

1. Make a copy of `skills/live-streaming/`.
2. Rename the copy to `skills/<your-new-domain>/`.
3. Inside the copy, delete:
   - The 6 seeded entries in `.learnings/LEARNINGS.md` (replace with empty starter).
   - The contents of `examples/` (those are live-streaming-specific).
   - The contents of `references/` (those are live-streaming-specific).
4. Empty the `.learnings/` files using the templates from `skills/self-improvement/templates/`. Or copy the templates and rename them.

### Step 3 — Update the SKILL.md frontmatter

Open `skills/<your-new-domain>/SKILL.md` and update the frontmatter:

```yaml
---
name: <your-new-domain>
description: <one or two sentences describing what this skill covers and when to use it>
---
```

Description guidance:

- Third person, not first
- Should answer "what does this skill do" AND "when should I invoke it"
- Under 1024 characters total

### Step 4 — Write the SKILL.md body

Use the live-streaming SKILL.md as your structural template. The sections that work for almost any domain:

- **When to invoke this skill** — the trigger conditions
- **Hardware/tools/inputs** — what's involved (skip if not relevant)
- **Pre-task checklist** — things to verify before starting
- **Real-time monitoring rules** — what to watch while working (skip if N/A)
- **Failure-mode quick reference** — common problems and how to handle them
- **Where the rules live** — pointer to `.learnings/`
- **How to add a new lesson** — pointer to `self-improvement` skill

Keep it under 500 lines. Aim for under 300.

### Step 5 — Seed initial lessons (optional but recommended)

If you have 2-5 rules already in your head for this domain, seed them in `.learnings/LEARNINGS.md` using the format from `skills/self-improvement/references/lesson-format.md`. Use today's date for `Logged`, set `Status` to `active`, and pick stable Pattern-Keys.

If you don't have any rules yet, leave `.learnings/` empty. Lessons will accumulate as you use the skill.

### Step 6 — Update the root README

Open `README.md` and add your new domain to the **Available skills** table:

```
| `<your-new-domain>` | <one-sentence purpose> |
```

### Step 7 — Run a few test sessions

Before committing the new skill to GitHub:

1. Create a new claude.ai Project for the domain (see `how-to-use-in-claude-ai.md`).
2. Upload the new skill files.
3. Run a few real sessions in the new domain.
4. Watch how the system behaves — Claude should reference lessons, propose new ones at end, and respect the user-approval gate.
5. Iterate on the SKILL.md if anything is unclear or missing.

### Step 8 — Commit to GitHub

Once the skill is working in practice:

1. Open the new domain folder in GitHub web UI.
2. Upload each file (`SKILL.md`, `.learnings/*.md`, `references/*.md`, `examples/*.md`).
3. Commit with a clear message: *"Add <domain> skill"*.

## Common pitfalls

- **Copying live-streaming content into the new domain.** Delete first, write fresh second. Otherwise you'll end up with bitrate rules in your marketing skill.
- **Skipping the SKILL.md and going straight to lessons.** The SKILL.md is what tells Claude when to invoke the skill at all. Without it, your lessons are just orphaned text.
- **Pattern-Key drift.** Once you start using a domain prefix in Pattern-Keys, you live with it. Pick carefully on day one (see `skills/self-improvement/references/pattern-key-guide.md`).
- **Forgetting to update README.md.** New domains that aren't listed in the README are invisible to anyone (including Claude) browsing the repo.

## When in doubt

Ask the `self-improvement` skill itself. Open a claude.ai Project with the meta-skill loaded and ask: *"I want to add a domain skill for X. What questions should I think through first?"*
