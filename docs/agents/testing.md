# Testing

Default for agents: **do not add tests** unless they clear the keep bar below. Low-value tests cost more in review and churn than they catch.

## Keep bar

Write or keep a test only when at least one is true:

1. **User asked / seam agreed** — an explicit request, or seams confirmed before writing (see the `tdd` skill).
2. **Duplicated truth that can drift** — the same fact must stay in sync across files (e.g. theme hex ↔ `app/icon.svg`, font CSS variable literal ↔ exported const). Prefer these over hoping someone notices.
3. **Non-obvious pure logic** with an **independent** expected value (worked example / known literal), not a tautology that recomputes the implementation.

Canonical keepers today: `ui/__tests__/icon-brand-colors.test.ts`, `ui/__tests__/fontel-font-vars.test.ts`, `lib/__tests__/escape-reg-exp.test.ts`.

## Do not write

- Asserting a CSS module className is present, a `data-testid` exists, or a wrapper “renders”
- Snapshot / markup counts that lock presentation wiring (`querySelectorAll` on decorative nodes)
- Tests that only restate the code under test
- “Coverage” tests for thin UI chrome with no non-obvious behavior

When unsure: **skip the test** and note the risk in the PR/issue instead of inventing one.
