# Pattern-Key naming guide

## Why Pattern-Keys exist

A `Pattern-Key` is a stable identifier that groups recurring lessons. Without it, the same issue would get logged multiple times as separate entries, and the system would never recognize the pattern.

With Pattern-Keys, the system can:

- De-duplicate (increment `Recurrence-Count` instead of creating a new entry).
- Track recurrence over time.
- Auto-flag patterns that hit promotion thresholds.

## Format

```
<domain>.<topic>.<aspect>
```

Three parts, separated by dots. Lowercase, hyphens for multi-word components, no underscores.

## Examples

| Pattern-Key | Domain | Topic | Aspect |
|---|---|---|---|
| `streaming.bitrate.cap` | streaming | bitrate | cap |
| `streaming.sim.viva-2g` | streaming | sim | viva-2g |
| `aximmetry.version.compat` | aximmetry | version | compat |
| `ue5.composure.setup` | ue5 | composure | setup |
| `marketing.email.subject-line` | marketing | email | subject-line |
| `editing.color.skin-tone` | editing | color | skin-tone |
| `filming.audio.lavalier-placement` | filming | audio | lavalier-placement |

## Naming rules

1. **Domain** is the top-level area of work. Use the same name as the skill folder (`live-streaming`, `marketing`, `video-editing`, etc.). Drop the `live-` prefix if it's redundant in context — e.g. `streaming.bitrate.cap`, not `live-streaming.bitrate.cap`.
2. **Topic** is the subsystem or sub-area within the domain (`bitrate`, `sim`, `email`, `color`).
3. **Aspect** is the specific thing the lesson is about (`cap`, `viva-2g`, `subject-line`, `skin-tone`).

## Stability is the whole point

A good Pattern-Key is one that **future-you would re-derive when seeing the same issue again**. If you'd come up with a different key the second time, the key is too specific or too creative.

**Test:** if you saw the same issue tomorrow without remembering the existing entry, would you naturally pick the same key?

## Common mistakes

| Bad key | Why it's bad | Better |
|---|---|---|
| `frankfurt-bitrate-issue-jan-2026` | Has a date, not stable across recurrences | `streaming.bitrate.cap` |
| `bug-3` | Meaningless | `aximmetry.preview.render-target` |
| `the-zoom-thing` | Too vague | `streaming.zoom.routing` |
| `streaming_bitrate_cap` | Underscores instead of dots/hyphens | `streaming.bitrate.cap` |
| `Streaming.Bitrate.Cap` | Mixed case | `streaming.bitrate.cap` |

## Adding new domains

When you start a new domain, the first Pattern-Key effectively defines the namespace. Pick the domain prefix carefully — you'll be living with it for the life of the skill.

## When in doubt

Ask the user. The Pattern-Key is one of the few fields where a small inconsistency now causes a big mess later — better to pause and pick well.
