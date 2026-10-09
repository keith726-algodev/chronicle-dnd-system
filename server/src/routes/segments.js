import { Router } from "express";
import { pool } from "../db/pool.js";

export const segmentsRouter = Router();

// GET /api/segments/:id — full segment body for the Entry Viewer/Editor.
segmentsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT id, category_id AS "categoryId", title, display_mode AS "displayMode",
              blocks, tags, order_index AS "orderIndex"
         FROM segments WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "segment not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/segments/:id — edit title, display mode, body, tags, or order.
segmentsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allowed = ["title", "displayMode", "blocks", "tags", "orderIndex"];
    const columnFor = {
      title: "title",
      displayMode: "display_mode",
      blocks: "blocks",
      tags: "tags",
      orderIndex: "order_index",
    };
    const jsonColumns = new Set(["blocks", "tags"]);

    const sets = ["updated_at = now()"];
    const values = [];
    let i = 1;
    for (const key of allowed) {
      if (key in req.body) {
        if (jsonColumns.has(key)) {
          sets.push(`${columnFor[key]} = $${i++}::jsonb`);
          values.push(JSON.stringify(req.body[key]));
        } else {
          sets.push(`${columnFor[key]} = $${i++}`);
          values.push(req.body[key]);
        }
      }
    }
    if (sets.length === 1) {
      return res.status(400).json({ error: "no valid fields to update" });
    }
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE segments SET ${sets.join(", ")} WHERE id = $${i}
       RETURNING id, category_id AS "categoryId", title, display_mode AS "displayMode",
                 blocks, tags, order_index AS "orderIndex"`,
      values
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "segment not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/segments/:id
segmentsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM segments WHERE id = $1", [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "segment not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
