// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vercel sets VERCEL=1 automatically in its build environment.
// In that case: disable @cloudflare/vite-plugin (produces a CF Workers bundle that
// Vercel cannot run) and enable TanStack Start's SPA mode, which prerenders a static
// HTML shell to dist/client so Vercel can serve it as a plain static site.
//
// For all other environments (local dev, Cloudflare Workers deploy via wrangler),
// the original config is used unchanged.
const isVercel = process.env.VERCEL === "1";

export default defineConfig(
  isVercel
    ? {
        // Vercel: no CF Worker bundle, output a static SPA shell instead.
        cloudflare: false,
        tanstackStart: {
          server: { entry: "server" },
          spa: { enabled: true },
        },
      }
    : {
        // Default (Cloudflare Workers): redirect TanStack Start's bundled server entry
        // to src/server.ts — @cloudflare/vite-plugin builds from this.
        tanstackStart: {
          server: { entry: "server" },
        },
      },
);
