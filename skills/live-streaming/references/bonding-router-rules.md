# Bonding router rules (example)

Operating rules for a cellular bonding router: a device that bonds several cellular, Wi-Fi or Ethernet uplinks into one connection. They are generic; notes about your own hardware and carriers go in the project's `.learnings/private/` notes, and the results you measure go in the domain's lessons.

## Before the event

- **Test every uplink at the venue,** not from the office: signal and carrier performance vary by site. Keep a record of which uplinks work where in `.learnings/private/<venue>.local.md`.
- **Check each uplink's real throughput,** not its signal bars; bars can show full while throughput is poor. Confirm with a low-bitrate trial stream at least 30 minutes before showtime.
- **Disable any uplink below useful capacity.** Many routers keep a slow uplink in the bond and it drags the total down.
- **Update firmware between events,** never in the week of one.

## During the stream

- **Watch the router dashboard as well as OBS;** some failures show there first.
- **Keep the uplink mix fixed.** Adding or removing an uplink makes the bond rebalance, with a brief throughput drop.
- **Keep the bonded network for the stream alone:** video calls (Zoom, Teams, Meet) and file uploads go on another connection.
- **Disable a flaky uplink cleanly** and note why for the REFLECT after the event.

## The router boots but finds no uplinks

1. Power-cycle it: fully off, 30 seconds, on.
2. Re-seat each SIM, modem and cable.
3. Check that the SIM trays and antenna connectors are fully seated.
4. Try one uplink at a time to find a failed one.

## Throughput is lower than expected

1. Check each uplink's own throughput in the dashboard.
2. Disable any uplink below half its expected throughput.
3. If every uplink looks fine but the bonded total is low, the relay side may be the bottleneck: re-measure the cap (`server-routing.md`).
