# Weekly Reports

A log of what got done, what blocked, and what's next, week by week.

> **How to read this log.** These entries were written after the fact, not
> week by week. I reconstructed them from memory, my chat history with
> Claude, and the repository's git history, so they are an honest account of
> the work but not contemporaneous notes. Where AI helped, the entry says so;
> the full account is in [AI-USAGE.md](../AI-USAGE.md).
>
> **Gap: September 7 to 25.**
> A set of typhoons cut power and internet in my area for roughly two and a half weeks, and my PC also underwent significant technical problems during that stretch.
> I had no connectivity and no working machine, so there is nothing to 
> log in that timeframe. Already referred this to my professor.

---

## Week of July 31

### Friday, July 31, 2026

**Focus:** Kickoff: proposal, wireframes, design system.

**Done**
- Settled the concept: Chronicle, a personalized, branching campaign codex
  for tabletop DMs, with UI inspiration from the "As I've Written"
  interface in Honkai: Star Rail's Amphoreus arc and some random samples of UI for notes apps
  in Google Images.

- Drafted the three planning submissions:
  - **Part 1, Proposal:** purpose statement, named audience, five core
    screens and why each exists, a state and content plan, and one risk
    (flexibility vs. legibility as the note tree grows).

  - **Part 2, Wireframes:** screen map with no dead-end routes, phone and
    desktop box sketches, and an atoms, molecules, organisms component tree.

  - **Part 3, Design System:** tokens, a five-color palette with WCAG
    contrast ratios computed from the hex values, a component table pulled
    from the wireframes, and a breakpoint and accessibility plan.

**Blockers:** None. Planning only, no code yet.

**Next:** Set up the repository.

---

## Week of August 21

### Friday, August 21, 2026

**Focus:** New template for project repo to review and made adjustments to planning.

**Done**
- Reviewed the final project template and took note of what to look forward
   to. Double checked submissions for design system and brainstormed a little more
   for potential changes.

- Researched online for more good ideas to implement as updates in the future
   for the project.

**Blockers:** None.

**Next:** Focus on creating personal repo
---

## Week of September 5

### Saturday, September 5, 2026

**Focus:** Repo setup and README.

**Done**
- Made my own copy of the course template and worked through the
  `START-HERE.md` checklist: rename the repo, make it public, set the
  Pages source to GitHub Actions, and setup on VS Code.

- Replaced the template `README.md` with Chronicle's own, drafted with
  Claude from the template's structure. Note: Did not commit during this time,
  was focused on thesis capstones.

**Blockers:** None.

**Next:** Turn the wireframes into React components.

### Sunday, September 6, 2026

**Focus:** Planning the build order.

**Done**
- Mapped each box in the Part 2 component tree to a file: atoms first
  (Icon, Button, Tag, ColorSwatch), then the molecules and organisms that
  depend on them (CategoryTile, NavHeader, SegmentList, EntryEditorPanel).

- Decided on the `src/api/` pattern up front: one interface with two
  implementations (`mockApi.js` and `realApi.js`), chosen by
  `VITE_USE_MOCK_API`, so essentially, moving to a real backend 
  is more of an environment change and not necessarily a rewrite.

**Blockers:** None.

**Next:** Start writing components. Note: This was interrupted by the typhoon.

---

## Gap: September 7 to 25

No entries. See the note at the top.

---

## Week of September 26

### Saturday, September 26, 2026

**Focus:** Back online: client build.

**Done**
- Internet came back on the 25th, so I used the weekend to catch up in
  large sittings instead of small ones.

- Had Claude generate the full `client/` app from the planning documents:
  the mock and real API split with seed data, every component in the
  Part 2 tree, and all four screens (Home, Category Branch View, Entry
  Viewer/Editor, Settings) wired together with React Router.

- Set up Tailwind with the exact tokens from the Part 3 design system
  (colors, spacing, radius, type scale) instead of hard-coded values.

- Added the GitHub Pages routing fix (`404.html` plus a redirect script)
  so refreshing a nested route like `/categories/:id` does not 404.

**Blockers:** None.

**Next:** The Express API and PostgreSQL schema.

### Sunday, September 27, 2026

**Focus:** Server scaffold.

**Done**
- Had Claude inspires samples of `server/db/schema.sql` (categories, segments and
  settings tables, following the Part 1 data plan) and `seed.sql`, which
  mirrors the client's mock data so demo mode and the real API start with
  the same world.

- Express routes for categories, segments and settings, plus `/healthz`
  and `/readyz`.

- `.github/workflows/deploy-pages.yml` to build and deploy the client,
  reading `VITE_USE_MOCK_API` and `VITE_API_BASE_URL` from repository
  variables.

- The client built and linted clean, and the server files passed a syntax
  check. None of the server had run against a real database yet.

**Blockers:** None yet.

**Next:** Run the server against real PostgreSQL.

---

## Week of October 5

### Monday, October 5, 2026

**Focus:** First real run of the whole stack, and the debugging that came with it.

**Done**
- Ran the server for the first time. Problems hit, in order:
  - `npm install` from the repo root, where there is no `package.json`
    (it belongs in `client/` and `server/`).

  - The README's Docker command used bash-style `\` line breaks, which
    PowerShell does not understand, so it had to go on one line.

  - Docker was not on PATH until Docker Desktop was fully started and the
    terminal reopened, and a broken paste then produced a stray `-e` flag
    error.

  - `db:reset` failed with a SASL password error. I verified dotenv and
    Postgres each worked on their own, then checked the first lines of
    `pool.js` on disk and found the `import "dotenv/config"` edit had never
    been saved. The file that was running was not the file I thought I had
    edited.

- After that, `npm run db:reset` created and seeded the tables, and
  `/healthz`, `/readyz` and `/api/categories` returned real PostgreSQL data
  (using `curl.exe`, because PowerShell aliases plain `curl` to
  `Invoke-WebRequest`).

- Pointed the client at the real API (`VITE_USE_MOCK_API=false`,
  `VITE_API_BASE_URL=http://localhost:3000`) and confirmed in the browser
  that the demo banner was gone and categories and segments came from the
  database, not `localStorage`.

**Blockers:** My own unsaved editor tab, plus Windows and PowerShell
differences from the commands in the README. It cost most of a day and is
why the README now needs a Windows note.

**Next:** Personalize the seed content.

### October 6 to 9, 2026

**Focus:** Content, visual polish, and keeping the local stack alive.

**Done**
- Rewrote seed lore in `server/db/seed.sql` myself (names, casing,
  punctuation, longer NPC descriptions), then reloaded it with
  `npm run db:reset`.

- Edits did not appear at first. Two separate causes: the API process had
  stopped, and the client was still in demo mode, reading `localStorage`
  instead of the database. Vite only reads `.env` when it starts, so the
  client needed a restart after the setting changed.

- Restarting the PC stopped the Postgres container and every dev server.
  Recovery is `docker start chronicle-pg`, then `npm run dev` in `server/`
  and again in `client/`. A "failed to fetch" on the Home screen means the
  API is not running.

- Replaced the flat colors with gradients, using Claude for the changes.
  They are Tailwind tokens (`grad-tile`, `grad-accent`, `grad-gold`,
  `grad-header`) plus a layered page background. I checked contrast at the
  lightest end of every gradient; the lowest ratio is 5.74:1, above the
  4.5:1 target in the design system.

- Wrote `docs/04-weekly-reports.md` (this very file).

**Blockers:** Keeping three local processes (database, API, client) running
at once, especially after a restart.

**Next:** deploy the API and database to real hosts (planned: Neon for
PostgreSQL, Render for the API), set `VITE_USE_MOCK_API=false` and
`VITE_API_BASE_URL` in the repository variables, and re-run the Pages
workflow so the live site stops running in demo mode. Then record the demo.