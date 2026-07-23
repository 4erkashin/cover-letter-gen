# Wrappers expose root-element props; no parallel layout snowflakes

Feature/UI wrappers were inventing one-off prop names (`gap`, `spacing`, …) for things the root already accepts — usually Reshaped `View`. Call sites then had to learn a different shape per component.

**Decision:** for a wrapper whose root is a design-system (or DOM) element, accept that root’s props (e.g. `ViewProps`), apply component defaults, then `{...props}` so the caller wins. Don’t invent a renamed subset of those props. Custom props are allowed only when they are **not** a root-prop rename — domain/behavior/slots (e.g. `active`, a render-prop `children`). Living exemplar: `features/goal/progress.tsx`. Unreviewed snowflakes elsewhere are debt until touched, not approved exceptions.

Sits beside ADR-0011 (Reshaped props over CSS modules): that one is how we style; this one is how wrapper APIs are shaped.

**Rejected:** curated parallel prop names for layout the root already has; merging `attributes` so the component always wins a11y (caller override is intentional); repo-wide retrofit in the same change as this ADR.
