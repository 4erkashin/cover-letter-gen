# ESLint sorts almost everything; a few rules stay opinionated on purpose

We use `eslint-plugin-perfectionist`’s full **`recommended-natural`** preset (latest), plus a few overrides we care about. Sorting is meant to be **autofixable** and boring on save — if the editor fixes it, churn is fine.

Prettier still owns formatting (spaces, wrapping, etc.). Perfectionist owns **order**. `eslint-config-prettier` keeps those from fighting.

## What we override (and why)

### 1. Module members — types sorted, functions stay put

`perfectionist/sort-modules`: keep the usual kind order (enums → types/interfaces → classes → functions), but **do not alphabetize functions**. Leave them in the order we wrote them.

Helpers are often in “story order” (`parse` → `validate` → `save`). Alphabetizing scatters related functions and turns renames into noisy diffs.

### 2. Union types — real types first, nullish last

`perfectionist/sort-union-types` with `groups: ["named", "nullish"]`.

Prefer:

```ts
type Result = User | null;
```

not:

```ts
type Result = null | User;
```

You read the meaningful type first; `null` / `undefined` trail as “maybe missing.”

### 3. Type-only imports — inline `type`

`@typescript-eslint/consistent-type-imports` with `fixStyle: "inline-type-imports"`.

Prefer:

```ts
import { type User, loadUser } from "./user";
```

not a separate `import type` line for the same module. One import per module; types tagged inline.

Vitest mocks may still use `typeof import("…")` — we leave `disallowTypeAnnotations` off so those stay legal.

### 4. SVG imports — after other `@/` imports

`perfectionist/sort-imports` `customGroups` matching `\.svg$`, placed below `value-internal` (blank line between).

Pure taste: path sort dropped default SVG icon imports in the middle of named `@/` imports. Trailing `.svg` keeps the named block contiguous. Not a general default-vs-named split — only file extension.

## What we deliberately did _not_ do

- **Allowlist-only sorting** (imports + the two custom rules): rejected — we like broad autofix sorting, not a minimal slice.
- **Dropping perfectionist**: rejected — the plugin is maintained; typescript-eslint even points union sorting at it. Frustration was “why is this configured weird?”, not “dead tool.”
- **Default-vs-named import groups**: rejected as the rule — brace style was a proxy for icons; `.svg` is the real signal.
- Putting this in `CONTEXT.md`: that’s product language (Cover Letter, Goal). Lint prefs live here.

## Consequences

- Expect reorder diffs until on-save ESLint autofix is comfortable; that’s intended. Workspace setting: `.vscode/settings.json` runs ESLint fix on save.
- Don’t “simplify away” unsorted functions, named-then-nullish, or trailing SVGs without revisiting this ADR — those look random in config without this note.
