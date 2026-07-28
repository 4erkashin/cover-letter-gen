# Exact color token overrides

Product ink, borders, and Black are exact theme values on Reshaped semantic slots — not derived from `generateThemeColors({ neutral })`. That seed paints the neutral **surface** family; using it for ink or borders misses the slots we paint and warps backgrounds. Stock `borderNeutral` and `black` also diverge from the product (translucent border; true `#000`).

**Decision:** keep Brand/Primary via `generateThemeColors`. Exact-override (and add custom tokens only when needed) in the theme entry — living values in `ui/theme.ts`, product names in `CONTEXT.md`. Do not seed `neutral` for ink or borders until we intentionally theme neutral surfaces. Leave `borderNeutralFaded` on stock until a distinct decorative value shows up. Prefer stock Reshaped ink slots (`foregroundNeutral`, `foregroundNeutralFaded`, …); add a custom `foreground*` only when the strongest eye-black *ink* must mode-flip and no stock slot fits (**Strong Foreground**). Keep **Black** static (no `hexDark`) for fills/scrims/media alphas / `View backgroundColor="black"`, matching Reshaped’s black/white contract; paint eye-black *ink* with Strong Foreground (`Text` has no `color="black"`). Page default text stays Neutral Foreground; muted copy uses `neutral-faded`. Outline controls consume border/ink tokens — no local hexes (see e.g. `ui/home-button`).

## Considered options

- **`generateThemeColors({ neutral })` for ink or borders** — free family variants, but the seed lands on surfaces, not the exact ink/border slots.
- **`hexDark` on `black`** — inverts “Black” in dark mode; fights Reshaped’s static black/white model and breaks black↔white pairings / media alphas.
- **Eye-black *ink* via `black` only** — no readable dark-mode text without inverting Black.
- **Custom ink when a stock `foreground*` already fits** — rejected; rewire/use the stock slot instead (e.g. Neutral / Neutral Faded).
- **One-off hex on a single control** — fights product-wide usage and ADR-0011; components should read theme tokens.
- **Also override `borderNeutralFaded` by default** — decorative borders may differ; leave stock until needed.
