# Lesson entry format

The format for entries in `LEARNINGS.md`, `ERRORS.md` and `FEATURE_REQUESTS.md`. Rules in `RULES.md` use the shorter format at the end of this file.

## The format

```
## [PREFIX-YYYYMMDD-XXX] <pattern-key>

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: active (see the allowed values per file below)
**Area**: <domain>[, <other domain>...]

### Summary
One line.

### Details
What happened, what was wrong, what is correct. Enough context that someone reading it six months from now understands it without the original session.

### Suggested Action
The concrete, testable rule: not "be careful with X" but "always set Y to Z when A".

### Metadata
- Source: conversation | error | user_feedback
- Pattern-Key: <domain>.<topic>.<aspect>
- Recurrence-Count: 1
- First-Seen: YYYY-MM-DD
- Last-Seen: YYYY-MM-DD
- See Also: <related entry IDs>
```

The heading repeats the Pattern-Key, so a reader scanning headings sees what each entry is about. `Area` lists every domain the lesson applies to; the entry lives once, in the first domain's folder. `Source: user_feedback` marks lessons drawn from the user's edits to your output.

## IDs

`PREFIX-YYYYMMDD-XXX`: the prefix names the file, `YYYYMMDD` is the date logged, `XXX` is a zero-padded sequence number for that day in that file (`001`, `002`, ...).

| Prefix | File | Holds |
|---|---|---|
| `LRN-` | `LEARNINGS.md` | Corrections, knowledge gaps, best practices |
| `ERR-` | `ERRORS.md` | Command, tool or API failures, with reproduction steps |
| `FR-` | `FEATURE_REQUESTS.md` | Capabilities the user wanted that Claude couldn't deliver |

Example: `LRN-20260115-001` is the first learning logged on 2026-01-15.

**Collisions on merge.** If two copies of a file each gained the same ID and are later merged, give the second entry the next free sequence number and update every `See Also` that pointed to it.

## Status values

A draft is shown with `Status: active`; it reaches the file only after the user accepts it, so no entry on disk waits for approval.

| File | Allowed values |
|---|---|
| LEARNINGS | `active`, `promoted`, `archived` |
| ERRORS | `active`, `resolved`, `wont_fix`, `archived` |
| FEATURE_REQUESTS | `active`, `implemented`, `wont_fix`, `archived` |

- `active`: approved and in force.
- `promoted`: became a rule in `RULES.md` or a workflow skill; the entry carries `Promoted-To: <file>` (LEARNINGS only).
- `resolved`: the underlying error is fixed (ERRORS only).
- `implemented`: the capability now exists (FEATURE_REQUESTS only).
- `wont_fix`: the user decided not to act on it.
- `archived`: no longer applies, kept as history.

## Worked example: LEARNINGS

```
## [LRN-20260115-001] live-streaming.bitrate.cap

**Logged**: 2026-01-15T14:32:00Z
**Priority**: high
**Status**: active
**Area**: live-streaming

### Summary
The primary relay's reliable bitrate ceiling is about 3500 kbps; default to 3500 CBR.

### Details
During a [CLIENT] event on 2026-01-15, OBS was set to 6500 kbps CBR. Dropped frames appeared within 4 minutes and the stream disconnected at minute 12. At 3500 kbps it stayed stable for the remaining 90 minutes. The same happened at three earlier events.

### Suggested Action
For any stream through the primary relay, set OBS to 3500 kbps CBR. Test higher rates only on a trial stream, never live.

### Metadata
- Source: conversation
- Pattern-Key: live-streaming.bitrate.cap
- Recurrence-Count: 4
- First-Seen: 2025-09-12
- Last-Seen: 2026-01-15
- See Also: LRN-20251004-002
```

## Worked example: ERRORS

```
## [ERR-20260118-003] virtual-studios.aximmetry.preview-render-target

**Logged**: 2026-01-18T11:05:00Z
**Priority**: medium
**Status**: active
**Area**: virtual-studios

### Summary
The Aximmetry scene preview goes black when switching to a UE5 input source.

### Details
Reproduction: open Aximmetry, load a scene with a UE5 source, press Tab to switch the preview. The preview goes black for about 2 seconds, then shows the last frame. The log shows `Render target unbound: source_id=42`. Happens on every switch.

### Suggested Action
Workaround: switch to the UE5 source once at scene load, then back to the default. Investigate the render-target binding.

### Metadata
- Source: error
- Pattern-Key: virtual-studios.aximmetry.preview-render-target
- Recurrence-Count: 2
- First-Seen: 2026-01-10
- Last-Seen: 2026-01-18
- See Also:
```

## Rule format (RULES.md)

One rule per bullet, with the lesson it came from:

```
- Set OBS to 3500 kbps CBR for streams through the primary relay; test higher rates only on a trial stream. (LRN-20260115-001)
```

## Writing good lessons

- **Specific:** "Cap the primary relay at 3500 kbps CBR", not "don't use a high bitrate".
- **The why**, when it isn't obvious.
- **Placeholders** for every client, person, address, hostname and secret: `[CLIENT]`, `[SERVER_IP]`, `[HOSTNAME]`, `[CREDENTIAL]`, `[CONTACT]`.
- **One lesson per entry.** Two unrelated points make two entries, linked with `See Also` if related.
