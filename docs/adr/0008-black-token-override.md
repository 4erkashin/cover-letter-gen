# Black is an exact `black` token override

Figma’s eye-black (`#101828`, `BLACK`) is not `#000`. Reshaped’s stock `black` is true black; we want one product Black for fills, overlays, and opt-in text.

**Decision:** set `black: { hex: BLACK, hexDark: BLACK_DARK }` in the theme entry. Keep page default text as Neutral Foreground; paint Black on text via `var(--rs-color-black)` where Figma reads as black (`Text` has no `color="black"`). Accept that Overlay scrims, media buttons, and text on `View backgroundColor="white"` also use this Black.

Dark ink is invented like Neutral Foreground’s dark pair — a strong near-white (`#f9fafb`), not `#fff` and not the muted `#c3cee5`.

## Considered options

- **Custom CSS var only (leave stock `#000`)** — second “almost black”; Overlay/media stay true black while UI Black diverges.
- **Flip `body` color to Black** — titles inherit for free, but most Figma copy is Neutral Foreground; would force explicit `color="neutral"` everywhere muted.
- **Leave stock `black`** — titles/icons can’t match Figma without one-off hexes.
