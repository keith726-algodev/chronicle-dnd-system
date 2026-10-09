import { Router } from "express";
import { pool } from "../db/pool.js";

export const categoriesRouter = Router();

// GET /api/categories — every non-archived category, with its segment count.
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.id, c.name, c.icon, c.accent_color AS "accentColor",
              c.order_index AS "orderIndex", c.archived,
              COUNT(s.id)::int AS "segmentCount"
         FROM categories c
         LEFT JOIN segments s ON s.category_id = c.id
        WHERE c.archived = FALSE
        GROUP BY c.id
        ORDER BY c.order_index ASC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/categories — create a new category.
categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { name, icon, accentColor } = req.body;
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "name is required" });
    }
    const { rows: orderRows } = await pool.query(
      "SELECT COALESCE(MAX(order_index), -1) + 1 AS next FROM categories"
    );
    const orderIndex = orderRows[0].next;

    const { rows } = await pool.query(
      `INSERT INTO categories (name, icon, accent_color, order_index)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, icon, accent_color AS "accentColor",
                 order_index AS "orderIndex", archived`,
      [name.trim(), icon || "book", accentColor || "#9FD8FF", orderIndex]
    );
    res.status(201).json({ ...rows[0], segmentCount: 0 });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/categories/:id — rename, re-theme, reorder, or archive.
categoriesRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allowed = ["name", "icon", "accentColor", "orderIndex", "archived"];
    const columnFor = {
      name: "name",
      icon: "icon",
      accentColor: "accent_color",
      orderIndex: "order_index",
      archived: "archived",
    };
    const sets = [];
    const values = [];
    let i = 1;
    for (const key of allowed) {
      if (key in req.body) {
        sets.push(`${columnFor[key]} = $${i++}`);
        values.push(req.body[key]);
      }
    }
    if (sets.length === 0) {
      return res.status(400).json({ error: "no valid fields to update" });
    }
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE categories SET ${sets.join(", ")} WHERE id = $${i}
       RETURNING id, name, icon, accent_color AS "accentColor",
                 order_index AS "orderIndex", archived`,
      values
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/categories/:id — soft-delete (archive) by default behaviour
// in the client is "archive", but this endpoint does a hard delete, which
// cascades to its segments. The Settings screen calls this for "Archive"
// intentionally simple for a single-tenant hobby project; see the README's
// "What I would do next" for turning this into a real archive flag.
categoriesRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:id/segments — segment list for the Branch View.
categoriesRouter.get("/:id/segments", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT id, category_id AS "categoryId", title,
              LEFT(COALESCE(blocks->>0, ''), 90) AS "previewText",
              tags, display_mode AS "displayMode", order_index AS "orderIndex"
         FROM segments
        WHERE category_id = $1
        ORDER BY order_index ASC`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/categories/:id/segments — create a segment inside a category.
categoriesRouter.post("/:id/segments", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, displayMode } = req.body;
    const { rows: catRows } = await pool.query("SELECT id FROM categories WHERE id = $1", [id]);
    if (catRows.length === 0) {
      return res.status(404).json({ error: "category not found" });
    }
    const { rows: orderRows } = await pool.query(
      "SELECT COALESCE(MAX(order_index), -1) + 1 AS next FROM segments WHERE category_id = $1",
      [id]
    );
    const orderIndex = orderRows[0].next;

    const { rows } = await pool.query(
      `INSERT INTO segments (category_id, title, display_mode, blocks, tags, order_index)
       VALUES ($1, $2, $3, '[]'::jsonb, '[]'::jsonb, $4)
       RETURNING id, category_id AS "categoryId", title, display_mode AS "displayMode",
                 blocks, tags, order_index AS "orderIndex"`,
      [id, title?.trim() || "Untitled", displayMode || "bullet", orderIndex]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});
