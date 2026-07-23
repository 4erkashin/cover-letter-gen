# Neutral foreground and black are exact token overrides

Figma’s default body ink (`#667085`, `NEUTRAL_FOREGROUND`) and eye-black (`#101828`, `BLACK`) are exact product colors. Reshaped’s `generateThemeColors({ neutral })` seed paints the neutral **surface** family and derives ink at fixed lightness — passing the Figma ink hex as `neutral` would color backgrounds and leave `Text color="neutral"` wrong. Stock `black` is true `#000`; we want one product Black for fills, overlays, and opt-in text.

**Decision:** keep Brand/Primary via `generateThemeColors` as today. Set exact overrides — `foregroundNeutral: { hex: NEUTRAL_FOREGROUND, hexDark: NEUTRAL_FOREGROUND_DARK }` and `black: { hex: BLACK, hexDark: BLACK_DARK }` — in the theme entry. Do not use the `neutral` hue seed for body ink until we intentionally theme neutral surfaces. Keep page default text as Neutral Foreground; paint Black on text via `var(--rs-color-black)` where Figma reads as black (`Text` has no `color="black"`). Accept that Overlay scrims, media buttons, and text on `View backgroundColor="white"` also use this Black.

Dark pairs are invented like `BRAND` / `BRAND_DARK` (same family, paired constant) — not Figma-sourced. Neutral Foreground dark uses a mid lifted slate (`#c3cee5`) so muted body ink stays readable on dark pages (Brand’s small lightness bump is too dark for text). Black’s dark pair is a strong near-white (`#f9fafb`), not `#fff` and not the muted `#c3cee5`.

## Considered options

**Neutral foreground**

- **`generateThemeColors({ neutral: NEUTRAL_FOREGROUND })`** — free dark variants for the whole neutral family, but the hex lands on `backgroundNeutral`, not default text ink.
- **Use `neutral-faded` instead** — with a neutral seed, faded foreground is near the Figma hex, but we want the `neutral` Text color slot and an exact match.
- **Apply Brand’s exact ΔL to the light ink** — keeps the recipe but fails body contrast on dark pages.
- **Near-white / stock Reshaped dark L** — maximum clarity; rejected as too bright vs the muted light ink.

**Black**

- **Custom CSS var only (leave stock `#000`)** — second “almost black”; Overlay/media stay true black while UI Black diverges.
- **Flip `body` color to Black** — titles inherit for free, but most Figma copy is Neutral Foreground; would force explicit `color="neutral"` everywhere muted.
- **Leave stock `black`** — titles/icons can’t match Figma without one-off hexes.
