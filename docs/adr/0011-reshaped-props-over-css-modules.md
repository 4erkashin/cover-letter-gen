# Prefer Reshaped props; CSS modules only when props can’t express real work

MVP-style layout was drifting into per-feature `.module.css` for flex, gap, size, and token colors — work Reshaped `View` / `Text` props already cover. Raw `px` also fights the design-system grid (1 unit ≈ 4px).

**Decision:** style with Reshaped props first (spacing/sizing in unit multipliers). Add a CSS module only when the effect is **not expressible** via those props (or a thin `attributes` / `style` escape) **and** the CSS does real work — motion, pseudo-elements, or overriding a library default. Layout, spacing, and color alone never justify a module. Current exemplar: `ui/skeleton` (ADR-0009). Unreviewed modules elsewhere are debt until touched, not approved exceptions.

In rare allowed CSS, prefer `var(--rs-unit-x*)` (and radius/color tokens) over literal `px` when the value is on the unit grid; keep raw `px` only for off-grid or non-spacing effects (e.g. blur, keyframe travel). Docs taste for now — no ESLint ban yet (same weight as ADR-0010 before lint).

**Rejected:** CSS modules for ordinary layout/spacing/color; inventing modules for polish like a one-line color transition; listing letter feature modules as approved exceptions before review.
