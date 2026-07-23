# Feature UI uses compound composition (Reshaped + feature-owned wiring)

We keep **Reshaped as the only UI library**. When a feature needs reusable chrome with shared state, we compose it in a **Radix/Base UI–inspired compound**: a `Root` that owns data wiring and context, plus named parts imported as one namespace (`Feature.Root`, `Feature.Part`, …) — not separate prop-driven shells wired at every call site, and not a second headless kit.

**Decision:** feature slices that present domain state should (1) export a compound from the feature `index` whose keys are only **user-facing** parts (what the app mounts: `Root`, screens/chrome, slots), (2) let `Root` read persistence (or other sources) and provide context, (3) keep those parts context-driven under `Root`, (4) inject cross-cutting chrome (nav CTAs, etc.) via slots rather than depending on sibling features, (5) keep implementation-only chrome unexported and compose visual twins as private parts — not `variant` (or similar) switches on exported parts. File parts under the feature without repeating the feature name prefix; implement with `FeaturePart`-style function names for DevTools; do not export the part modules as public entrypoints.

**Living example:** `features/goal`.

**Rejected:** installing Base UI/Radix as dependencies for this pattern; passing domain counts into every screen; `Live*` adapter siblings next to presentational twins; features importing nav buttons from unrelated feature folders; hanging every internal subpart on the feature namespace; encoding visual twins as prop variants on public feature parts.
