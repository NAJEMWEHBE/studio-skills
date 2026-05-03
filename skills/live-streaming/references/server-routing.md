# Server routing — relay architecture (example)

Conceptual map of how live streams flow from camera to viewer. **This is an example architecture** — adapt to your specific setup. No real endpoints in this file — those live in `.learnings/private/` (gitignored).

## The path

```
[Camera] → [Capture device] → [OBS] → [Bonding router] → [Bonded uplink] → [Relay] → [CDN] → [Viewer]
```

Each link can fail. Most failures cluster at the bonded-uplink and relay stages.

## Relay architecture

The relay is a server (often cloud-hosted) that:

- Accepts the bonded stream from the bonding router
- Re-broadcasts it to one or more CDN endpoints (Vimeo, YouTube, custom RTMP)
- Buffers brief connection hiccups so the CDN never sees them

Two relays are typically configured:

- **Primary:** the active relay for current operations
- **Fallback:** a backup, geographically distant from primary if possible

## Why two relays exist

A single point of failure in a live stream is unacceptable. With two relays:

- If primary fails, you can switch to fallback in seconds (just change the OBS server URL)
- You can run a test stream on fallback while a live stream runs on primary
- Geographic distribution reduces single-region cloud outages

## Reliable bitrate cap

Each relay has a *reliable bitrate cap* — the highest bitrate it can sustain without jitter or drops. This is determined by the relay's outbound bandwidth and the network between you and it. Test it. Document the result in `.learnings/`.

## Latency characteristics

- OBS → bonding router: <50 ms
- Bonding router bonded → Relay: 100-300 ms depending on uplink mix
- Relay → CDN: 100-500 ms depending on CDN
- CDN → Viewer: variable, typically 5-30 seconds depending on CDN buffering

Total glass-to-glass latency: typically 10-30 seconds.

## Failure modes by stage

| Stage | Common failure | Detection signal |
|---|---|---|
| Capture device | USB/cable disconnects | OBS shows "no signal" on that source |
| OBS | Encoder overload | OBS log: "encoder lagging" |
| Bonding router | Uplink degradation | Router dashboard signal indicator |
| Bonded uplink | Throughput collapse | OBS dropped frames spike |
| Relay | Connection refused | OBS "stream disconnected" with timeout |
| CDN | Ingest failure | CDN dashboard or external monitor |
| Viewer | Geo-block / rating | Viewer reports; no error in OBS or CDN |

## Where the actual endpoints live

Real server URLs, ports, credentials, and stream keys are stored in `.learnings/private/server-endpoints.local.md` (gitignored). Never in this file.
