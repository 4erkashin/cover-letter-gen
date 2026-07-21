# Cover Letter Gen (v3)

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

## Getting started

```bash
pnpm install
cp .env.example .env.local   # set AI_GATEWAY_API_KEY
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts: `pnpm lint` · `pnpm typecheck` · `pnpm test`

## Layout

| Folder | Role |
| --- | --- |
| `app/` | Routes and thin page wiring |
| `domain/` | Cover Letter domain |
| `features/` | Screen/feature compositions |
| `ui/` | Reusable UI patterns |

## Related issues

Open work that owns README sections **not** filled here yet:

- [Ship obligations (README Decision Log, AI workflow, deploy)](https://github.com/4erkashin/cover-letter-gen/issues/20)
- [Map: Bring v3 codebase to order](https://github.com/4erkashin/cover-letter-gen/issues/21)
- [Add Prettier (format script + config)](https://github.com/4erkashin/cover-letter-gen/issues/28)
