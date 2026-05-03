---
name: live-streaming
description: Live streaming operations using a bonding router and SRT/RTMP relay servers. Use when configuring OBS, planning a stream, troubleshooting bitrate/jitter issues, deciding which uplink combination to use, or briefing a client on streaming constraints. Also use before any live event involving streaming setup.
---

# live-streaming

> **This is an example domain skill** included with the public template of `studio-skills`. The structure is real and reusable; the specifics (hardware names, relay regions, bitrate caps) are illustrative. Adapt to your own equipment and workflow.

The first concrete domain skill in this collection. Covers live streaming operations using a bonding router (e.g. cellular bonding hardware that combines multiple SIMs into a single uplink) to a hosted SRT/RTMP relay server, with OBS as the encoder.

## When to invoke this skill

- Configuring OBS for a stream
- Planning a live event involving streaming
- Troubleshooting bitrate, jitter, or connection issues mid-stream
- Deciding which uplink combination to use for a bonded connection
- Briefing a client on streaming capabilities and constraints
- Reviewing past lessons in `.learnings/` before any major streaming event

## Hardware stack (example)

- **Encoder:** OBS Studio running on a workstation
- **Bonding router:** A cellular bonding device that accepts multiple SIM cards (and optional Ethernet/Wi-Fi), bonds them into a single uplink
- **Relay server:** A cloud-hosted SRT/RTMP receiver — primary plus fallback for redundancy
- **CDN:** Vimeo, YouTube, or custom RTMP target depending on event
- **Network path:** OBS → bonding router → bonded uplink → relay → CDN

Real IPs, hostnames, ports, credentials, and stream keys live in `.learnings/private/` (gitignored). Never in this file.

## Pre-stream checklist

Run through this list before any live event. Order matters.

1. **Verify relay server is responsive.** Test with low-bitrate stream 30+ minutes before showtime.
2. **Confirm uplink card status.** All active SIMs/uplinks are paid up, signal-checked, and not blocked.
3. **Set OBS bitrate to the relay's reliable cap.** See `references/server-routing.md`.
4. **Set OBS encoder to CBR.** Variable bitrate causes jitter on bonded uplinks.
5. **Set keyframe interval to 2 seconds.** Required by most CDN ingest endpoints.
6. **Enable auto-reconnect in OBS.** Connection drops are not a question of *if* but *when*.
7. **Verify NO video calls** (Zoom, Teams, Meet) are routed through the bonding router. They will starve the stream.
8. **Confirm fallback relay is reachable.** If primary fails, you switch in seconds, not minutes.
9. **Check CDN content rating / age gate** — silently blocks some regions if mis-set.
10. **Run a 5-minute trial stream end-to-end.** Validate everything actually works before the audience arrives.

## Real-time monitoring rules

While the stream is live:

- **Watch the OBS dropped-frames counter.** Above 1% sustained = lower bitrate immediately.
- **Watch the bonding router dashboard for uplink degradation.** A SIM dropping to 2G can take down the bonded total.
- **Don't tune anything mid-stream that you didn't tune in the trial.** No experiments live.
- **Keep a fallback OBS scene ready** with a static "we'll be right back" card in case you need to drop and reconnect.

## Failure-mode quick reference

| Symptom | Likely cause | Action |
|---|---|---|
| Dropped frames climbing | Bitrate too high for current relay capacity | Lower bitrate to your relay's reliable cap |
| Stream connects then disconnects after a few minutes | Jitter on a specific uplink | Check bonding router dashboard, drop the offending uplink |
| Stream connects but viewers see freezes | CDN-side issue or keyframe-interval mismatch | Confirm 2s keyframe; check CDN status page |
| Some regions can't watch | CDN content rating not set correctly | Set rating before publishing |
| Audio drift accumulating | Encoder clock vs CDN clock drift | Reset stream every ~3 hours for long events |
| All uplinks show signal but bonded throughput is low | Carrier throttling, OR an uplink has degraded | Disable suspect uplink; re-enable after testing |

## Where the rules live

This `SKILL.md` carries the **stable, well-earned rules** — content that was promoted from the lesson library after recurring patterns were observed.

The **active lesson library** is in `.learnings/`:

- `.learnings/LEARNINGS.md` — corrections, knowledge gaps, best practices
- `.learnings/ERRORS.md` — command/tool/API failures
- `.learnings/FEATURE_REQUESTS.md` — capabilities that don't exist yet

Read `.learnings/` before any major event. New lessons get added there during sessions; once they hit the promotion threshold (see `skills/self-improvement/references/promotion-criteria.md`), they graduate into this `SKILL.md`.

## How to add a new lesson during a stream

When something happens worth logging during a live event:

1. **Stop the stream first if needed** — the lesson can wait, the audience can't.
2. **At the next break or after the event ends**, the `self-improvement` skill's REFLECT phase will ask you about it.
3. **Don't try to log mid-stream.** It's distracting and the lesson will be lower-quality.

For the rare case where a critical safety issue surfaces mid-stream (e.g. you discover a credential is exposed), stop and ask the user what to do — don't log silently.

## File map

```
skills/live-streaming/
├── SKILL.md                      (this file)
├── .learnings/
│   ├── LEARNINGS.md              (active lesson library)
│   ├── ERRORS.md                 (active error library)
│   └── FEATURE_REQUESTS.md       (active feature request library)
├── examples/
│   └── obs-config-example.md     (annotated working OBS config)
└── references/
    ├── m4-mini-rules.md          (generic do/don't list for the bonding router)
    └── server-routing.md         (relay architecture concept)
```
