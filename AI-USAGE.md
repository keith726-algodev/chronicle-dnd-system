# AI Use

## Assistant

Claude (Anthropic), used through claude.ai.

## What it touched

**Planning documents (`docs/01-proposal.md`, `02-mockup.md`, `03-design-system.md`):**
Drafted close to end-to-end from a description of the app idea and the
course rubrics.

(## Although Claude gave me some ideas, I mainly came up with most of the app idea with inspiration from a game I play. Most of the support Claude provided was samples of formatting for the .md files, until I chose what I felt most comfortable with. I will say, the design system was where I needed the most help since CSS sometimes eludes me and I struggle with it, so Claude helped me there.)

---

**Client application code (`client/src/`):** Drafted close to end-to-end —
the API abstraction (`src/api/mockApi.js`, `realApi.js`, `index.js`), every
component in `src/components/`, the four screens in `src/screens/`, and the
Tailwind config carrying the design-system tokens.

(## Essentially, I made several adjustments while testing the client application myself. I connected the frontend to the Express API and PostgreSQL database instead of relying on the mock API, then verified that the category and segment data loaded correctly from Claude. It would then guide me to the right path, but not the outright answer. I also cleaned up the displayed seed content, this way the casing and punctuation sat at a comfortable format to my taste, to make the interface more consistent and readable. I kept the existing component structure, four-screen layout, and Tailwind design-system tokens while checking that the navigation and data flow worked as intended.)

---

**Server code (`server/src/`):** Drafted close to end-to-end — the Express
app, the three route modules (categories, segments, settings), the schema,
and the seed/reset scripts.

(## I haven't made any major changes to the database schema or API routes since the initial implementation. The schema still uses the categories, segments, and settings tables, while the Express API handles categories, segments, and settings, along with the /healthz and /readyz endpoints for health checks. Most of my changes since then have focused on cleaning up the seed data, particularly the casing and punctuation, and verifying that the client can retrieve and display data correctly from PostgreSQL.)

---

**README.md:** Drafted from the course template, filled in with this
project's specifics. Claude barely touched this.

---

## What it did not touch

Although AI assisted with parts of the planning, documentation, and development process, I remained responsible for working with the actual project, testing its behavior, and verifying that its components functioned together. I tested the connection between the React client, Express API, and PostgreSQL database, including checking the health, readiness, and category endpoints and confirming that campaign data could be retrieved from the database in the browser. I also reviewed and cleaned up the seed data in server/db/seed.sql, this was explained in the first of the aforementioned, to make the displayed campaign content more consistent.

I was also responsible for checking the application's behavior in the browser and verifying that the interface displayed the expected category and segment content when using the real API instead of the mock data. The actual results of these tests, including any issues encountered during integration, depended on running the application rather than relying solely on AI-generated suggestions.

This section does not claim that every implementation detail was written independently of AI. Instead, it identifies the testing, integration work, and content cleanup that I carried out as part of developing Chronicle. Any additional work completed independently, such as debugging, writing specific components, or configuring deployment by consulting hosting documentation, should be documented here only after confirming the exact tasks performed.

## Verification

The assistant ran `npm install`, `npm run build`, and `eslint` on the client
and `node --check` on every server file before handing the code over, so it
is syntactically correct and the client builds. It was **not** run against
a live PostgreSQL database or deployed to a real host at the time it was
written.

I did run into some issues like the API starting, but requests for categories or segments returned errors because the Docker database didn't work or failed, or missing components caused me to search up online how to fix them.

