import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` is set from an env var so the GitHub Actions workflow can inject the
// repository name (https://<user>.github.io/<repo>/) without this file
// changing. Locally it falls back to "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
});
