# OBS configuration — annotated reference (example)

Working OBS configuration that's been tested across multiple live events through a bonded uplink to a cloud-hosted SRT/RTMP relay. Use as your baseline; adjust only with documented justification.

> **This is an example.** Bitrate caps and resolutions vary by relay. Test your own setup and document the values in `.learnings/`.

## Output settings (Settings → Output → Streaming)

| Setting | Value | Why |
|---|---|---|
| Output Mode | Advanced | Required to access CBR + keyframe interval |
| Encoder | x264 (or hardware NVENC if available) | Software is more reliable; hardware is faster |
| Rate Control | **CBR** | Variable bitrate causes jitter on bonded uplinks |
| Bitrate | **3500 kbps** *(example — depends on your relay's cap)* | Set to your relay's measured reliable ceiling |
| Keyframe Interval | **2 seconds** | Required by most CDN ingest endpoints |
| CPU Usage Preset | veryfast | Balance between quality and CPU load |
| Profile | high | Better compression efficiency |
| Tune | (none) | Default works; only change for special cases |

## Video settings (Settings → Video)

| Setting | Value | Why |
|---|---|---|
| Base (Canvas) Resolution | 1920x1080 | Native preview; downscaled at output |
| Output (Scaled) Resolution | **1280x720** *(example)* | Reliable at 3500 kbps; 1080p often exceeds bonded capacity |
| Downscale Filter | Lanczos | Sharper than Bilinear at 720p |
| Common FPS Values | 30 | 60fps doubles bandwidth need |

## Audio settings (Settings → Audio)

| Setting | Value | Why |
|---|---|---|
| Sample Rate | 48 kHz | Industry standard for video |
| Channels | Stereo | Mono works but stereo is expected |
| Audio Bitrate (per source) | 160 kbps | High quality, modest bandwidth cost |

## Advanced settings (Settings → Advanced)

| Setting | Value | Why |
|---|---|---|
| Process Priority | Above Normal | OBS gets CPU when it needs it |
| Renderer | Direct3D 11 | Default on Windows; works |
| Color Format | NV12 | Compatible with most CDNs |
| Color Space | 709 | Standard HD broadcast |
| Color Range | Limited (16-235) | Avoids "crushed" blacks in CDN preview |

## Reconnect / failure handling (Settings → Output → Streaming → Advanced)

| Setting | Value | Why |
|---|---|---|
| Auto-reconnect | **ON** | Connection drops are inevitable; recover automatically |
| Retry delay | 10 seconds | Long enough to clear transient issues |
| Maximum retries | 30 | ~5 minutes of retry attempts before giving up |

## What NOT to set

- **Variable bitrate (VBR)** — causes jitter on bonded uplinks
- **1080p at low bitrates** — exceeds capacity, causes drops
- **60fps without confirmed bandwidth headroom** — doubles bandwidth requirement
- **"Lossless" or extreme high quality presets** — encoder can't keep up at high bitrates

## Server URL configuration

The actual server URL and stream key are NOT in this file. They live in `.learnings/private/server-endpoints.local.md` (gitignored). Never commit them.

To set them in OBS: Settings → Stream → Service: Custom → Server: `[FROM PRIVATE NOTES]` → Stream Key: `[FROM PRIVATE NOTES]`.
