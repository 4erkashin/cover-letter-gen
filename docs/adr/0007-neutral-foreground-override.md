# Neutral text ink is an exact `foregroundNeutral` override

Figma’s default body ink (`#667085`, `NEUTRAL_FOREGROUND`) is a **foreground** value. Reshaped’s `generateThemeColors({ neutral })` seed paints the neutral **surface** family and derives ink at fixed lightness — passing that hex as `neutral` would color backgrounds and leave `Text color="neutral"` on a different color.

**Decision:** keep Brand/Primary via `generateThemeColors` as today; set `foregroundNeutral: { hex: NEUTRAL_FOREGROUND, hexDark: NEUTRAL_FOREGROUND_DARK }` as a direct override. Do not use the `neutral` hue seed for this until we intentionally theme neutral surfaces.

Dark ink is invented like `BRAND` / `BRAND_DARK` (same family, paired constant) — not Figma-sourced. Brand’s small lightness bump is too dark for text-on-dark; we use a mid lifted slate (`#c3cee5`) so muted body ink stays readable.

## Considered options

- **`generateThemeColors({ neutral: NEUTRAL_FOREGROUND })`** — free dark variants for the whole neutral family, but the hex lands on `backgroundNeutral`, not default text ink.
- **Use `neutral-faded` instead** — with a neutral seed, faded foreground is near the Figma hex, but we want the `neutral` Text color slot and an exact match.
- **Apply Brand’s exact ΔL to the light ink** — keeps the recipe but fails body contrast on dark pages.
- **Near-white / stock Reshaped dark L** — maximum clarity; rejected as too bright vs the muted light ink.
