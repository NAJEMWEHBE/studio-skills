# studio-skills

![Status: experimental](https://img.shields.io/badge/status-experimental-orange)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

A self-improving collection of skills for **any kind of work you do more than once**. The learning engine is generic — the same engine drives every skill, regardless of subject. Marketing campaigns, video editing, filming, live streaming, problem-solving, building things — anything that has its own rules and recurring lessons.

Built for solo operators, small teams, and anyone who uses [claude.ai](https://claude.ai) as their working tool. No CLI, no terminal, no developer setup required.

## Why this exists

Every project teaches you something. Every mistake reveals a rule you should have followed. Most of those lessons get forgotten the next day — buried in chat history, scattered across notebooks, lost when you switch tools.

This repository captures lessons in real time, stores them next to the work they apply to, and turns the recurring ones into permanent rules that future-you (and future-Claude) follow automatically.

The loop:

1. **Learn** — when something goes wrong (or right) during a session, write it down.
2. **Adapt** — once a lesson keeps showing up, promote it from the temporary log into the main skill so you never have to learn it twice.
3. **Evolve** — as your work changes, the rules change with it. The skill never stops growing.

## How the system is structured

Two layers:

- **The meta-skill (`self-improvement`)** is the engine. It's generic — it doesn't care what subject you're working on. It only knows how to capture lessons, store them, and promote the recurring ones into permanent rules.
- **Domain skills** are the playbooks for specific kinds of work. Each one is its own folder under `skills/`, with its own `SKILL.md` and its own `.learnings/` files. The meta-skill drives all of them.

You can have as many domain skills as you want. The meta-skill works for all of them at once.

## Quickstart (claude.ai desktop app)

This is for non-developers using [claude.ai](https://claude.ai) — not Claude Code or the API.

1. **Create a Project** in claude.ai for the domain you want to work on.
2. **Upload these files** as Project knowledge:
   - `skills/self-improvement/SKILL.md` — the meta-skill that runs the learning loop
   - `skills/<your-domain>/SKILL.md` — the playbook for whatever you're working on
   - The `.learnings/` folder for that domain
   - Any `references/` and `examples/` files for that domain
3. **Set the Project's custom instructions** to invoke the self-improvement skill at the start of every session.
4. **Work normally.** When Claude proposes a new lesson, you accept, edit, or reject it.
5. **At session end**, copy the updated `.learnings/` files out of Claude and commit them back to GitHub via the web UI.

Full step-by-step guide: [`docs/how-to-use-in-claude-ai.md`](docs/how-to-use-in-claude-ai.md)

## Available skills

| Skill | Purpose |
|---|---|
| `self-improvement` | **Meta-skill.** Runs the learn / adapt / evolve loop. Domain-agnostic — works for anything. |
| `live-streaming` | **First concrete example.** Live streaming operations using bonded uplinks and SRT/RTMP relay servers. |

## What kind of skills can you add?

Anything you do more than once. Some examples:

- **Marketing** — campaign planning, audience research, brand voice rules, content review
- **Video editing** — ingest workflow, color grading rules, export presets, timeline conventions
- **Filming** — pre-production checklists, shot lists, on-set protocols, gear setups
- **Problem-solving** — debugging workflows, troubleshooting decision trees, diagnostic checklists
- **Building** — recurring setup procedures, configuration patterns, deployment steps
- **Writing** — drafting workflows, review checklists, style rules
- **Anything else** — if you've ever thought *"I keep making the same mistake here,"* it's a candidate

Each new domain becomes its own folder under `skills/`. Use [`docs/how-to-add-a-new-domain.md`](docs/how-to-add-a-new-domain.md) for the walkthrough.

## Repository structure

```
studio-skills/
├── README.md                    (you are here)
├── LICENSE                      (MIT)
├── CONTRIBUTING.md              (how to add skills, submit lessons)
├── .gitignore                   (blocks private/secret files)
├── docs/                        (usage guides for claude.ai users)
└── skills/
    ├── self-improvement/        (the engine — domain-agnostic)
    └── live-streaming/          (first example domain)
```

## Adding your own domain

This system is designed to be forked or extended. If you want a skill for your own work — anything from photography to podcasts to plumbing — see [`docs/how-to-add-a-new-domain.md`](docs/how-to-add-a-new-domain.md).

## License

MIT — see [`LICENSE`](LICENSE).

## Status

**Experimental.** This is v1. The patterns work, but the documentation is still settling. Issues and pull requests welcome.
