# Pattern-Key guide

A `Pattern-Key` groups recurring lessons. When a new note shares a key with an existing entry, the entry's `Recurrence-Count` goes up instead of a duplicate being logged, and the count drives promotion (see `lesson-lifecycle.md`).

## Format

```
<domain>.<topic>.<aspect>
```

Three parts separated by dots; lowercase, hyphens inside a part, no underscores.

1. **Domain** is the domain folder name, exactly: `live-streaming`, `marketing`, `video-editing`.
2. **Topic** is the subsystem, tool or sub-area: `bitrate`, `uplink`, `email`, `aximmetry`.
3. **Aspect** is the specific thing the lesson is about: `cap`, `carrier-a-2g`, `subject-line`, `preview-render-target`.

A tool belongs in the topic part, under the domain where the work happens: `virtual-studios.aximmetry.preview-render-target`, not `aximmetry.preview.render-target`.

## Examples

| Pattern-Key | Domain | Topic | Aspect |
|---|---|---|---|
| `live-streaming.bitrate.cap` | live-streaming | bitrate | cap |
| `live-streaming.uplink.carrier-a-2g` | live-streaming | uplink | carrier-a-2g |
| `virtual-studios.aximmetry.version-compat` | virtual-studios | aximmetry | version-compat |
| `virtual-studios.ue5.composure-setup` | virtual-studios | ue5 | composure-setup |
| `marketing.email.subject-line` | marketing | email | subject-line |
| `video-editing.color.skin-tone` | video-editing | color | skin-tone |
| `filming.audio.lavalier-placement` | filming | audio | lavalier-placement |

## Stable keys

A good key is one you would re-derive tomorrow, seeing the same issue without remembering the entry. Name the thing, not the occasion.

| Weak key | Problem | Better |
|---|---|---|
| `relay-region-bitrate-issue-jan-2026` | Names an occasion and a date | `live-streaming.bitrate.cap` |
| `bug-3` | Says nothing | `virtual-studios.aximmetry.preview-render-target` |
| `the-zoom-thing` | Too vague | `live-streaming.network.video-calls` |
| `streaming_bitrate_cap` | Underscores, no domain folder name | `live-streaming.bitrate.cap` |
| `Live-Streaming.Bitrate.Cap` | Mixed case | `live-streaming.bitrate.cap` |

Before drafting a new key, search the domain's files for keys with the same topic; reuse one that fits. When two keys could fit, ask the user which.
