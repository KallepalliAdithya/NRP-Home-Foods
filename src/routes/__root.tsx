import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { CartProvider } from "@/store/cart";
import { CartDrawer } from "@/components/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl font-semibold text-primary">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#8B1E1E" },
      { title: "Home Made Foods — Taste of Andhra, Away From Home" },
      { name: "description", content: "Authentic homemade Andhra sweets, snacks, pickles & podis. Order on WhatsApp, delivered pan-India." },
      { name: "author", content: "Home Made Foods" },
      { property: "og:site_name", content: "Home Made Foods" },
      { property: "og:title", content: "Home Made Foods — Taste of Andhra, Away From Home" },
      { property: "og:description", content: "Authentic homemade Andhra sweets, snacks, pickles & podis. Order on WhatsApp, delivered pan-India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Home Made Foods — Taste of Andhra, Away From Home" },
      { name: "twitter:description", content: "Authentic homemade Andhra sweets, snacks, pickles & podis. Order on WhatsApp, delivered pan-India." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1pqAauVLmOXAtRGZrFDVSGzfaiQ2/social-images/social-1778957856960-social_image_nrp_final.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/1pqAauVLmOXAtRGZrFDVSGzfaiQ2/social-images/social-1778957856960-social_image_nrp_final.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FoodEstablishment",
          name: "Home Made Foods",
          description: "Homemade Andhra Pradesh sweets, snacks, pickles and podis.",
          servesCuisine: "Andhra, South Indian",
          telephone: "+91 9390524599",
          areaServed: "IN",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pb-24 md:pb-0">
            <Outlet />
          </main>
          <Footer />
          <FloatingWhatsApp />
          <StickyMobileCTA />
          <CartDrawer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
