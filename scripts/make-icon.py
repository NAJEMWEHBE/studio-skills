"""Draws .claude-plugin/icon.png (1024 px square): a lesson loop around a tally light.

Usage: python scripts/make-icon.py   (needs Pillow)
"""
import math
from pathlib import Path

from PIL import Image, ImageDraw

SIZE, SS = 1024, 4  # output size, supersampling factor
S = SIZE * SS
INK, AMBER, TALLY = (20, 22, 28), (242, 165, 65), (229, 72, 77)

img = Image.new("RGB", (S, S), INK)
d = ImageDraw.Draw(img)
cx = cy = S / 2
r, w = S * 0.30, S * 0.075

# Loop: an open arc from 20 to 310 degrees (PIL angles run clockwise from 3 o'clock).
start, end = 20, 310
d.arc([cx - r, cy - r, cx + r, cy + r], start, end, fill=AMBER, width=int(w))

# Round cap at the tail of the arc.
a = math.radians(start)
tx, ty = cx + (r - w / 2) * math.cos(a), cy + (r - w / 2) * math.sin(a)
d.ellipse([tx - w / 2, ty - w / 2, tx + w / 2, ty + w / 2], fill=AMBER)

# Arrowhead at the head of the arc, pointing along the direction of travel.
a = math.radians(end)
mid = r - w / 2
hx, hy = cx + mid * math.cos(a), cy + mid * math.sin(a)
tangent = (-math.sin(a), math.cos(a))  # clockwise direction
normal = (math.cos(a), math.sin(a))
L, half = w * 1.9, w * 1.25
tip = (hx + tangent[0] * L, hy + tangent[1] * L)
left = (hx + normal[0] * half, hy + normal[1] * half)
right = (hx - normal[0] * half, hy - normal[1] * half)
d.polygon([tip, left, right], fill=AMBER)

# Tally light in the centre.
t = S * 0.085
d.ellipse([cx - t, cy - t, cx + t, cy + t], fill=TALLY)

out = Path(__file__).resolve().parent.parent / ".claude-plugin" / "icon.png"
out.parent.mkdir(exist_ok=True)
img.resize((SIZE, SIZE), Image.LANCZOS).save(out, optimize=True)
print(f"wrote {out}")
