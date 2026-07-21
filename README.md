# Cover Letter Gen

Greenfield **Alt+Shift** app for creating and managing AI-generated cover letters against a hiring goal.

## Product

The durable product spec lives in **[`PRD.md`](./PRD.md)** — screens, navigation, generation, locked copy, and acceptance mapping.

Domain language: **[`CONTEXT.md`](./CONTEXT.md)** (**Cover Letter**; UI may say “application”).

## Stack

- Next.js (App Router) + React + TypeScript
- Reshaped UI
- AI SDK (`generateText`) via Server Actions
- Nanostores + `localStorage` (cross-tab sync)
- Vitest

**Prompts stay server-side** (author preference, not a pdf.net brief requirement): generation prompt text must not ship in the browser client bundle. See [`docs/adr/0002-prompts-stay-server-side.md`](./docs/adr/0002-prompts-stay-server-side.md) and `PRD.md` → Generation.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # set AI_GATEWAY_API_KEY
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts: `pnpm lint` · `pnpm format` · `pnpm typecheck` · `pnpm test`

ADRs: [`docs/adr/0001-eslint-sorting-and-type-imports.md`](./docs/adr/0001-eslint-sorting-and-type-imports.md) · [`docs/adr/0002-prompts-stay-server-side.md`](./docs/adr/0002-prompts-stay-server-side.md)

## Layout

| Folder      | Role                                                                 |
| ----------- | -------------------------------------------------------------------- |
| `domain/`   | Pure Cover Letter / Goal types and rules — no React, I/O, or UI copy |
| `features/` | User-facing capabilities; own their domain-flavored UI               |
| `ui/`       | Reusable chrome — no Cover Letter / Goal vocabulary in name or props |
| `app/`      | Thin Next.js routes only — wire features, do not host logic          |

`ui/` may also hold shared shell helpers (`assets/`, `themes/`, fonts, globals, Reshaped root) — not a second component tree.

### Fat features

A feature is too fat when its short description needs the word **“and”** (two jobs in one name). Split by capability, not by file type — do not invent `components/` + `lib/` just to tidy. `features/letter-form/` is **watch / maybe-split**, not a mandatory split.

### Prototypes

Delete production leftovers. Do not keep a permanent `app/prototype/` home. Future prototypes stay out of committed `app/` unless a ticket explicitly ships a prototype route.

### Barrels

Keep per-module barrels (`ui/copy-button/index.ts`, `features/letter-form/index.ts`). Import from the owning module — no root grab-bag barrels under `ui/` or `features/`.

## Related issues

Open work that owns README sections **not** filled here yet:

- [Ship obligations (README Decision Log, AI workflow, deploy)](https://github.com/4erkashin/cover-letter-gen/issues/20)
- [Map: Bring codebase to order](https://github.com/4erkashin/cover-letter-gen/issues/21)
