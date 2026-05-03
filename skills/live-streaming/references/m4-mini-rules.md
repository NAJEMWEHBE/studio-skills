# Bonding router operating rules (example)

Generic do/don't list for a cellular bonding router (the kind that combines multiple cellular/Wi-Fi/Ethernet uplinks into a single bonded connection). Hardware-specific or carrier-specific notes belong in `.learnings/private/` (gitignored), not here.

> **This file is named `m4-mini-rules.md` for compatibility with the parent skill, but the rules below are generic.** Rename and adapt for your own bonding hardware.

## Do

- **Verify all uplinks are at expected signal/quality** before any live event. Signal varies by site.
- **Disable any uplink that drops below useful capacity** — the router may not auto-disable; it will keep dragging slow uplinks into the bond and starve the total.
- **Run a low-bitrate trial stream** through the bonded uplink at least 30 minutes before showtime.
- **Keep firmware updated** — but never update during the week of an event.
- **Monitor the router dashboard during the stream**, not just OBS. Some failures are visible there first.

## Don't

- **Don't put video calls (Zoom, Teams, Meet) on the same network during a stream.** They starve the bonded uplink.
- **Don't put file uploads on the same network during a stream.** Same reason.
- **Don't change uplink combinations mid-stream.** The bonded uplink rebalances when uplinks change, causing brief throughput drops.
- **Don't leave a known-flaky uplink in the active rotation.** Disable it cleanly; document why in `.learnings/`.
- **Don't trust signal strength alone.** Real-world throughput can be much lower than what bars suggest. Always validate with a trial stream.

## Uplink management notes

- Each uplink should be tested at the actual venue (not from your office).
- Carrier/network preferences vary by location.
- Keep records of which uplinks work where in `.learnings/private/<file>.local.md` (private, gitignored).

## When the router won't start

If the router boots but uplinks aren't detected:

1. Power-cycle the device (full off, 30 seconds, on again).
2. Re-seat each SIM/cable physically.
3. Check the locking lever / connector seating.
4. If still nothing, try a single uplink at a time to isolate hardware failure.

## When throughput is lower than expected

1. Check each uplink's individual throughput in the dashboard.
2. Disable any uplink showing <50% of expected throughput.
3. If all uplinks look fine but bonded total is low, the relay-side may be the bottleneck — see `references/server-routing.md`.
