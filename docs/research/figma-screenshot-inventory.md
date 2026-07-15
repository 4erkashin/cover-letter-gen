# Figma / screenshot UI inventory for PRD fidelity

**Question:** What visual and interaction states from the Figma file and `.wayfinder/screenshots` must the PRD explicitly require so “consistency with the mockup” is testable (fields, counters, goal header/banner variants, validation, loading keyframes)?

**Primary sources:** `.wayfinder/screenshots/**` (inspected). Figma [`Test-Assignment` / node `4-12036`](https://www.figma.com/design/pDG3us59WwezyhA11akWbL/Test-Assignment?node-id=4-12036) was not readable without auth in this session — screenshots win for UI facts.

**Supporting (field names / limits only):** v2 `features/letters/schema.ts` (`ADDITIONAL_DETAILS_MAX = 1200`; required `jobTitle`, `companyName`, `skills`, `additionalDetails`). Screenshots override if they conflict.

**Standing prefs (do not contradict):** Cover Letter domain / UI may say “Applications”; goal = list length; three screens dashboard / create / edit; Reshaped; Alt+Shift brand. Map #1: banner while count &lt; 5; Try Again does not increment goal.

---

## How to use this checklist

Each row is something the PRD should **mandate by name** so QA can pass/fail “matches mockup.” Cite the screenshot filename as the acceptance source.

---

## Cross-cutting (all screens)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Brand | Alt+Shift wordmark + green circular swirl mark, top-left | all screenshots |
| Goal header (in progress) | Copy `{n}/5 applications generated` + **5-dot** meter (filled = current count, unfilled = remainder) + home control | `dashboard/goal-in-progress.png`, `form/empty.png`, `form/filled.png`, `form/validation-error.png`, `form/edit-goal-in-progress.png`, `form/loading-*.png` |
| Goal header (achieved) | Copy `5/5 applications generated` + **green check badge** (replaces 5-dot meter) + home control | `dashboard/goal-achieved.png`, `form/edit-goal-achieved.png` |
| Goal definition | Progress reflects **number of saved Cover Letters in the list** (UI string “applications”); target **5** | all goal-bearing shots; aligns with map #1 |
| Home control | Square outline button with house icon (navigates to dashboard) | all form + dashboard shots |
| Design system | Reshaped-style controls: rounded inputs, green primary actions, light-grey preview wells | all screenshots |

---

## Screen: Dashboard (“Applications”)

### Shared chrome

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Page title | H1 **Applications** | `dashboard/goal-in-progress.png`, `dashboard/goal-achieved.png` |
| Primary create CTA | Dark green **+ Create New** beside the H1 | both dashboard shots |
| Letter cards | Soft grey rounded cards; truncated letter preview (~3–4 lines, fade/clip); footer **Delete** (trash) left + **Copy to clipboard** (copy icon) right | both dashboard shots |
| Layout | Multi-card grid (mock shows ~2 columns on desktop) | both dashboard shots |

### State: Goal in progress (`n < 5`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Header meter | e.g. `3/5 applications generated` + 3 filled / 2 empty dots | `dashboard/goal-in-progress.png` |
| Bottom goal banner | Light-green full-width panel **present** | `dashboard/goal-in-progress.png` |
| Banner copy | Heading **Hit your goal**; subcopy **Generate and send out couple more job applications today to get hired faster** (exact Figma phrasing, including “couple more”) | `dashboard/goal-in-progress.png` |
| Banner CTA | Centered dark green **+ Create New** | `dashboard/goal-in-progress.png` |
| Banner meter | **5 segment bars** + text **`{n} out of 5`** (e.g. `3 out of 5`) matching count | `dashboard/goal-in-progress.png` |

### State: Goal achieved (`n ≥ 5`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Header success | `5/5 applications generated` + green check badge (no 5-dot meter) | `dashboard/goal-achieved.png` |
| Bottom banner | **Absent** — no “Hit your goal” panel when achieved | `dashboard/goal-achieved.png` (contrast with in-progress) |
| Create still available | **+ Create New** remains in the page header | `dashboard/goal-achieved.png` |

### Not shown in screenshots (PRD should still name if map requires)

Empty dashboard composition, delete undo toast, copy success feedback — **not** evidenced in these PNGs; leave to map prefs / separate research, do not invent from these files.

---

## Screen: Create / form (split: fields left, preview right)

### Shared form chrome

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Fields (labels) | **Job title**; **Company**; **I am good at…**; **Additional details** (textarea) | `form/empty.png`, `form/filled.png`, `form/validation-error.png`, edit + loading shots |
| Job title + Company layout | Side-by-side on one row when width allows | loading + edit shots |
| Additional details placeholder | **Describe why you are a great fit or paste your bio** when empty | `form/empty.png` |
| Character counter | Format **`{current}/1200`** under Additional details (left) | `form/empty.png` (`0/1200`), `form/filled.png` (`123/1200`), `form/validation-error.png` (`1290/1200`) |
| Preview well | Light-grey rounded pane; empty copy **Your personalized job application will appear here...** | empty / filled / validation |
| Preview copy action | **Copy to clipboard** + icon at bottom-right of preview (visible even before generation; inactive/placeholder until content exists) | empty / filled / validation |
| Primary submit (create) | Full-width **Generate Now** | empty / filled / validation / loading |

### State: Empty / incomplete create (`form/empty.png`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Page title | H1 **New application** (not yet the dynamic job/company title) | `form/empty.png` |
| Counter | `0/1200` with placeholder in Additional details | `form/empty.png` |
| Generate Now | **Disabled / muted grey** (not primary green) while form incomplete/invalid | `form/empty.png` |
| Preview | Placeholder text; no letter body | `form/empty.png` |

### State: Filled / valid create (`form/filled.png`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Dynamic title | H1 **`{Job title}, {Company}`** (e.g. `Product manager, Apple`) once create form is filled enough to leave the “New application” title | `form/filled.png` (vs `form/empty.png`) |
| Focus / active field | Additional details can show brand-green focus border while editing | `form/filled.png` |
| Counter | Live count under limit (e.g. `123/1200`) | `form/filled.png` |
| Generate Now | **Enabled primary green** | `form/filled.png` |
| Preview | Still empty placeholder until generation completes | `form/filled.png` |

### State: Validation error — over character limit (`form/validation-error.png`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Limit | Additional details max **1200** characters | counter in shot; v2 `ADDITIONAL_DETAILS_MAX` |
| Error chrome | Textarea **light-red fill + red border** | `form/validation-error.png` |
| Error counter | Counter turns **red** and can exceed max (e.g. `1290/1200`) — over-limit is shown inline via counter, not a separate string message in the mock | `form/validation-error.png` |
| Generate Now | Remains **disabled / muted** while over limit | `form/validation-error.png` |
| Title | Still dynamic `{Job title}, {Company}` when those fields are set | `form/validation-error.png` |

**PRD testability note:** Require “submit blocked when `additionalDetails.length > 1200`” and “error styling matches mock,” not only “validation exists.”

---

## Screen: Edit / result (generated letter present)

### Shared edit chrome

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Title | Dynamic **`{Job title}, {Company}`** | `form/edit-goal-in-progress.png`, `form/edit-goal-achieved.png` |
| Same four fields | Editable after generation | both edit shots |
| Primary action | Full-width outline/secondary button: refresh icon + **Try Again** (not “Generate Now”) | both edit shots |
| Preview | Generated letter body visible in the grey well | both edit shots |
| Copy | **Copy to clipboard** on the preview | both edit shots |

### State: Edit + goal in progress (`form/edit-goal-in-progress.png`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Header | In-progress variant (`{n}/5` + dots), e.g. `4/5` | `form/edit-goal-in-progress.png` |
| Bottom banner | **Hit your goal** panel **present** (same family as dashboard: heading, subcopy, **+ Create New**, segment meter + `{n} out of 5`) | `form/edit-goal-in-progress.png` |

**Mock inconsistency (call out in PRD):** header shows `4/5` (4 dots) while banner shows `3 out of 5` (3 segments). PRD should require **a single source of truth** (list length) so header and banner never disagree — treat the dual numbers as a Figma artifact, not a product rule.

### State: Edit + goal achieved (`form/edit-goal-achieved.png`)

| Required element | Must-have details | Sources |
| --- | --- | --- |
| Header | Achieved variant: `5/5 applications generated` + green check | `form/edit-goal-achieved.png` |
| Bottom banner | **Absent** when goal achieved | `form/edit-goal-achieved.png` |
| Try Again | Still available (regenerate / overwrite; does **not** increment goal — map #1) | `form/edit-goal-achieved.png` |

---

## Loading / generation animation (create flow)

Both keyframes share: form still visible with values; **Generate Now** replaced by **primary green button containing a white spinner** (no label); preview well shows a **soft white orb / blob** animation instead of placeholder text or letter.

| Keyframe | Required visual | Sources |
| --- | --- | --- |
| Starting | Compact / early orb in preview center + button spinner | `form/loading-starting-keyframe.png` |
| Ending | Larger / expanded orb (same family) + button spinner still present | `form/loading-ending-keyframe.png` |

**PRD must mandate:**

1. A **required** generation-status animation (not optional polish).
2. At least these **two named keyframes** (start → end orb morph) while the request is in flight.
3. **Button loading affordance:** spinner replaces “Generate Now” label on the primary control.
4. **Preview loading affordance:** animated orb in the preview well (not a plain skeleton or spinner-only).
5. Fields remain on screen during loading (form not replaced by a full-page spinner).

Exact motion curve / asset is design implementation; testable bar is “matches starting and ending keyframes in screenshots.”

---

## Field & limit matrix (for PRD tables)

| UI label | Role | Limit / rule evidenced | Sources |
| --- | --- | --- | --- |
| Job title | Required text | Present in all form states; v2 max 120 (supporting) | form shots; v2 schema |
| Company | Required text | Same | form shots; v2 schema |
| I am good at… | Required skills text | Same; v2 max 500 (supporting) | form shots; v2 schema |
| Additional details | Required textarea | **Hard visual max 1200**; over-limit red UI; empty shows placeholder | `form/empty.png`, `form/filled.png`, `form/validation-error.png`; v2 `ADDITIONAL_DETAILS_MAX` |

**Counter fidelity:** Live screenshots that show `0/1200` while the textarea contains text (`edit-*`, `loading-*`) are treated as **static Figma stubs**, not desired runtime behavior. PRD should require the counter to reflect the actual character length (as in `filled` / `validation-error`).

---

## Goal header vs banner matrix (test table)

| List length | Header | Dashboard / edit bottom banner | Sources |
| --- | --- | --- | --- |
| `0 ≤ n < 5` | `{n}/5 applications generated` + 5-dot meter | **Show** “Hit your goal” + segments + `{n} out of 5` + Create New | `dashboard/goal-in-progress.png`, `form/edit-goal-in-progress.png` |
| `n ≥ 5` | `5/5 applications generated` + green check | **Hide** banner | `dashboard/goal-achieved.png`, `form/edit-goal-achieved.png` |

Header and banner must stay synchronized to the same `n`.

---

## Screen × state checklist (PRD acceptance outline)

- [ ] **Dashboard / goal in progress** — Applications H1, Create New, cards with Delete + Copy, header dots, Hit-your-goal banner with segments + “n out of 5”
- [ ] **Dashboard / goal achieved** — header check, **no** banner, cards + Create New remain
- [ ] **Create / empty** — “New application”, four fields, `0/1200` + placeholder, muted Generate Now, preview placeholder + Copy
- [ ] **Create / filled** — dynamic “Job, Company” title, live counter under 1200, green Generate Now, empty preview
- [ ] **Create / validation over-limit** — red textarea + red `>1200/1200` counter, Generate Now disabled
- [ ] **Create / loading start** — button spinner, preview orb (start keyframe)
- [ ] **Create / loading end** — button spinner, preview orb (end keyframe)
- [ ] **Edit / goal in progress** — Try Again, letter preview, header in-progress, Hit-your-goal banner
- [ ] **Edit / goal achieved** — Try Again, letter preview, header check, **no** banner

---

## Gaps / non-evidence (do not invent from these PNGs)

- Empty dashboard (zero letters)
- Mobile single-column layout
- Delete confirmation vs instant delete + undo toast
- Copy-success / error toasts
- Generation **failure** UI
- Exact Figma component tokens beyond what pixels show

---

## Answer (gist)

The PRD must name **nine screenshot-backed states** across three screens: dashboard goal in-progress vs achieved; create empty, filled, validation-over-1200, and loading start/end keyframes; edit with banner vs edit with check-and-no-banner. Mandatories: Alt+Shift chrome; `{n}/5 applications generated` with **dots vs green check**; **Hit your goal** banner only while `n < 5`; four fields with **Additional details `current/1200`** and red over-limit; **Generate Now** vs **Try Again**; preview placeholder vs letter vs **orb loading animation** with **button spinner**. Treat header/banner count mismatches and `0/1200`-with-text stubs as Figma artifacts — require one synchronized list-length goal and a live counter.
