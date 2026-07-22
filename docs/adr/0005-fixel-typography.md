# Fixel as brand typography

App UI uses **Fixel Display** for titles/headlines and **Fixel Text** for body, loaded via `next/font/local` and wired through the Reshaped `altShift` theme (see ADR-0004). CSS variable names are owned by `ui/fonts.ts`: next/font requires `variable` as an AST string literal, so each name is duplicated there (literal + exported const for the theme stacks) and locked by `ui/__tests__/fixel-font-vars.test.ts`. Brand choice over system/Inter stacks.

Figma-sourced sizes land on Reshaped 4 tokens: `headline-1` 48/60 and `headline-2` 36/44 (semibold, −0.02 tracking); main body (Fixel Text Regular · 18/28) on `body-1`. Other type-scale tokens stay on Reshaped defaults until later Figma-driven iterations; we do not invent sizes.

**`fontFamily.headline` and `fontFamily.title` are both Fixel Display.** Reshaped keeps two face roles: `headline*` scale → `headline` family, `featured*` scale → `title` family. Defaults ship the same Inter stack for both; the split looks like leftover naming from the old `title-*` scale, not a real two-display-font system. We point both at Display so featured text does not silently fall back to Inter. Body stays Fixel Text; monospace untouched.

## Considered options

- **System / generic webfonts** — easier, but weak brand signal and not what Figma established.
- **Keep Inter in the CSS fallback chain** — dead weight; Inter is not loaded.
- **Map onto `featured-*` by nearest default size** — invents a slot assignment; rejected in favour of `headline-1`/`headline-2`.
- **Only set `fontFamily.headline`** — leaves `featured-*` on whatever `title` still resolves to (Inter in the base theme).
- **Port every Reshaped size token now** — would invent values Figma has not signed off on.
