import eslint from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...nextVitals,
  ...nextTs,
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
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
            { selector: "function", type: "unsorted" },
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
  eslintConfigPrettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
