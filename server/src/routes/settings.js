import { Router } from "express";
import { pool } from "../db/pool.js";

export const settingsRouter = Router();

// GET /api/settings — the single settings row (id is always 1).
settingsRouter.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT default_display_mode AS "defaultDisplayMode", theme_accent AS "themeAccent"
         FROM settings WHERE id = 1`
    );
    if (rows.length === 0) {
      // Should never happen — schema.sql seeds row 1 — but fail clearly if it does.
      return res.status(500).json({ error: "settings row is missing; re-run db:reset" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/settings
settingsRouter.patch("/", async (req, res, next) => {
  try {
    const allowed = ["defaultDisplayMode", "themeAccent"];
    const columnFor = {
      defaultDisplayMode: "default_display_mode",
      themeAccent: "theme_accent",
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
    const { rows } = await pool.query(
      `UPDATE settings SET ${sets.join(", ")} WHERE id = 1
       RETURNING default_display_mode AS "defaultDisplayMode", theme_accent AS "themeAccent"`,
      values
    );
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});
