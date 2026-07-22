# Fixel as brand typography

App UI uses **Fixel Display** for titles/headlines and **Fixel Text** for body, loaded via `next/font/local` and wired through the Reshaped `altShift` theme (see ADR-0004). CSS variable names live in `ui/font-vars.ts` and are shared by the font loader and the theme stacks so the two cannot drift. Brand choice over system/Inter stacks.

Figma-sourced sizes (`headline-1` 48/60, `headline-2` 36/44, semibold, −0.02 tracking) land on Reshaped 4’s headline tokens. Other type-scale tokens stay on Reshaped defaults until later Figma-driven iterations; we do not invent sizes.

**`fontFamily.headline` and `fontFamily.title` are both Fixel Display.** Reshaped keeps two face roles: `headline*` scale → `headline` family, `featured*` scale → `title` family. Defaults ship the same Inter stack for both; the split looks like leftover naming from the old `title-*` scale, not a real two-display-font system. We point both at Display so featured text does not silently fall back to Inter. Body stays Fixel Text; monospace untouched.

## Considered options

- **System / generic webfonts** — easier, but weak brand signal and not what Figma established.
- **Keep Inter in the CSS fallback chain** — dead weight; Inter is not loaded.
- **Map onto `featured-*` by nearest default size** — invents a slot assignment; rejected in favour of `headline-1`/`headline-2`.
- **Only set `fontFamily.headline`** — leaves `featured-*` on whatever `title` still resolves to (Inter in the base theme).
- **Port every Reshaped size token now** — would invent values Figma has not signed off on.
