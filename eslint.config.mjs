import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";

/**
 * Absolute path to a top-level layer directory (`ui`, `features`, `domain`).
 * `import/no-restricted-paths` resolves relative zone paths against the cwd, so
 * `"./ui"` would silently match nothing whenever eslint runs from anywhere but
 * the repo root. Anchoring to this file keeps the zones enforced regardless.
 */
const absoluteLayerPath = (dir) => path.join(import.meta.dirname, dir);

// Decisions ESLint can enforce, so review does not have to.
const adrRules = {
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      /**
       * Keeps `typeof import("…")` legal
       * Vitest mocks need it to name the whole module they partially replace
       * see ADR-0001 for more details.
       */

      disallowTypeAnnotations: false,
      fixStyle: "inline-type-imports",
    },
  ],
  /**
   * Stops anything under `ui/` importing from `features/` or `domain/`
   * `ui/` is generic chrome; whatever knows about Cover Letters or Goals is a
   * feature, and `app/` is where the two get composed
   * Every import is followed to the file it actually lands on,
   * so a relative `../features/goal` cannot sneak past either
   * see ADR-0008 for more details.
   */
  "import/no-restricted-paths": [
    "error",
    {
      zones: [
        {
          from: absoluteLayerPath("features"),
          message:
            "ui/ must not import features (ADR-0003). Compose feature chrome at the app/ call site instead.",
          target: absoluteLayerPath("ui"),
        },
        {
          from: absoluteLayerPath("domain"),
          message:
            "ui/ must not import domain (ADR-0003). Keep Cover Letter / Goal vocabulary out of ui/.",
          target: absoluteLayerPath("ui"),
        },
      ],
    },
  ],
  "no-restricted-imports": [
    "error",
    {
      paths: [
        {
          // see ADR-0009 for more details.
          importNames: ["Skeleton"],
          message:
            "Import Skeleton from @/ui/skeleton (ADR-0009). SkeletonProps from reshaped is fine.",
          name: "reshaped",
        },
      ],
    },
  ],
  // ADR-0010 — JSX className: use classNames from reshaped, not array/join slop.
  "no-restricted-syntax": [
    "error",
    {
      message:
        "Use classNames(...) from reshaped for multi-part className (ADR-0010).",
      selector:
        "JSXAttribute[name.name='className'] > JSXExpressionContainer > ArrayExpression",
    },
    {
      message:
        "Use classNames(...) from reshaped instead of .join on className (ADR-0010).",
      selector:
        "JSXAttribute[name.name='className'] > JSXExpressionContainer > CallExpression[callee.property.name='join']",
    },
    {
      // see ADR-0006 for more details.
      message:
        "Use LinkButton from @/ui/link-button for in-app nav (ADR-0006). For a deliberate full navigation, disable this rule inline with a reason.",
      selector:
        "JSXOpeningElement[name.name='Button'] > JSXAttribute[name.name='href']",
    },
  ],
};

const sortingRules = {
  "perfectionist/sort-imports": [
    "error",
    {
      // see ADR-0001 for more details.
      customGroups: [
        {
          elementNamePattern: "\\.svg$",
          groupName: "svg",
        },
      ],
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        "svg",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "ts-equals-import",
        "unknown",
        ["side-effect-style", "side-effect"],
      ],
      order: "asc",
      type: "natural",
    },
  ],
  "perfectionist/sort-modules": [
    "error",
    {
      groups: [
        "declare-enum",
        "export-enum",
        "enum",
        ["declare-interface", "declare-type"],
        ["export-interface", "export-type"],
        ["interface", "type"],
        "declare-class",
        "class",
        "export-class",
        { group: "function", type: "unsorted" },
      ],
      order: "asc",
      type: "natural",
    },
  ],
  "perfectionist/sort-union-types": [
    "error",
    {
      groups: ["named", "nullish"],
    },
  ],
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  perfectionist.configs["recommended-natural"],
  { rules: { ...adrRules, ...sortingRules } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Skill / agent tooling — not app code
    ".agents/**",
  ]),
  eslintConfigPrettier,
]);

export default eslintConfig;
