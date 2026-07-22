# Runtime Reshaped theme (no CLI build step)

We customize Reshaped with a fixed product palette (**Brand** + **Primary**). Reshaped supports both a CLI that emits static theme CSS and a runtime API (`getThemeCSS` / `generateThemeColors` from `@reshaped/theming`). For a single fixed brand that we own in app code, the CLI’s watch/`predev`/committed-CSS ceremony is cost without payoff — we are not doing user-picked or server-driven white-label themes, and we are not customizing viewports/media that need the PostCSS theme pipeline yet.

**Decision:** define the `altShift` theme in `ui/theme.ts`, generate CSS at runtime with `baseThemeDefinition` + `generateThemeColors({ primary: PRIMARY, brand: { hex: BRAND, hexDark: BRAND_DARK } })`, inject that CSS from the server root layout, and point `Reshaped` / `data-rs-theme` at `altShift`. Do not add a `reshaped theming` build or watch script unless we later need CLI-only outputs (e.g. custom viewport media).

**Rejected:** CLI-generated theme CSS as the default path (better for shipping many static themes or PostCSS media integration; heavier DX for two seed colors). Theme fragment on top of stock `slate` (keeps a second theme name and an unused base import).

## Consequences

- `@reshaped/theming` is a direct dependency (pnpm will not reliably resolve it via `reshaped` alone).
- Theme CSS must be injected early on the server to avoid a first-paint flash of the default palette.
- Hex seeds live as `BRAND` / `BRAND_DARK` / `PRIMARY` in the theme entry — not duplicated in `CONTEXT.md`.
- Exception: `app/icon.svg` must mirror `BRAND` / `BRAND_DARK` as literal fills (SVG cannot import TS). Co-located comments and `ui/__tests__/icon-brand-colors.test.ts` keep that duplicate honest.
