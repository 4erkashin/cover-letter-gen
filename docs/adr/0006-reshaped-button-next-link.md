# In-app Reshaped Button navigation uses next/link wrap

Reshaped `Button` accepts `href` and renders a plain `<a>`. In the App Router that causes a **full page reload**, not client-side navigation. Wrapping with `next/link` looks redundant next to `Button`’s own `href` API (and can read as a Middle Man in review) — it is deliberate.

**Decision:** for in-app navigation, wrap Reshaped `Button` in `next/link`. Put `href` (and icon-only `aria-label`) on `Link`. Do **not** pass `href` on `Button`. External URLs and non-App-Router targets may keep `Button href` when a full navigation is intended.

**Rejected:** `Button href` alone for in-app routes (full reload). `Button` `render` → `Link` as the root (needs a client boundary and type assertions for Actionable attributes). Dropping `Button` and styling `Link` by hand for chrome that should stay Reshaped.
