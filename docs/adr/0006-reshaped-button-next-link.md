# In-app Reshaped Button navigation uses next/link wrap

Reshaped `Button` accepts `href` and renders a plain `<a>`. In the App Router that causes a **full page reload**, not client-side navigation. Wrapping with `next/link` looks redundant next to `Button`’s own `href` API (and can read as a Middle Man in review) — it is deliberate.

**Decision:** for in-app navigation, wrap Reshaped `Button` in `next/link`. Put `href` (and icon-only `aria-label`) on `Link`. Do **not** pass `href` on `Button`. External URLs and non-App-Router targets may keep `Button href` when a full navigation is intended. Living exemplar: `ui/nav-link` — a single-root `Link` wrapper that also carries the focus ring below. `ui/create-new-button` and `ui/informed-error` still pass `href` on `Button`; debt until touched, not approved exceptions.

**Rejected:** `Button href` alone for in-app routes (full reload). `Button` `render` → `Link` as the root (needs a client boundary and type assertions for Actionable attributes). Dropping `Button` and styling `Link` by hand for chrome that should stay Reshaped. Folding `Button` into the wrapper (two roots — it would have to re-expose `icon` / `size` / `variant` / `attributes` to stay useful, widening the interface to hide almost nothing).

## Consequences

- **The focus ring stops working, and the wrapper must restore it.** Without `href`, `onClick`, or `type`, Actionable falls through to a plain non-focusable `<span>` — correct, since a `<button>` inside an `<a>` is invalid HTML. But Reshaped rings that span (`[data-rs-keyboard] .root:focus`), so keyboard focus on the `<a>` paints only the UA default. `ui/nav-link` rings the child instead; the child owns the control's radius, so nothing about the ring geometry is duplicated.
- Icon-only geometry set through `Button attributes` (e.g. the 40px header control) passes through the wrapper untouched.
