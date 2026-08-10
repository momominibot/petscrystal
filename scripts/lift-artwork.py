#!/usr/bin/env python3
"""Lift a watercolour illustration off its paper into a transparent PNG.

Every illustration on this site ships as RGBA with its paper removed, so it
sits on whatever ground the section behind it uses. Generated artwork always
arrives on a baked-in sheet, and even a near-match reads as a pasted-in tile:
the hero's paper was #FBF9F0 against the page's #FBF9F6 and showed as an
obvious rectangle.

    python3 scripts/lift-artwork.py in.png out.png [more pairs...]

HOW IT WORKS

A threshold cutout would hack the soft washes off at a hard edge, which is the
one thing watercolour cannot survive. Instead the paper is treated as a known
backdrop the paint was laid over and the compositing is undone: how far a pixel
sits below the paper gives its alpha, and the pigment is recovered by dividing
that coverage back out.

Three details decide whether the result blends or looks wrong:

* The paper is modelled PER PIXEL, not as one colour. Generated paper carries a
  vignette, so a single estimate leaves the darker centre with residual alpha —
  a faint veil that reads as a visible rectangle.
* The pedestal is a GATE, not a scale. Rescaling alpha by (a-ped)/(1-ped) shaves
  coverage off full-strength pigment too, and since pigment is recovered by
  dividing coverage back out, the ink returns lighter. Measured on the hero:
  darkest ink went 72.8 -> 87.5 out of 255. Gating instead keeps it at 73.7.
* NO blur on the alpha. Harmless on a soft wash, destructive on 1px ink
  linework — a 0.6px Gaussian thinned that same ink to 84.5. The soft knee
  already gives the gate a shoulder.

FOR VIDEO, alpha is not a real option: ffmpeg's libvpx-vp9 advertises yuva420p
and silently writes no alpha stream, and HEVC-with-alpha is Safari-only at ~4x
the bytes. Lift every frame, then composite back onto the page's exact
background colour before encoding. Compute the paper model ONCE from frame 0
and share it — a per-frame model breathes with the wash and the flat ground
shimmers over a hold.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

FLOOR = 6 / 255.0
PEDESTAL = 0.055  # coverage at or below this is bare paper, not pigment
KNEE = 0.03       # width of the gate's shoulder
PAGE_CREAM = (0xFB, 0xF9, 0xF6)  # --color-cream


def paper_model(a):
    """Per-pixel estimate of the untouched sheet, vignette included.

    A wide maximum filter reaches past the painted area to the brightest nearby
    paper, then a heavy blur turns that into a smooth field.
    """
    width = a.shape[1]
    lum = Image.fromarray(a.max(axis=2).astype(np.uint8), "L")
    lum = lum.filter(ImageFilter.MaxFilter(9))
    lum = lum.filter(ImageFilter.GaussianBlur(width * 0.18))
    field = np.asarray(lum, np.float32)

    # keep the paper's colour cast, carried by the border ratio
    edge = np.concatenate([
        a[:12].reshape(-1, 3), a[-12:].reshape(-1, 3),
        a[:, :12].reshape(-1, 3), a[:, -12:].reshape(-1, 3),
    ])
    tint = np.percentile(edge, 80, axis=0)
    tint = tint / max(tint.max(), 1.0)
    return np.maximum(field[..., None] * tint, 1.0)


def lift(a, paper, pedestal=PEDESTAL, knee=KNEE):
    """RGB float array + paper model -> RGBA uint8 array."""
    raw = 1.0 - np.clip(a / paper, 0.0, 1.0).min(axis=2)
    alpha = raw * np.clip((raw - pedestal) / knee, 0.0, 1.0)
    safe = np.maximum(alpha, FLOOR)[..., None]
    pigment = np.clip((a - paper * (1.0 - alpha)[..., None]) / safe, 0, 255)
    pigment[alpha < FLOOR] = 0
    return np.dstack([pigment, alpha * 255.0]).astype(np.uint8)


def veil(rgba, ground=PAGE_CREAM):
    """Largest deviation the empty corners introduce over the page colour.

    The acceptance test. Anything above ~1/255 will read as a rectangle.
    """
    a = rgba.astype(np.float32)
    al = a[..., 3:4] / 255.0
    comp = a[..., :3] * al + np.array(ground, np.float32) * (1 - al)
    h, w = comp.shape[:2]
    k = int(min(h, w) * 0.08)
    corners = np.concatenate([
        comp[:k, :k].reshape(-1, 3), comp[:k, -k:].reshape(-1, 3),
        comp[-k:, :k].reshape(-1, 3), comp[-k:, -k:].reshape(-1, 3),
    ])
    return float(np.abs(corners - np.array(ground, np.float32)).max())


def lift_file(src, dst, ground=PAGE_CREAM):
    """Lift one file, raising the pedestal until the corners are truly bare."""
    a = np.asarray(Image.open(src).convert("RGB"), np.float32)
    paper = paper_model(a)
    for pedestal in (0.055, 0.075, 0.095, 0.12, 0.15):
        out = lift(a, paper, pedestal)
        v = veil(out, ground)
        if v <= 1.0:
            break
    Image.fromarray(out, "RGBA").save(dst)
    return pedestal, v


def square(path, size, margin=1.10):
    """Trim to the paint, then centre it on a transparent square canvas.

    Grids of these need a consistent frame; the raw generations vary wildly in
    how much empty paper surrounds the subject.
    """
    im = Image.open(path).convert("RGBA")
    im = im.crop(im.getbbox())
    side = int(max(im.size) * margin)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2), im)
    canvas.resize((size, size), Image.LANCZOS).save(path)


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) < 2 or len(args) % 2:
        sys.exit("usage: lift-artwork.py in.png out.png [in2.png out2.png ...]")
    for src, dst in zip(args[::2], args[1::2]):
        pedestal, v = lift_file(src, dst)
        print(f"{dst}  pedestal {pedestal:.3f}  corner deviation {v:.2f}/255")
