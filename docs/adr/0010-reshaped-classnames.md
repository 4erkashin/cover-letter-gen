# JSX `className` composition uses Reshaped `classNames`

MVP code joined optional CSS-module classes with `[…].filter(Boolean).join(" ")`. Reshaped already exports `classNames` for that (falsy values dropped).

**Decision:** compose multi-part JSX `className` with `classNames` from `reshaped`. ESLint bans array literals and `.join(…)` as the direct `className={…}` expression — narrow, same taste as the SVG import carve-out, not a repo-wide ban on `.filter(Boolean).join`.

**Rejected:** a local `@/ui` re-export; `clsx` / `classnames` as a second helper; hunting template-literal concat.
