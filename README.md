# studio-skills

![Status: experimental](https://img.shields.io/badge/status-experimental-orange)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

A lesson log for work you repeat. When you correct Claude, a command fails or an assumption proves wrong, Claude drafts a lesson; you accept, edit or reject it; and lessons that keep recurring become rules Claude reads before the next session in that area of work. It works for Claude Code and claude.ai, and ships with a live-streaming example domain.

## What it looks like

An illustrative exchange (not a recorded session), at the start and end of a session in the `live-streaming` domain:

```
Claude: Before we start: RULES.md says 3500 kbps CBR through the primary relay
        (LRN-20260115-001), and ERR-20260120-002 warns that OBS gives up
        reconnecting after about 5 minutes. Both bear on Friday's stream.

        ... the work ...

Claude: Before we wrap, one draft:
        ## [LRN-20260203-001] live-streaming.uplink.carrier-a-2g
        **Priority**: high
        **Status**: active
        ### Summary
        Carrier A's SIMs fall back to 2G at [VENUE]; disable them there before the show.
        [rest of the draft]
        Accept / edit / reject?

You:    Accept.
```

Nothing reaches a lesson file until you accept or edit the draft.

## Install

**Claude Code** (2.1.275 or later):

```
/plugin install studio-skills --marketplace NAJEMWEHBE/studio-skills
```

On older versions, run `/plugin marketplace add NAJEMWEHBE/studio-skills`, then `/plugin install studio-skills@studio-skills`.

Then, in a project, ask Claude to *"start a lesson log for live-streaming"* (or any domain). It creates `.learnings/live-streaming/` from the templates. The `self-improvement` skill only runs in projects that have a `.learnings/` folder, so other projects are untouched.

**claude.ai:** upload each skill as a zip, and keep the lesson files in a Project. Step by step: [`docs/how-to-use-in-claude-ai.md`](docs/how-to-use-in-claude-ai.md).

## Where lessons live

Lessons belong to you, not to the installed skill, which an update replaces:

- **Claude Code:** `.learnings/<domain>/` in your project, with `LEARNINGS.md`, `ERRORS.md`, `FEATURE_REQUESTS.md` and `RULES.md`. Real values that must not be shared (server URLs, venue notes) go in `.learnings/private/*.local.md`; add `**/.learnings/private/` to your `.gitignore`. Ask Claude for a log across all projects and it uses the plugin's data folder instead.
- **claude.ai:** the same four files in the Project's knowledge. Claude prints each updated file in full for you to save over the old one.

[`examples/.learnings/live-streaming/`](examples/.learnings/live-streaming/) shows the layout.

## Skills

| Skill | What it does |
|---|---|
| `self-improvement` | The engine: reads a domain's lessons before work (PREP), notes signals during it (DO), drafts lessons and promotions for your approval at the end (REFLECT). Works for any domain. |
| `live-streaming` | An example domain: OBS over a bonded cellular router to an SRT/RTMP relay, with a pre-show checklist, live rules and failure modes. |

Any work you repeat can be a domain: marketing campaigns, video editing, filming, podcast production, building and debugging. To add one: [`docs/how-to-add-a-new-domain.md`](docs/how-to-add-a-new-domain.md).

## Checks

- CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) checks each skill's frontmatter, that no file under `.learnings/private/` is tracked, local markdown links, that the skill zips build, and runs `claude plugin validate . --strict`.
- [`evals/`](evals/) holds `claude plugin eval` cases for both skills. They are not run in CI: each run uses plan usage. Run them from the repo root with `claude plugin eval . --scaffold --allow-tools Write Edit`: `--scaffold` lets the recurrence case create its starting lesson file, and the self-improvement cases need Write and Edit so they can show that nothing is written before you accept.

## License

MIT, see [`LICENSE`](LICENSE).

## Status

**Experimental.** The loop works; the documentation is still settling. Issues and pull requests welcome. Publishing your own fork: [`PUBLISHING.md`](PUBLISHING.md).
