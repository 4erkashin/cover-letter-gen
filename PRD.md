# PRD: Cover-letter generator app

## Summary

Cover-letter generator app. Users can list, create, and edit Cover Letters; missing Cover Letters and unknown routes get clear error pages. Generation must show a status animation. Data lives in the browser and stays in sync across tabs. AI runs through the AI SDK (`generateText`) and Server Actions, with a Reshaped UI.

Domain language: **Cover Letter** (see `CONTEXT.md`). UI copy may say “application(s)” per mock — that is presentation only, not a second entity.

**Goal** = distinct saved Cover Letters (list length); target `GOAL_TARGET`. Banner while `n < GOAL_TARGET`. **Try Again** overwrites the same id and does **not** +1 the goal.

Product constants (numeric source of truth in code — do not restate literals here): `GOAL_TARGET` (`domain/cover-letters.ts`), `ADDITIONAL_DETAILS_MAX` (`features/letter-form/constants.ts`).
Example: when those equal 5 and 1200, UI shows `3/5 applications generated`, `3 out of 5`, `0/1200`.

## Scope / non-goals

### In scope

- Next.js app with Reshaped; routes and behaviors below
- Client persistence (Nanostores-style `localStorage` + cross-tab sync)
- Cheap/fast Flash-class model, swappable; streaming **not** required, loading animation used instead
- Mobile: single-column adaptation of the same screens
- Brand: Alt+Shift

### Post-PRD delivery obligations (implement / ship; not blocking this PRD)

- Decision Log in README
- README AI-workflow blurb (tools / where AI helped / what was finished by hand)
- Deploy demo link (e.g. Vercel)

Tracked separately: [Ship obligations (README Decision Log, AI workflow, deploy)](https://github.com/4erkashin/cover-letter-gen/issues/20).

### Non-goals

- Custom design system instead of Reshaped
- Renaming the domain concept to Application
- Streaming token UI as the generation animation

## Screens & navigation

| Screen    | Path    |
| --------- | ------- |
| Dashboard | `/`     |
| Create    | `/new`  |
| Edit      | `/[id]` |

### Navigation rules

- **List card** body → `/[id]`; **Delete** / **Copy** do not navigate
- **Header Home** → `/` from every screen
- **Brand / logo** → `/` when not on dashboard; on `/`, activate opens the **Brand console** (author easter egg — see below); tabbable on dashboard
- **Every + Create New / Hit your goal CTA** (dashboard header, dashboard banner, edit banner) → `/new`
- **Successful Generate Now** on create → **`replace`** to `/[id]` (Back does not reopen empty create)
- **Create generation failure** → stay on `/new`; keep form; write nothing
- **Try Again** on edit → stay on `/[id]`; overwrite in place; URL unchanged

#### Brand console (easter egg)

- **Open:** activate Brand / logo **only on** `/` (dashboard). Elsewhere Brand still navigates to `/`. Rationale: mock has Brand (left) and Home (right); on dashboard Brand would otherwise be idle.
- **v1 contents:**
  - Color mode: **System / Light / Dark** (persist + cross-tab; System follows `prefers-color-scheme` — port/adapt from v2 Reshaped wiring)
  - AI Gateway credits: **remaining balance** + **total used** via `getCredits` (env key; fetch when console opens)
- **Deferred bonus** (after core polish):
  - Browser-local API key override (fall back to `AI_GATEWAY_API_KEY`)
  - Model picker **only** when a user-provided key is active — env-key users stay on the fixed Flash-class model (no burning author gateway balance on expensive models)

### Error screens

- Missing / deleted `/[id]` → informed **not-found** (brand + Home chrome); primary CTA → `/`; **no** silent redirect
- Any path outside `/`, `/new`, `/[id]` → shared **unknown-route 404** (same pattern)
- Generation failures remain in-place toast/alert (not separate routes)

## UI states checklist

<!-- prettier-ignore -->
1. **Dashboard / goal in progress** — H1 **Applications**, **+ Create New**, cards (Delete + Copy), `{n}/{GOAL_TARGET} applications generated` + `GOAL_TARGET`-dot header, **Hit your goal** banner (segments + `{n} out of {GOAL_TARGET}`)
2. **Dashboard / goal achieved** — `{GOAL_TARGET}/{GOAL_TARGET}` + green check, **no** banner; Create New remains
3. **Create / empty** — **New application**, four fields, `0/{ADDITIONAL_DETAILS_MAX}` + placeholder, muted Generate Now, empty preview
4. **Create / filled** — dynamic `{Job title}, {Company}` title, live counter &lt;`ADDITIONAL_DETAILS_MAX`, green Generate Now
5. **Create / validation** — red Additional details + red `&gt;{ADDITIONAL_DETAILS_MAX}/{ADDITIONAL_DETAILS_MAX}`, Generate Now disabled
6–7. **Loading (in flight)** — button spinner replaces Generate Now / Try Again; preview uses **sample Preloader** (see Generation). Figma `loading-*-keyframe` PNGs are **mood/reference only** — not morph acceptance
8. **Edit / in progress** — Try Again + letter preview + Hit-your-goal banner
9. **Edit / achieved** — Try Again + preview + check header, **no** banner

### Cross-cutting mock fidelity

- Alt+Shift chrome (wordmark + mark)
- Fields: **Job title**, **Company**, **I am good at…**, **Additional details** (max `ADDITIONAL_DETAILS_MAX`); counter format `{current}/{ADDITIONAL_DETAILS_MAX}`; over-limit red chrome
- Additional details empty placeholder: **Describe why you are a great fit or paste your bio**
- Preview empty: **Your personalized job application will appear here...**
- Header ↔ banner synced to **one** list-length `n` (ignore Figma stubs where counts disagree or counter shows `0/{ADDITIONAL_DETAILS_MAX}` with text present)
- Banner copy when shown: heading **Hit your goal**; subcopy **Generate and send out couple more job applications today to get hired faster** (exact phrasing); CTA **+ Create New**; meter `{n} out of {GOAL_TARGET}`

## Goal, banner & persistence

- Goal target = `GOAL_TARGET` distinct saved Cover Letters; progress = **list length**
- Banner visible while `n < GOAL_TARGET`; **absent** at `n ≥ GOAL_TARGET`
- **Try Again** does not increment goal
- Field edits on edit are local until regenerate; **leave discards** unsaved field edits
- **Delete**: instant + undo toast
- Browser persistence with **cross-tab sync** (v2-informed Nanostores `localStorage` pattern)

---

## Generation

### AI

- AI SDK Server Action + `generateText`
- Model: cheap/fast Flash-class; **swappable**
- No streaming required for v1 animation
- **Prompts stay server-side (author preference, not a pdf.net brief requirement):** treat generation prompts (system prompt, composition helpers, templates) as valuable prompt text that should not be readable from the browser via client sources (DevTools / View Source / client JS bundle). They may still live in the git repo. Enforce with Next `server-only` (and/or Server Actions / Route Handlers only) — never import prompt modules from Client Components. Rationale: [`docs/adr/0002-prompts-stay-server-side.md`](./docs/adr/0002-prompts-stay-server-side.md)

### Loading animation (create **and** Try Again)

**In flight**

- Form stays on screen (not a full-page spinner)
- Primary button: label replaced by white spinner on green control; accessible name e.g. `aria-label="Generating…"`
- Preview: sample-style **Preloader** — fixed ~160×160 soft white/blurred sphere, `1s ease-in-out` infinite alternate bounce (`translateY` 0→16px, opacity 1→0.48).

**Success**

- Letter reveal: opacity + slight rise, ~**320ms ease-out**

**Failure**

- Stop animation; keep form; announced error toast/alert
- Create failure: write nothing
- Edit failure: keep last-good preview

**Accessibility (all required)**

1. `prefers-reduced-motion: reduce` — no bounce, no letter rise/fade; preview shows **Generating…**; button still busy
2. Button accessible name while spinner replaces label; restore Generate Now / Try Again when idle
3. Preview `aria-busy="true"` while generating; labeled region (e.g. “Generated letter preview”)
4. `aria-live` (polite) — announce start, success, failure
5. Failure announced as above

---

## Design system & folder layout

Reshaped + prescribed folders:

`app/` · `domain/` · `features/` · `ui/`

Thin `ui/` wrappers only where assignment-specific (e.g. `CharCounter`, CTA modes, `CopyButton`, `CreateNewButton`) — not a full Reshaped facade.

Entity patterns: `Letter*` (`LetterCard`, `LetterForm`, `LetterPreview`, …)

## Edge cases & locked copy

### Empty dashboard (list area; banner still follows `n < GOAL_TARGET`)

| Slot       | Copy                                                       |
| ---------- | ---------------------------------------------------------- |
| Headline   | **No applications yet**                                    |
| Supporting | **Create your first one and it will show up here.**        |
| CTA        | **Create New** (same plus-icon control as header / banner) |

### Error screens

| Screen                 | Headline                        | Supporting                                                    | CTA            |
| ---------------------- | ------------------------------- | ------------------------------------------------------------- | -------------- |
| Cover Letter not-found | **This application isn't here** | **It may have been removed, or the link may be out of date.** | **Home** → `/` |
| Unknown-route 404      | **This page isn't here**        | **The address may be mistyped, or the page may have moved.**  | **Home** → `/` |

### Other edge cases

- Gen failure: create writes nothing; edit keeps last-good preview
- Delete + undo toast
- Leave discards unsaved field edits
- No silent redirect on missing id / unknown route

---

## References & linked assets

| Asset               | Location                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| Domain              | `CONTEXT.md`                                                                                           |
| Figma               | [Test Assignment](https://www.figma.com/design/pDG3us59WwezyhA11akWbL/Test-Assignment?node-id=4-12036) |
| Animation prototype | [Test Assignment](https://www.figma.com/proto/pDG3us59WwezyhA11akWbL/Test-Assignment)                  |

## Acceptance mapping

| Criterion                               | Points at                                        | Concrete checks                                                                                                                                                                           |
| --------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consistency with the mockup             | UI states checklist; Screens & navigation        | Nine named states; synced header/banner `n`; field labels/limits/`current/{ADDITIONAL_DETAILS_MAX}` + red over-limit                                                                      |
| Understanding of design                 | Design system; Edge cases & locked copy          | Named patterns inventory used (not one-off screens); empty + both 404 copy locked                                                                                                         |
| Quality of the design system            | Design system & folder layout                    | Reshaped + prescribed `app/`·`domain/`·`features/`·`ui/`; thin wrappers only where assignment-specific                                                                                    |
| Quality of layout and responsiveness    | Screens; Scope (mobile discretion)               | Desktop matches mock compositions; single-column mobile adaptation present (exact breakpoints discretionary)                                                                              |
| Project structure                       | Design system & folder layout                    | Exact four-folder layout; `Letter*` entity patterns vs chrome names as locked                                                                                                             |
| Understanding of React / best practices | Generation; Goal & persistence; Design system    | Server Action + AI SDK `generateText`; prompts server-only (`server-only` / no Client Component import); client persistence with cross-tab sync; feature compositions own screen behavior |
| Code readability                        | Design system; References                        | Pattern names match PRD inventory; decisions traceable via linked tickets/assets                                                                                                          |
| Code scalability                        | Design system; Generation                        | Domain in `domain/`; swappable Flash-class model; UI patterns reusable across create/edit                                                                                                 |
| Handling of edge cases                  | Edge cases & locked copy; Generation             | Gen failure (create writes nothing / edit keeps last-good); delete+undo; not-found + unknown-route 404 (no silent redirect); leave discards unsaved edits                                 |
| Attention to detail                     | UI states; Generation animation; Edge cases      | Loading: Preloader + button spinner + ~320ms letter reveal + a11y; exact locked copy strings; banner absent at ≥`GOAL_TARGET`                                                             |
| Product solutions                       | Goal & persistence; Scope (delivery obligations) | Goal = list length, Try Again no +1; banner while &lt;`GOAL_TARGET`; calm empty state; README Decision Log + AI workflow + deploy called out as post-PRD obligations                      |
