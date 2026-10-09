# AI use

This is the full account the README's AI-use badge points to. Edit it to
match what actually happened in your repository's history — this draft
reflects the conversation that produced the first version of this code and
needs your honest additions as you keep building.

## Assistant

Claude (Anthropic), used through claude.ai.

## What it touched

**Planning documents (`docs/01-proposal.md`, `02-mockup.md`, `03-design-system.md`):**
Drafted close to end-to-end from a description of the app idea and the
course rubrics. (Fill in: did you edit these afterward? How much?)

**Client application code (`client/src/`):** Drafted close to end-to-end —
the API abstraction (`src/api/mockApi.js`, `realApi.js`, `index.js`), every
component in `src/components/`, the four screens in `src/screens/`, and the
Tailwind config carrying the design-system tokens. (Fill in: what you
changed, removed, or rewrote once you started working in it yourself.)

**Server code (`server/src/`):** Drafted close to end-to-end — the Express
app, the three route modules (categories, segments, settings), the schema,
and the seed/reset scripts. (Fill in: whether you've modified the schema or
routes since, and how.)

**README.md:** Drafted from the course template, filled in with this
project's specifics.

## What it did not touch

(Fill this in as you build — anything you wrote yourself without asking the
assistant, debugging you did on your own, deployment configuration you
figured out by reading host docs instead of asking, etc. This list matters
as much as the one above.)

## Verification

The assistant ran `npm install`, `npm run build`, and `eslint` on the client
and `node --check` on every server file before handing the code over, so it
is syntactically correct and the client builds. It was **not** run against
a live PostgreSQL database or deployed to a real host at the time it was
written — do that yourself, and note here what you had to fix to get it
actually working end to end. That fix list is normal and expected, not a
sign anything went wrong.
