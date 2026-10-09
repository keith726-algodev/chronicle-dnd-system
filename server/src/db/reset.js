// Drops and recreates Chronicle's tables, then loads sample rows.
// Run with: npm run db:reset
// Intended for local development only — do not point this at a database
// with real data you want to keep.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.resolve(__dirname, "../../db");

async function run() {
  const schema = fs.readFileSync(path.join(dbDir, "schema.sql"), "utf8");
  const seed = fs.readFileSync(path.join(dbDir, "seed.sql"), "utf8");

  console.log("Dropping existing tables (if any)...");
  await pool.query("DROP TABLE IF EXISTS segments CASCADE;");
  await pool.query("DROP TABLE IF EXISTS categories CASCADE;");
  await pool.query("DROP TABLE IF EXISTS settings CASCADE;");

  console.log("Applying schema.sql...");
  await pool.query(schema);

  console.log("Applying seed.sql...");
  await pool.query(seed);

  console.log("Done. Tables created and sample rows loaded.");
  await pool.end();
}

run().catch((err) => {
  console.error("db:reset failed:", err.message);
  process.exit(1);
});
