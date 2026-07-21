# Generation prompts stay on the server (author preference)

I treat the cover-letter generation prompts (system prompt, composition helpers, and any prompt templates) as valuable prompt text I do not want every browser visitor to read. They may live in the git repo, but should **not** be reachable from a browser by reading client sources — DevTools, View Source, or the client JS bundle.

This is **my own house rule**, not a requirement from the pdf.net assignment brief. Keep it explicit so future-me and agents do not “simplify” prompts into Client Components.

**Decision:** keep prompts in modules that only Server Actions / other server entrypoints import, guarded with Next’s `server-only` package (or equivalent). Never import prompt modules from Client Components or shared client code.

**Rejected:** client-side `generateText` with prompts colocated next to the form (simpler wire-up, but ships the prompt text to every visitor). Hiding prompts from the public repo (env inject / private package) is out of scope for this assignment.

## Consequences

- `import "server-only"` on prompt modules is intentional, not ceremony — do not drop it without revisiting this note.
- A client import of a prompt module should fail at build time.
- No custom CI bundle-scanner required unless a real leak shows up later.
