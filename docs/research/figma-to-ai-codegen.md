# Research: Figma → AI codegen in Cursor

**Ticket:** [#4](https://github.com/4erkashin/cover-letter-gen/issues/4)  
**Map:** [#1](https://github.com/4erkashin/cover-letter-gen/issues/1)  
**Date:** 2026-07-15  
**Scope:** Primary sources only (Cursor docs, Figma Help / Developer Docs, first-party Figma MCP guide). No third-party blogs or unofficial MCP forks.

## Question

What are the mainstream, high-trust ways to wire Figma into AI-assisted codegen in Cursor (official integrations, MCP, export/screenshot practices), and which approach should this effort teach in map Notes / eventual README?

## Assumptions (this effort)

- Solo developer using **Cursor Agent**.
- Design artifacts already available: Figma file link + PNGs under `.wayfinder/screenshots/` (dashboard + form states, including loading keyframes).
- Destination of the map is a **handoff PRD only** — Figma teaching belongs in Notes / eventual README, not the PRD body.
- Operator **may not** have a Figma **Dev or Full** seat on a paid plan (or Dev Mode–gated desktop tooling). Recommendation must stay usable under that constraint.

---

## Approaches (high-trust / first-party)

### A. Cursor-native images + workspace screenshots (no Figma MCP)

**What it is.** Feed design visuals into Agent via Cursor’s built-in image context — paste/drag into chat, or let Agent read image files from the repo.

**Official Cursor support:**

- Chat/Agent prompting: drag-and-drop an image into the chat input, or paste from clipboard (`Cmd+V`), including screenshots. Cursor documents this as useful for “implementing design mockups.” ([Cursor Docs — Prompting agents](https://cursor.com/docs/agent/prompting))
- Agent file read: reading files “also supports image files (`.png`, `.jpg`, `.gif`, `.webp`, `.svg`) and includes them in the conversation context for analysis by vision-capable models.” ([Cursor Docs — Agent overview](https://cursor.com/docs/agent/overview))
- `@` mentions can attach files/folders from the workspace as context. ([Cursor Docs — Prompting agents](https://cursor.com/docs/agent/prompting))

**Typical practice for this repo:**

1. Point Agent at `@.wayfinder/screenshots/dashboard/...` and `@.wayfinder/screenshots/form/...` (or paste the same PNGs).
2. Keep the Figma URL as a human reference (and for optional MCP later).
3. Prompt for implementation constraints (stack, no Tailwind if required, Reshaped, etc.).

**Pros:** Works with any Figma access level (even view-only / no Dev Mode). Zero MCP setup. Matches assets already checked into `.wayfinder/screenshots/`.  
**Cons:** Vision-only — no structured layout/variables/component tree from Figma. Agent must infer spacing, tokens, and hierarchy from pixels.

---

### B. Official Figma remote MCP server in Cursor (preferred Figma path)

**What it is.** Figma’s hosted MCP endpoint (`https://mcp.figma.com/mcp`) gives Agent tools to pull structured design context (and optionally write back to canvas). Cursor is a supported client. ([Figma Developer Docs — Introduction](https://developers.figma.com/docs/figma-mcp-server/); [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server))

**Setup in Cursor (official):**

1. **Preferred:** In Agent chat, run `/add-plugin figma`. The plugin installs MCP config plus Agent Skills and asset-handling rules. ([Figma Help — Cursor and Figma: Set up the MCP server](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server); [Figma Developer Docs — Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/); [figma/mcp-server-guide README](https://github.com/figma/mcp-server-guide/blob/main/README.md))
2. **Manual:** Add a global MCP server with URL `https://mcp.figma.com/mcp`, then Connect / OAuth. ([same Cursor setup docs](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server); [Cursor Docs — MCP](https://cursor.com/docs/context/mcp))
3. Authenticate via Figma OAuth. ([Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/))

**How codegen is prompted (link-based on remote):**

1. In Figma, Copy link to selection (frame/layer).
2. Paste the URL and ask the client to implement that design.
3. The client does not navigate the URL; it extracts `node-id` for the MCP tools. ([Remote server installation — Example: Get design context](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/); [Guide — Example: Get design context](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server))

**Key tools for design → code** ([Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)):

| Tool | Role |
| --- | --- |
| `get_design_context` | Structured design context for a layer (default output described as React + Tailwind; customize via prompt) |
| `get_screenshot` | PNG of selection for visual fidelity |
| `get_metadata` | Sparse XML outline for large designs before drilling in |
| `get_variable_defs` | Variables/styles (color, spacing, typography) |
| `download_assets` | Export renders / raw source images (remote) |

Figma’s own intro framing: previously, design context for AI was largely “feed an image… or an API response”; MCP aims to supply structured Figma context to agents including Cursor. ([Figma Blog — Introducing our Dev Mode MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/))

**Cursor MCP mechanics:** remote servers use HTTP/SSE with OAuth; MCP can return images as context; tools appear under Available Tools once connected. ([Cursor Docs — MCP](https://cursor.com/docs/context/mcp))

**Access & rate limits (critical for solo / unpaid Dev Mode):**

- **Remote server availability:** “available on all seats and plans.” ([Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server))
- **Usable quotas:** View/Collab seats (any plan) and Starter → **up to 6 tool calls per month**. Dev/Full on Professional → **up to 200/day** (with per-minute caps); higher on Org/Enterprise. ([Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/); echoed in [mcp-server-guide README](https://github.com/figma/mcp-server-guide/blob/main/README.md))
- You can only access files you already have permission to view/edit; use `whoami` to confirm seat/plan. ([Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/))

**Pros:** Official, Cursor-first-class, structured context + optional MCP screenshots/assets, Skills via plugin.  
**Cons:** Without a Dev/Full seat on a paid plan, monthly call budget is effectively a demo. Default `get_design_context` leans React + Tailwind — this assignment prefers **not** using Tailwind, so prompts/rules must translate output. Write-to-canvas / code-to-canvas are out of scope for a “implement the mockup” README lesson and have their own seat notes. ([Get started](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server); [FAQs — Full seat for write outside drafts](https://help.figma.com/hc/en-us/articles/39252411778583-Figma-MCP-server-FAQs))

---

### C. Official Figma desktop MCP server

**What it is.** Local MCP in the Figma desktop app (`http://127.0.0.1:3845/mcp`), enabled from **Dev Mode** sidebar. ([Cursor setup — desktop](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server))

**Access:** “available on a Dev or Full seat for all paid plans.” Figma strongly prefers remote for most users (broader features). ([Guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server); [Introduction](https://developers.figma.com/docs/figma-mcp-server/))

**Selection vs link:** Selection-based prompting works with the **desktop** server; remote requires a link. ([Tools — `get_design_context`](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/))

**Fit for this effort:** Poor as the taught default — needs desktop app + Dev Mode + paid Dev/Full seat. Document as optional only if those are present.

---

### D. Code Connect (enhancer, not a standalone Cursor wiring)

**What it is.** Maps Figma components to real codebase components so MCP codegen reuses your components. ([Code Connect intro](https://developers.figma.com/docs/code-connect/); MCP feature list in [Introduction](https://developers.figma.com/docs/figma-mcp-server/))

**Access:** “Available on a Dev or Full seat on the Organization, and Enterprise plans.” ([Code Connect intro](https://developers.figma.com/docs/code-connect/))

**Fit for this effort:** Out of scope for teaching a greenfield test-assignment README. Mention only as “enterprise design-system upgrade,” not the path to follow here.

---

### E. Export practices that still matter (even with MCP)

From Figma’s MCP best practices ([mcp-server-guide README](https://github.com/figma/mcp-server-guide/blob/main/README.md)):

- Prefer components, variables, semantic layer names, Auto layout.
- Break large frames into smaller selections.
- Pair structured context with screenshots (`get_screenshot`) for fidelity.
- Add client rules so Agent translates Figma’s React+Tailwind-shaped output into **this** project’s conventions.

For non-MCP work, the equivalent is: keep curated PNGs (already done), name them by screen/state, and attach the relevant subset per Agent turn.

---

## Comparison (for this map)

| Approach | Official? | Needs Dev/Full paid seat for real use? | Structured tokens/layout? | Fits existing screenshots + Figma link? |
| --- | --- | --- | --- | --- |
| A. Cursor images / `@` PNGs | Yes (Cursor) | No | No (vision) | **Best match** |
| B. Figma remote MCP + `/add-plugin figma` | Yes (Figma + Cursor) | Effectively **yes** for real work (else ~6 calls/mo) | Yes | Good when seat allows |
| C. Figma desktop MCP | Yes | Yes (+ Dev Mode + desktop app) | Yes | Weak default |
| D. Code Connect | Yes | Org/Enterprise Dev/Full | Improves B | Overkill |

---

## Recommendation (what THIS effort should teach)

**Teach a two-tier workflow in map Notes / eventual README — with A as the default and B as an optional upgrade.**

### Default (always teach): Screenshot-first in Cursor Agent

1. Use the PNGs in `.wayfinder/screenshots/` (and/or paste them into chat).
2. `@`-mention the specific state images for the screen being built.
3. Keep the Figma file URL in the README as the source of truth for exploration/prototype; do not require MCP to start implementing.
4. For the generation animation, use the existing loading start/end keyframe screenshots (and the Figma prototype link only as optional visual reference).

**Why this is the default for this effort:** Cursor officially supports image mockup workflows; assets are already local; it does not depend on Dev Mode or a Dev/Full seat. The map’s destination is a PRD + teaching notes, not an MCP ops guide.

### Optional upgrade (teach briefly, with seat caveats): Official Figma remote MCP

1. `/add-plugin figma` → Connect / OAuth. ([Cursor + Figma setup](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server))
2. Copy link to a frame → “Implement this design; use Reshaped / no Tailwind; match project structure.”
3. Expect Agent to use `get_design_context` + `get_screenshot` (and translate away from Tailwind). ([Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/))
4. **Hard caveat in Notes/README:** Without a **Dev or Full** seat on Professional+, Starter/View/Collab quotas are **≤6 MCP read tool calls per month** — not enough for a multi-screen build. ([Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/))

### Explicitly do **not** make the taught default

- Desktop MCP / Dev Mode enablement path.
- Code Connect.
- Write-to-canvas / generate-from-live-UI (wrong direction for implementing a given assignment mockup).
- Unofficial third-party “Talk to Figma” MCP servers (outside primary-source trust bar).

### Suggested Notes / README blurb (gist)

> Implement UI from the checked-in screenshots in Cursor (paste or `@` image files). Optionally, if you have a Figma Dev/Full seat on a paid plan, install Figma’s official Cursor plugin (`/add-plugin figma`) and paste frame links so Agent can call the remote Figma MCP for structured context — otherwise stay on screenshots.

---

## Sources

1. [Cursor Docs — Prompting agents](https://cursor.com/docs/agent/prompting) — image paste/drag for design mockups; `@` files  
2. [Cursor Docs — Agent overview](https://cursor.com/docs/agent/overview) — Agent reads image files into context  
3. [Cursor Docs — Model Context Protocol](https://cursor.com/docs/context/mcp) — MCP transports, OAuth, images-from-tools  
4. [Figma Developer Docs — Figma MCP server introduction](https://developers.figma.com/docs/figma-mcp-server/)  
5. [Figma Developer Docs — Remote server installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) — Cursor `/add-plugin figma`, link-based context  
6. [Figma Developer Docs — Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)  
7. [Figma Developer Docs — Rate limits & access](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)  
8. [Figma Help — Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)  
9. [Figma Help — Cursor and Figma: Set up the MCP server](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server)  
10. [Figma Help — Get started with the Figma MCP server](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server)  
11. [Figma Help — Figma MCP server FAQs](https://help.figma.com/hc/en-us/articles/39252411778583-Figma-MCP-server-FAQs)  
12. [figma/mcp-server-guide README](https://github.com/figma/mcp-server-guide/blob/main/README.md) — Cursor plugin, rate-limit note, prompting best practices  
13. [Figma Blog — Introducing our Dev Mode MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/) — first-party product framing  
14. [Figma Developer Docs — Code Connect](https://developers.figma.com/docs/code-connect/) — Org/Enterprise availability  
