# `ui/` never imports features or domain

The dependency between our UI layers has to run one way, and stating that in README prose was not enough on its own.

**Decision:** imports only ever point **into** `ui/`. A `ui/` module never imports from `@/features` or `@/domain`, enforced by `import/no-restricted-paths` zones rather than documentation. Two details of that setup are worth knowing:

- Zones match the **resolved** path, so a relative escape like `../features/goal` is caught the same as `@/features/goal`.
- The boundary lives in its own rule, which lets `no-restricted-imports` stay configured once for the whole repo.

Because of that direction, chrome that assembles feature parts (a header, a nav) is a **composition, not a component**. It belongs at the shell call site in `app/`, which is the only layer allowed to know about features. Do not move it into `ui/` just to tidy `app/` up.

What `ui/` may own is each self-sufficient piece that the call site mounts. If such a piece takes a non-serializable prop — an SVG `icon`, say — it imports that asset itself behind its own `"use client"` boundary (ADR-0006). That is what allows a **server-rendered** caller to compose it.

**Rejected:** extracting that header into a component of its own, in any of the three shapes we tried — a `ui/app-header` taking an `actions` slot (this does invert the import, but keeps single-use chrome behind a wrapper nobody needs), a colocated `app/app-header.tsx`, or an `app-shell` feature owning chrome that is only ever mounted once.
