# Fixel as brand typography

App UI uses **Fixel Display** for titles/headlines and **Fixel Text** for body, loaded via `next/font/local` and wired through the Reshaped `altShift` theme (see ADR-0004). CSS variable names are owned by `ui/fonts.ts`: next/font requires `variable` as an AST string literal, so each name is duplicated there (literal + exported const for the theme stacks) and locked by `ui/__tests__/fixel-font-vars.test.ts`. Brand choice over system/Inter stacks.

Figma-sourced type lands on Reshaped `font.*` slots in the theme entry — living metrics (size, line-height, weight, tracking) in `ui/theme.ts`. Docs name the slots; they do not freeze numbers. Claimed so far: `headline-1`, `headline-2`, `body-1` (main body), `body-2` (secondary body / control-label metrics — size/line-height only; weight stays at the use site, e.g. `Text weight="semibold"`). Other type-scale tokens stay on Reshaped defaults until later Figma-driven iterations; we do not invent sizes.

**`fontFamily.headline` and `fontFamily.title` are both Fixel Display.** Reshaped keeps two face roles: `headline*` scale → `headline` family, `featured*` scale → `title` family. Defaults ship the same Inter stack for both; the split looks like leftover naming from the old `title-*` scale, not a real two-display-font system. We point both at Display so featured text does not silently fall back to Inter. Body stays Fixel Text; monospace untouched.

## Considered options

- **System / generic webfonts** — easier, but weak brand signal and not what Figma established.
- **Keep Inter in the CSS fallback chain** — dead weight; Inter is not loaded.
- **Map onto `featured-*` by nearest default size** — invents a slot assignment; rejected in favour of `headline-1`/`headline-2`.
- **Only set `fontFamily.headline`** — leaves `featured-*` on whatever `title` still resolves to (Inter in the base theme).
- **Port every Reshaped size token now** — would invent values Figma has not signed off on.
- **Freeze Figma metrics in this ADR** — drifts from `ui/theme.ts`; rejected (same posture as ADR-0007 for color/shadow).
