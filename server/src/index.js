import express from "express";
import cors from "cors";
import { pool } from "./db/pool.js";
import { categoriesRouter } from "./routes/categories.js";
import { segmentsRouter } from "./routes/segments.js";
import { settingsRouter } from "./routes/settings.js";

const app = express();

// The host sets PORT; do not hardcode it or set it yourself in .env for
// production. 3000 is only the local-development fallback.
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server calls / curl (no Origin header) and anything
      // in CORS_ORIGINS. An empty allowlist means "reject all browsers",
      // which is the safer default if the env var was never set.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS_ORIGINS`));
      }
    },
  })
);
app.use(express.json());

// --- Health checks -------------------------------------------------------
// healthz: is the process alive at all (never touches the database).
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// readyz: is the process alive AND able to reach PostgreSQL. Hosts and
// uptime checks should prefer this once the database is wired up.
app.get("/readyz", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ready" });
  } catch (err) {
    res.status(503).json({ status: "not ready", error: err.message });
  }
});

// --- API routes ------------------------------------------------------------
app.use("/api/categories", categoriesRouter);
app.use("/api/segments", segmentsRouter);
app.use("/api/settings", settingsRouter);

// --- 404 + error handling ---------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message?.startsWith("Origin")) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`Chronicle API listening on port ${PORT}`);
});
