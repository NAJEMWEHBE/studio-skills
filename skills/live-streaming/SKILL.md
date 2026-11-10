---
name: live-streaming
description: Live-stream engineering for OBS over a bonded cellular router to an SRT/RTMP relay. Use when setting up OBS for a stream, running the pre-show check before a live event, fixing dropped frames, jitter or disconnects mid-stream, choosing which uplinks to bond, or briefing a client on what the stream can deliver.
---

# live-streaming

An example domain skill: the structure is real, the numbers are illustrative. The path is OBS → bonding router (several SIMs, optionally Ethernet or Wi-Fi, bonded into one uplink) → primary relay, with a fallback relay → CDN.

Before a live event, run the `self-improvement` skill's PREP for the `live-streaming` domain: its rules and lessons hold this setup's measured values (bitrate cap, uplinks that work at each venue) and override the defaults here. Real server URLs, stream keys and IPs live only in the project's `.learnings/private/` notes.

## Pre-stream checklist

Work through it in order, at least 30 minutes before showtime. Done when step 10's trial stream has run 5 minutes clean.

1. **Relay responds.** Send a low-bitrate test stream to the primary relay.
2. **Uplinks ready.** Every SIM is paid up, has signal at the venue, and isn't blocked. See `references/bonding-router-rules.md`.
3. **Bitrate set to the relay's reliable cap.** Use the measured cap from the domain's rules or lessons; with none recorded, measure it with the method in `references/server-routing.md`.
4. **Encoder set as in `examples/obs-config-example.md`:** hardware encoder where there is one, CBR.
5. **Keyframe interval 2 seconds.** YouTube recommends it and Twitch requires it.
6. **Automatic reconnect on**, as in `examples/obs-config-example.md`.
7. **Nothing else on the bonded network:** no video calls (Zoom, Teams, Meet) and no uploads. They starve the stream.
8. **Fallback relay reachable.** Switching to it should take seconds: keep its server URL ready in OBS.
9. **CDN event settings checked:** privacy, geo-restriction and age restriction match what the client expects.
10. **5-minute trial stream end to end,** watched on the CDN as a viewer would.

## While live

- **Congestion sustained:** lower the bitrate at once. On RTMP that is OBS's dropped frames above 1%. On SRT, OBS's dropped frames always read 0: watch the relay's SRT statistics (dropped and retransmitted packets climbing); OBS's kb/s may also fall below the set bitrate (`references/server-routing.md`).
- **Router dashboard:** a SIM falling to 2G can drag the bonded total down; disable it (`references/bonding-router-rules.md`).
- **Change only what the trial stream tested.** Experiments wait for the next trial.
- **A "be right back" scene stays ready** for a drop and reconnect.
- **Lessons wait for the break.** Note what happened; the `self-improvement` skill's REFLECT drafts it after the event. If a credential is exposed mid-stream, tell the user at once.

## Failure modes

| Symptom | Likely cause | Action |
|---|---|---|
| Dropped frames climbing (RTMP); on SRT, the relay's dropped or retransmitted packets climbing, or OBS's kb/s below the set bitrate | Bitrate above what the uplink and relay can carry | Lower the bitrate to the reliable cap |
| Connects, then disconnects after a few minutes | Jitter on one uplink | Find it in the router dashboard and disable it |
| Viewers see freezes | Keyframe interval mismatch, or a CDN-side problem | Confirm the 2 s keyframe; check the CDN's status page |
| Some viewers can't watch | CDN privacy, geo-restriction or age setting | Check those settings for the event |
| Audio drifts out of sync | Mixed sample rates, or a capture device's clock | Set every source and OBS to 48 kHz; check the capture device |
| Every uplink shows signal, bonded throughput is low | Carrier throttling, or one degraded uplink | Disable the suspect uplink; re-enable it after testing |

The "can't watch" and "audio drifts" rows are rules of thumb, not measured with this setup: record what you find as a lesson when either happens.
