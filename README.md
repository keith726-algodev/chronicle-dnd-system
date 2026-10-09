# Chronicle

A personalized, branching campaign codex for Dungeon Masters who run homebrew worlds and need their notes to grow into the shape of the world, not a fixed template.

**Live site:** https://github.com/keith726-algodev/chronicle-dnd-system
**Demo video:** ((https://drive.google.com/drive/folders/1OIWHsoByRlub7HzymDD1j2zm64MzPE9m?usp=sharing), see [docs/05-demo-video.md](docs/05-demo-video.md))
**API:** https://ExpressAPI.onrender.com/healthz

> **This deployment is running in demo mode.** The interface is real; the backend
> is simulated in your browser so the site works without a server. See
> [Demo mode](#demo-mode) below. Delete this quote once your API is live.

![A screenshot of the Chronicle home screen](docs/assets/home_screen.png)

## What it does

- Build your own top-level categories (Orcs, Factions, Locations, whatever your world needs) that appear as tappable tiles, inspired by the "As I've Written" interface from Honkai: Star Rail
- Open a tile to reveal its segments (for example Orcs: Classes, Culture and Rites, Notable NPCs), and add, rename or reorder them without ever losing the tile-and-branch navigation
- Write notes freely inside each segment, and choose how they display: bullet, list or paragraph
- Personalize appearance and library order from a settings screen
- Light, restrained animation so it does not feel like a blank text editor

## Built with

React and Vite on the front end, Express and PostgreSQL on the back end. Styling is Tailwind CSS on top of CSS custom properties (design tokens). The client is on GitHub Pages, the API on (host), the database on (host).

## Planning documents

| Document | What it covers |
| --- | --- |
| [01-proposal.md](docs/01-proposal.md) | Purpose, audience, five screens, data ownership, one risk |
| [02-mockup.md](docs/02-mockup.md) | Screen map, phone and desktop box sketches, component tree |
| [03-design-system.md](docs/03-design-system.md) | Tokens, palette with contrast ratios, components, responsive and accessibility plan |
| [04-weekly-reports.md](docs/04-weekly-reports.md) | Weekly progress |
| [06-security-and-privacy.md](docs/06-security-and-privacy.md) | Security and privacy notes |

## Demo mode

This repository can run two ways, chosen by one environment variable at **build**
time.

**Demo mode is the default.** Only the exact string `false` turns it off, so a
forgotten or mistyped variable leaves you on the simulated backend with a visible
notice rather than on a silently broken build.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. |

Demo mode is a starting point and a fallback, not the finished project. The
final version is the React client, the Express API and the PostgreSQL database,
all deployed and talking to each other.

GitHub Pages serves files and cannot run Node, so the API and the database live
elsewhere:

| Piece | Host |
| --- | --- |
| **Database** | (Docker Desktop) |

## Running it yourself

**The client only, in demo mode.** No database needed.

    cd client
    npm install
    cp .env.example .env        # VITE_USE_MOCK_API stays true
    npm run dev                 # http://localhost:5173

**The whole stack.**

    # 1. the database
    docker run --name chronicle-pg -e POSTGRES_PASSWORD=isummonchronicle \
      -e POSTGRES_DB=chronicle -p 5432:5432 -d postgres:17

    # 2. the API (own terminal)
    cd server
    npm install
    cp .env.example .env        # check DATABASE_URL
    npm run db:reset            # creates the tables and adds sample rows
    npm run dev                 # http://localhost:3000

    # 3. the client, in another terminal
    cd client
    npm install
    cp .env.example .env
    # set VITE_USE_MOCK_API=false
    npm run dev

Check the API on its own before you blame the client:

    curl http://localhost:3000/healthz     # is the process alive
    curl http://localhost:3000/readyz      # is the database reachable
    curl http://localhost:3000/api/categories

## Environment variables

None of these are committed. `.env.example` lists them with placeholder values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password |
| `CORS_ORIGINS` | server | comma-separated origins allowed to call the API |
| `NODE_ENV` | server | `production` on your host |
| `PORT` | server | **set by the host**, do not set it yourself |
| `VITE_USE_MOCK_API` | client, at build time | only `false` turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | client, at build time | your API's public URL, no trailing slash |

Every `VITE_` value is compiled into the built JavaScript and is **public**.
Never put a key, a password or a connection string in one.

## Deploying

**Client, to GitHub Pages.** Wired up in `.github/workflows/deploy-pages.yml`.

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.**
2. When the API is live, add `VITE_USE_MOCK_API` = `false` and
   `VITE_API_BASE_URL` under **Settings > Secrets and variables > Actions >
   Variables**, then re-run the workflow.

The repository must be **public** for Pages to serve it on a free account.

**API and database.** Point the host at the `server/` folder, set the
environment variables in its dashboard, and run `server/db/schema.sql` once
against the hosted database.

## Project structure

    client/          React front end, built by Vite
      src/api/       ONE interface, two implementations, chosen by a variable
      src/components/
    server/          Express API
      db/            pool, schema.sql, seed.sql, and a runner for them
    compose.yml      only if you self-host
    docs/            planning documents and weekly reports

## Architecture

The React client talks to the Express API over HTTPS, and the API is the only
thing that talks to PostgreSQL. The data model is a tree: a user's categories
own segments, and each segment owns a note body plus its display mode. In demo
mode the same client calls are answered from `localStorage` instead of the API.
(Fill in the actual hosts once deployed.)

## What I would do next

- Add search and tags so large libraries (15+ categories, 100+ segments) stay navigable. This is the main risk named in the proposal.
- Add a light theme and more per-category icon and accent choices.
- Add sharing or export so a DM can give players a read-only view of selected categories.

## Author

Gatbonton, Keith Andre C., [github.com/keith726-algodev](https://github.com/keith726-algodev). Computer Science, CS-404.

## AI use

![Built with AI assistance](https://claude.ai/)

I used Claude (Anthropic) to help draft the planning documents (proposal, wireframes and component breakdown, design system), the system itself, the CSS, API, and client code. Full account: [AI-USAGE.md](AI-USAGE.md).

## Licence

MIT, see [LICENSE](LICENSE).
