# Final Project - Proposal

## Chronicle

### The Idea

A personalized, branching campaign codex for tabletop DMs

### The Why

#### 1. Purpose & Audience

**Purpose statement:** Chronicle lets a Dungeon Master turn their own scattered campaign lore — factions, races, NPCs, locations, house rules, etc. — into a set of self-defined, tappable category "tiles" that each expand into nested, freely-edited notes, so the app's structure grows to match the world instead of forcing the world into a fixed template.

**Named audience:** Mainly to help my best friends with their respective DnD worlds, but can be localized for solo or small-group Dungeon Masters who have outgrown generic "character sheet" or flat note apps because their worldbuilding doesn't fit a fixed schema.

## The Scope

### 2. Planned Version - Finalized (Sections or Routes)

We will have five screens, each earning its place in the flow from tile grid down to a single note.

The following table categorizes these screens and their purpose (for the sake of simplicity, I will use the race of “Orcs” as a focal point for the examples):

| Screen | Their Purpose |
|---|---|
| **Home — World Library** | The entry point and the app's identity. Shows the user's top-level categories as tiles (Orcs, Factions, Locations...).<br><br>**Reason to exist:** without a persistent home grid, a fully freeform note tree has no anchor and no sense of "the world" as a whole. |

| **Category Branch View** | Opens when a tile is tapped; lists the user-defined segments inside that category (e.g. Orcs -> Classes, Culture, Notable NPCs) as a branching list, not a fixed sub-menu.
**Reason to exist:** this is the actual "branch" mechanic from the concept — it has to be its own screen because segments can be added, renamed, or reordered independently of the tile grid. |

| **Entry Viewer / Editor** | The note itself, rendered in the user's chosen display mode (bullet, list, or free paragraph) with an inline edit toggle.
**Reason to exist:** this is the actual notes-app payload; every other screen exists to route the DM here. |

| **New Category / Segment Composer** | A focused creation flow for adding a new tile (name + icon) or a new segment inside an existing branch.
**Reason to exist:** personalization requires a deliberate, separate authoring flow so users aren't editing structure and content in the same context. |

| **Settings — Appearance & Library** | Lets the user set default note display style (bullet/list/paragraph), reorder or archive top-level categories, and adjust theme accents.
**Reason to exist:** personalization is a first-class goal, and burying display preferences inside every note screen would duplicate the control everywhere. |

### 3. State & Content Plan

What data each screen owns, and the real content that will be gathered/entered to test it (seed data drawn from a sample homebrew world, "Scattered Gnosis"):

| Screen | Owned Data | Real Content to be Gathered |
|---|---|---|

| **Home — World Library** | Ordered list of category objects: `{ID, name, icon, color accent, segment count, last-edited date}`. | 6 seed categories: Orcs, Human Factions, Notable NPCs, Locations, House Rules, Session Log. |

| **Category Branch View** | The active category's segment list: `{id, title, preview snippet, display-mode flag, order index}`. | Under "Orcs": Classes, Culture & Rites, Notable NPCs, Territory Map Notes — each with a one-line preview. |

| **Entry Viewer / Editor** | A single segment's body: `{rich text blocks, display mode, last-edited timestamp, tags}`. | Full write-up for "Orcs -> Culture & Rites": 3 bullet sub-headings (Naming customs, Death rites, Clan structure) with 2-4 sentences each. |

| **New Category / Segment Composer** | Draft object being created: `{name, icon choice, parent (null for category / category-ID for segment)}`. | Test creation of a 7th category, "Deities & Pantheons," with a custom icon and two starter segments. |

| **Settings** | User preferences: `{default display mode, theme accent, category order overrides, archived category ID’s}`. | Toggle default display mode from Bullet to List and confirm existing entries re-render without data loss. |

## 4. One Risk

**Structural Risk — Flexibility vs. Legibility.**

The core promise of Chronicle is that categories and segments are entirely user-defined, with no enforced schema. The specific uncertainty is whether a fully open nested structure will, in practice, degrade into the same unstructured wall-of-text problem that is common in a plain notes app once the user has 15+ categories and 100+ segments — although at this point, the tile/branch mechanic would stop feeling like organization and start feeling like just another layer of folders.

This needs to be tested with a deliberately messy seed dataset (not just the aforementioned clean 6-category example) before the wireframes are finalized, since the fix (e.g. search, tags, or a soft-enforced minimum segment schema) changes what the Category Branch View and Settings screens are wired to do.