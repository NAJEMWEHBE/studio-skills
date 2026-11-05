# OBS configuration (example)

A baseline OBS setup for a stream over a bonded uplink to an SRT/RTMP relay. Bitrates and resolutions here are examples: use the measured values from the domain's rules and lessons, and record any change you make as a lesson.

Menu paths are from OBS Studio 30 on Windows and were not re-checked for this file; labels move between versions.

## Output (Settings → Output, Output Mode: Advanced → Streaming)

Advanced mode is what exposes rate control and the keyframe interval.

| Setting | Value | Why |
|---|---|---|
| Encoder | Hardware first: NVIDIA NVENC H.264, AMD HW H.264 or QuickSync H.264. x264 only when the PC has none | Hardware encoders cost almost no CPU; on NVIDIA RTX 20-series and newer, NVIDIA rates NVENC close to x264 `medium` |
| Rate Control | **CBR** | Variable bitrate causes jitter on bonded uplinks |
| Bitrate | **3500 kbps** *(example: your relay's measured cap)* | See `references/server-routing.md` |
| Keyframe Interval | **2 s** | YouTube recommends 2 s; Twitch requires it |
| Profile | high | Better compression |

The preset depends on the encoder:

| Encoder | Preset | Notes |
|---|---|---|
| NVENC | P5 (Slow) or P6 | Tuning: High Quality. Drop to P4 if OBS reports encoding overload |
| AMD / QuickSync | The quality end of the range | Labels differ by encoder and OBS version; keep the setting the trial stream holds without overload |
| x264 | veryfast | Raise to `faster` only with CPU to spare during the trial stream |

The NVENC preset names (P1 to P7) are those of recent OBS versions and were not checked in a running OBS for this file.

## Video (Settings → Video)

| Setting | Value | Why |
|---|---|---|
| Base (Canvas) Resolution | 1920x1080 | Native preview, scaled at output |
| Output (Scaled) Resolution | **1280x720** *(example)* | Holds up at 3500 kbps; 1080p often exceeds what the bond carries |
| Downscale Filter | Lanczos | Sharper than Bilinear at 720p |
| FPS | 30 | 60 fps needs much more bitrate for the same quality |

## Audio (Settings → Audio)

| Setting | Value | Why |
|---|---|---|
| Sample Rate | 48 kHz | Video standard; every capture source should match it |
| Channels | Stereo | Expected by viewers |
| Audio Bitrate (Output → Audio) | 160 kbps | Good quality at a small cost |

## Advanced (Settings → Advanced)

| Setting | Value | Why |
|---|---|---|
| Process Priority (Windows) | Above Normal | OBS gets the CPU when it needs it |
| Color Format | NV12 | Accepted by every common CDN |
| Color Space | Rec. 709 | HD standard |
| Color Range | Limited | Avoids crushed blacks on the CDN |
| Automatically Reconnect | **On** | Drops happen; recover without an operator |
| Retry Delay | 10 s | Long enough to clear a brief outage |
| Maximum Retries | 30 | |

How long 30 retries last depends on OBS's retry back-off: recent versions may lengthen the delay after each failure (not confirmed for this file). Time it once on a trial stream by stopping the relay, and record the result as a lesson.

## Stream server (Settings → Stream, Service: Custom)

**RTMP:** Server `rtmp://[RELAY_HOSTNAME]/[APP]`, Stream Key `[STREAM_KEY]`.

**SRT** (the reason to use a relay over bonded links: it rides out packet loss and reordering):

```
srt://[RELAY_HOSTNAME]:[PORT]?mode=caller&latency=[LATENCY]&passphrase=[CREDENTIAL]&pbkeylen=16
```

- `mode=caller`: OBS dials the relay, which listens.
- `latency`: start at about 4 times the round-trip time to the relay; on bonded cellular that is often 2000 to 3000 ms. OBS passes the URL options to its SRT library, which reads `latency` in microseconds (2000 ms = `2000000`); check this against the OBS SRT guide for your version, since it was not confirmed for this file.
- `passphrase`: 10 to 79 characters, the same on the relay; leave it and `pbkeylen` out if the relay has no encryption.
- Some relays also need `streamid=[STREAM_ID]`. Leave the Stream Key field empty.

Real URLs, keys and passphrases go only in the project's `.learnings/private/server-endpoints.local.md`.

## Settings to avoid

- **VBR:** jitter on bonded uplinks.
- **1080p at low bitrates:** more than the bond carries, so frames drop.
- **60 fps without measured headroom.**
- **The slowest presets** (x264 `slow` and below, NVENC P7) unless the trial stream shows the PC keeps up.
