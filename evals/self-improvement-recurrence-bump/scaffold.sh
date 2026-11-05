#!/usr/bin/env bash
# Creates a lesson folder with one entry whose Pattern-Key the prompt repeats.
set -euo pipefail
mkdir -p .learnings/live-streaming
cat > .learnings/live-streaming/LEARNINGS.md <<'MD'
# LEARNINGS: live-streaming

---

## [LRN-20260115-001] live-streaming.bitrate.cap

**Logged**: 2026-01-15T14:32:00Z
**Priority**: medium
**Status**: active
**Area**: live-streaming

### Summary
The primary relay's reliable bitrate ceiling is about 3500 kbps; default to 3500 CBR.

### Details
At 6500 kbps CBR, dropped frames appeared within 4 minutes; at 3500 kbps the stream held.

### Suggested Action
Set OBS to 3500 kbps CBR for streams through the primary relay.

### Metadata
- Source: conversation
- Pattern-Key: live-streaming.bitrate.cap
- Recurrence-Count: 2
- First-Seen: 2025-09-12
- Last-Seen: 2026-01-15
- See Also:
MD
for f in ERRORS FEATURE_REQUESTS RULES; do printf '# %s: live-streaming\n\n---\n' "$f" > ".learnings/live-streaming/$f.md"; done
