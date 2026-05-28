import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Vercel sets VERCEL=1 automatically in its build environment.
// In that case: disable @cloudflare/vite-plugin (produces a CF Workers bundle that
// Vercel cannot run) and enable TanStack Start's SPA mode, which prerenders a static
// HTML shell to dist/client so Vercel can serve it as a plain static site.
//
// For all other environments (local dev, Cloudflare Workers deploy via wrangler),
// the Cloudflare plugin is included and the standard SSR build runs.
const isVercel = process.env.VERCEL === "1";

export default defineConfig(({ command, mode }) => {
  // Inject VITE_* env variables as static defines (mirrors what the old config wrapper did)
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const tanstackStartOptions = {
    server: { entry: "server" },
    importProtection: {
      behavior: "error" as const,
      client: {
        files: ["**/server/**"],
        specifiers: ["server-only"],
      },
    },
    ...(isVercel ? { spa: { enabled: true } } : {}),
  };

  return {
    define: envDefine,
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      // Cloudflare Workers plugin — only on non-Vercel builds
      ...(command === "build" && !isVercel ? [cloudflare({ viteEnvironment: { name: "ssr" } })] : []),
      tanstackStart(tanstackStartOptions),
      viteReact(),
    ],
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: {
      host: "::",
      port: 8080,
      watch: {
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      },
    },
  };
});
