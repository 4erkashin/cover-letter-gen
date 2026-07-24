# Owned boolean props use is-/has-/can-/should- prefixes

Bare adjective booleans are easy to invent at a wrapper boundary and then disagree with call-site language. This repo already names owned state with verb prefixes elsewhere.

**Decision:** boolean props, callback parameters, and other **owned** API booleans use a verb prefix — `is*`, `has*`, `can*`, or `should*` — chosen to match the meaning. Design-system and DOM props keep their native names when accepted via root-prop passthrough (ADR-0012). Living exemplars: `features/goal/progress.tsx`, `features/goal/indicator.tsx`. Unreviewed bare adjectives elsewhere are debt until touched, not approved exceptions.

**Rejected:** mirroring Reshaped/HTML bare adjectives for owned props; prefixing only component props while leaving render-prop args bare; freezing a prop-name laundry list in this ADR.
