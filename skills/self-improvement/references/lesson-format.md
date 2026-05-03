# Lesson entry format

This is the canonical format for entries in any of the three lesson files (`LEARNINGS.md`, `ERRORS.md`, `FEATURE_REQUESTS.md`).

## The format

```
## [PREFIX-YYYYMMDD-XXX] category

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: pending | active | promoted | archived | resolved | wont_fix | implemented
**Area**: <domain tag>

### Summary
One-line description. Should fit on one line.

### Details
What happened. What was wrong. What is correct. Include enough context that someone reading this 6 months from now can understand it without remembering the original session.

### Suggested Action
The specific fix or rule to apply going forward. Should be concrete and testable — not "be careful with X" but "always set Y to Z when A."

### Metadata
- Source: conversation | error | user_feedback
- Pattern-Key: <domain>.<topic>.<aspect>
- Recurrence-Count: 1
- First-Seen: YYYY-MM-DD
- Last-Seen: YYYY-MM-DD
- See Also: <related entry IDs>
```

## ID prefixes

| Prefix | File | Meaning |
|---|---|---|
| `LRN-` | `LEARNINGS.md` | Learning / correction / insight |
| `ERR-` | `ERRORS.md` | Error / failure / crash |
| `FR-` | `FEATURE_REQUESTS.md` | Feature request / capability gap |

## ID format

`PREFIX-YYYYMMDD-XXX` where:

- `YYYYMMDD` is the date logged (no separators)
- `XXX` is a zero-padded sequence number (`001`, `002`, ..., `099`, `100`, ...)

Example: `LRN-20260115-001` is the first learning logged on 2026-01-15.

## Status values

The legal `Status` values vary by file:

| File | Allowed Status values |
|---|---|
| LEARNINGS | `pending`, `active`, `promoted`, `archived` |
| ERRORS | `pending`, `active`, `resolved`, `wont_fix`, `archived` |
| FEATURE_REQUESTS | `pending`, `active`, `implemented`, `wont_fix`, `archived` |

Meanings:

- `pending` — drafted, not yet user-approved (rare, only briefly during proposal).
- `active` — approved, in force.
- `promoted` — absorbed into the domain `SKILL.md` (LEARNINGS only).
- `resolved` — the underlying error is fixed (ERRORS only).
- `implemented` — the feature now exists (FEATURE_REQUESTS only).
- `wont_fix` — decided not to act on it.
- `archived` — no longer relevant, kept for history.

## Worked example 1 — LEARNINGS

```
## [LRN-20260115-001] streaming.bitrate.cap

**Logged**: 2026-01-15T14:32:00Z
**Priority**: high
**Status**: active
**Area**: live-streaming

### Summary
The active relay's reliable bitrate ceiling is around 3500-5000 kbps due to upstream jitter; default to 3500 CBR.

### Details
During a [CLIENT] event on 2026-01-15, OBS was set to 6500 kbps CBR. Frame drops appeared within the first 4 minutes, escalating to a full disconnect at minute 12. Lowered to 3500 kbps and the stream stabilized for the remaining 90 minutes. This pattern has been observed on three prior events.

### Suggested Action
For any stream routed through the active relay, set OBS to 3500 kbps CBR by default. Only test higher rates in controlled conditions, never live.

### Metadata
- Source: conversation
- Pattern-Key: streaming.bitrate.cap
- Recurrence-Count: 4
- First-Seen: 2025-09-12
- Last-Seen: 2026-01-15
- See Also: LRN-20251004-002
```

## Worked example 2 — ERRORS

```
## [ERR-20260118-003] aximmetry.preview.render-target

**Logged**: 2026-01-18T11:05:00Z
**Priority**: medium
**Status**: active
**Area**: virtual-studios

### Summary
Aximmetry scene preview window goes black when switching to a UE5 input source.

### Details
Reproduction: open Aximmetry, load scene with UE5 source, press Tab to switch preview. Preview goes black for ~2 seconds, then shows last frame. Logs show: `Render target unbound: source_id=42`. Happens on every switch.

### Suggested Action
Investigate render target binding lifecycle. Workaround for now: pre-warm preview by switching to UE5 source once at scene load, then back to default.

### Metadata
- Source: error
- Pattern-Key: aximmetry.preview.render-target
- Recurrence-Count: 2
- First-Seen: 2026-01-10
- Last-Seen: 2026-01-18
- See Also:
```

## Notes on writing good lessons

- **Be specific.** "Don't use high bitrate" is bad. "Cap the active relay at 3500 kbps CBR" is good.
- **Include the *why* when it's not obvious.** Future-you might not remember the reasoning.
- **Sanitize.** No client names, no real IPs, no credentials. Use `[CLIENT]`, `[SERVER_IP]`, `[CREDENTIAL]`.
- **One lesson per entry.** If you find yourself writing about two unrelated things, split into two entries.
- **Cross-reference with `See Also`.** When a new lesson is related to an old one, link them. Future-you will thank you.
