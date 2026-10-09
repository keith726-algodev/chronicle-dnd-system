import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set. The API will start, but every /api route and " +
      "/readyz will fail until it is set in this process's environment."
  );
}

// Most hosted Postgres providers (Render, Neon, Supabase, Railway) require
// TLS and present a certificate that isn't in Node's default trust store in
// some environments; rejectUnauthorized:false matches what those hosts'
// own connection docs recommend for a simple student project.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle Postgres client", err);
});
