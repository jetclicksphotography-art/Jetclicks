import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const apiDir = path.dirname(fileURLToPath(import.meta.url)) + "/api";

/**
 * Runs the Vercel-style functions in `api/` inside the Vite dev server so the
 * chat widget, booking form and studio console work with `npm run dev`.
 * Production still uses Vercel's own function runtime.
 */
function vercelApiDev(): Plugin {
  return {
    name: "jetclicks-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        if (!url.startsWith("/api/")) return next();

        const name = url.split("?")[0].replace(/^\/api\//, "").replace(/\/+$/, "");
        // `_lib` is shared code, not a route.
        if (!/^[a-z0-9-]+$/i.test(name)) return next();

        const file = path.join(apiDir, name + ".js");
        if (!existsSync(file)) return next();

        try {
          // Loaded through Vite so edits to api/*.js take effect without a restart.
          const module = await server.ssrLoadModule("/api/" + name + ".js");
          const handler = module.default;
          if (typeof handler !== "function") return next();

          const parsed = new URL(url, "http://localhost");
          (req as any).query = Object.fromEntries(parsed.searchParams.entries());
          await handler(req, res);
        } catch (error) {
          server.config.logger.error(`[api] ${name} failed: ${(error as Error).message}`);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: (error as Error).message }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Expose every .env key to the dev API handlers, matching Vercel's runtime.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return { plugins: [react(), vercelApiDev()] };
});
