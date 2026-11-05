# Server routing: relay architecture (example)

How a stream flows from camera to viewer, and how to measure the relay's bitrate cap. Real endpoints live only in the project's `.learnings/private/` notes.

## The path

```
[Camera] → [Capture device] → [OBS] → [Bonding router] → [Bonded uplink] → [Relay] → [CDN] → [Viewer]
```

Most failures cluster at the bonded uplink and the relay.

## Two relays

The relay is a server, often cloud-hosted, that receives the bonded stream over SRT or RTMP, buffers short hiccups so the CDN never sees them, and forwards the stream to one or more CDN endpoints (Vimeo, YouTube, a custom RTMP target).

Keep two: a **primary** for the event and a **fallback**, in a different region where possible. If the primary fails, switch the OBS server URL to the fallback in seconds; you can also test on the fallback while the primary is live.

## Measuring the reliable bitrate cap

The reliable cap is the highest bitrate the path sustains without drops. It depends on the bonded uplink at that venue and the route to the relay, so measure it per venue and relay:

1. Start a trial stream to the relay (not to the public CDN event) at a bitrate you know is safe, such as 2000 kbps.
2. Every 5 minutes, raise the bitrate by 500 kbps.
3. Stop when OBS's dropped frames pass 0.5% over a 5-minute step. The last step below that is the ceiling.
4. Set the stream to 80% of the ceiling; that is the reliable cap.
5. Record it as a lesson (Pattern-Key `live-streaming.bitrate.cap`), with the venue, the relay and the uplink mix as placeholders.

The step size, threshold and 80% margin are a starting method, not measured values: tighten them as lessons accumulate.

## Latency

- OBS to bonding router: under 50 ms
- Bonding router to relay: 100 to 300 ms, depending on the uplink mix; SRT adds its configured latency on top
- Relay to CDN: 100 to 500 ms
- CDN to viewer: 5 to 30 seconds, set mostly by the CDN's buffering

Glass to glass, expect 10 to 30 seconds. These are typical ranges, not measurements of this setup.

## Failure modes by stage

| Stage | Common failure | Detection signal |
|---|---|---|
| Capture device | USB or cable disconnect | OBS shows no signal on that source |
| OBS | Encoder overload | OBS status bar or log: encoding overloaded |
| Bonding router | Uplink degradation | Router dashboard |
| Bonded uplink | Throughput collapse | OBS dropped frames spike |
| Relay | Connection refused | OBS reports the stream disconnected |
| CDN | Ingest failure | CDN dashboard or an external monitor |
| Viewer | Privacy, geo-restriction or age setting | Viewer reports; no error in OBS or the CDN |
