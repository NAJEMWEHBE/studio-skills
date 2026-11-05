#!/usr/bin/env bash
# Builds one zip per skill for claude.ai: <out>/<skill>.zip holds the folder <skill>/.
# Usage: bash scripts/build-zips.sh [out-dir]   (default: dist)
set -euo pipefail
cd "$(dirname "$0")/.."
out=${1:-dist}
mkdir -p "$out"
out=$(cd "$out" && pwd)
cd skills
for dir in */; do
  skill=${dir%/}
  [ -f "$skill/SKILL.md" ] || continue
  rm -f "$out/$skill.zip"
  zip -qr "$out/$skill.zip" "$skill" -x '*/.learnings/*' '*.local.md' '*/.DS_Store'
  echo "built $out/$skill.zip"
done
