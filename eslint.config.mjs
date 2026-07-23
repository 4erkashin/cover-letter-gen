import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          // Vitest mocks use `typeof import("…")`; ADR cares about static imports.
          disallowTypeAnnotations: false,
          fixStyle: "inline-type-imports",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              // ADR-0009 — app Skeleton wraps Reshaped motion/tokens.
              importNames: ["Skeleton"],
              message:
                "Import Skeleton from @/ui/skeleton (ADR-0009). SkeletonProps from reshaped is fine.",
              name: "reshaped",
            },
          ],
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
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
    },
  },
  {
    files: ["ui/skeleton/skeleton.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
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
