# In-app Reshaped Button navigation renders a `next/link` root

Reshaped `Button` accepts `href` and renders a plain `<a>`. In the App Router that causes a **full page reload**, not client-side navigation. That costs more here than in a server-rendered app: Cover Letters live in `localStorage` (`features/persist-storage`) and `useCoverLetters` returns `isLoading: true` for the SSR/hydration snapshot, so every fresh document load repaints skeletons before content. Actionable's `render` prop exists for this — hand it a `next/link` and the anchor becomes the control's own root.

**Decision:** for in-app navigation use `ui/link-button`. Put `href` on `LinkButton`; the rest is `ButtonProps` and passes through. Do **not** pass `href` to Reshaped `Button` for in-app routes — ESLint bans the attribute outright (`no-restricted-syntax`, same taste as ADR-0010). External URLs and non-App-Router targets may keep `Button href` when a full navigation is intended; disable the rule inline with a reason, so the exception is a reviewable act rather than a silent reload.

`render` is a function prop, so `LinkButton` is `"use client"` and callers must be in the client graph to pass anything non-serializable. An SVG component is a function: a thin client wrapper that passes `icon` (and owns its asset import) keeps non-serializable props inside the client boundary. A server-rendered caller may still use `LinkButton` with serializable props only — which is exactly why those wrappers exist: a server layout can mount an icon control without a client shell around the whole header (ADR-0003).

**Rejected:** `Button href` alone for in-app routes (full reload, skeleton repaint). Wrapping `Button` in `Link` — two roots, and with no `href` / `onClick` / `type` Actionable falls through to a non-focusable `<span>`, so Reshaped's ring lands on the span and the wrapper has to re-plumb focus in CSS.

## Consequences

- Actionable types the render bag against `HTMLButtonElement`, so handing it to `Link` needs one `as unknown as` cast. Contained to `ui/link-button`.
- The control renders as a **single `<a>`** carrying Actionable's root class, so Reshaped's own focus ring applies with no extra CSS.
- `LinkButton` omits `render`, so a caller cannot silently replace the root and lose client-side navigation.
- The lint keys on the JSX attribute, so it cannot see an `href` smuggled through a spread. `Badge`, `Breadcrumbs`, `Link`, and `MenuItem` also take `href` and reload the same way; they are unguarded because no wrapper exists for them yet. Widen the selector when one does.
