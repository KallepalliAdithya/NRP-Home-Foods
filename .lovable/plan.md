
# NRP — Taste of Andhra, Away From Home

A premium, mobile-first marketing site for the NRP homemade Andhra food brand. No cart, no auth — every order CTA opens WhatsApp (+91 6281473558) with a prefilled message.

## Design system

Tokens added to `src/styles.css` (oklch equivalents of the brand hexes):
- `--andhra-red` #8B1E1E → `--primary`
- `--turmeric` #DFAF2B → `--accent`
- `--curry-green` #355E3B → `--secondary`
- `--cream` #FFF8EE → `--background`
- `--cocoa` dark brown → `--foreground`
- Gradients: warm cream→turmeric hero wash; subtle red→cocoa for premium surfaces
- Shadows: soft warm-cocoa elevation
- Radius: 1rem default, 1.5rem on cards

Typography (Google Fonts, loaded in `__root.tsx`):
- Headings: **Fraunces** (elegant modern serif, premium food-brand feel)
- Body: **Inter**
- Optional accent: **Caveat** for handwritten "homemade" notes

Motion: Framer Motion for entrance fades, stagger on cards, hover lift, sticky-CTA slide-in.

## Routes (TanStack Start, separate routes for SEO)

```
src/routes/
  __root.tsx          → shared shell, fonts, Navbar, Footer, FloatingWhatsApp
  index.tsx           → Home (Hero, Why Choose, featured menu teaser, reviews teaser, Instagram, CTA)
  menu.tsx            → Full menu with category tabs
  about.tsx           → Story
  reviews.tsx         → Testimonials grid
  contact.tsx         → Contact + WhatsApp + delivery info
```

Each route gets unique `head()` meta (title, description, og:title/description, og:url, canonical at leaf only).

## Components

```
src/components/
  Navbar.tsx              → logo, nav links, WhatsApp CTA, mobile drawer
  Footer.tsx
  FloatingWhatsApp.tsx    → fixed bottom-right, mobile-prominent
  StickyMobileCTA.tsx     → bottom bar on mobile
  Hero.tsx                → headline, sub, two CTAs, hero image, motion entrance
  WhyChooseUs.tsx         → 6 icon cards (Lucide icons in turmeric/curry tones)
  MenuSection.tsx         → category tabs + animated grid (used on / as teaser, /menu in full)
  MenuCard.tsx            → image, name, desc, price, WhatsApp order button
  CategoryTabs.tsx        → animated underline, smooth transitions
  Reviews.tsx             → testimonial cards
  InstagramGallery.tsx    → 6–8 square food tiles, hover zoom
  AboutStory.tsx          → emotional copy + image collage
  SectionHeading.tsx      → reusable eyebrow + serif title
  WhatsAppButton.tsx      → variants: primary, ghost, icon, floating; builds wa.me link
```

## Data

`src/data/menu.ts` — typed JSON-shaped array (Supabase-ready schema):

```ts
type MenuItem = {
  id: string; category: 'sweets'|'snacks'|'veg-pickles'|'non-veg-pickles'|'podi';
  name: string; description: string; price: number; image: string; popular?: boolean;
};
```

20 items as listed in the brief, realistic INR pricing (e.g. Avakaya ₹450/500g, Ariselu ₹350/250g, Chicken Pickle ₹650/250g, podis ₹220/200g, etc.). Categories: Sweets, Snacks/Hots, Veg Pickles, Non-Veg Pickles, Podi.

## WhatsApp helper

```ts
// src/lib/whatsapp.ts
export const WHATSAPP_NUMBER = '916281473558';
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
export const orderMsg = (item: string) => `Hi NRP, I want to order ${item}.`;
```

Hero CTA → "Hi NRP, I'd like to place an order." Each MenuCard → `orderMsg(item.name)`. Floating button → generic enquiry message.

## Imagery

Generated with `imagegen` (premium tier for hero, fast for menu/Instagram), saved under `src/assets/`:
- `hero-andhra-spread.jpg` — warm-lit overhead Andhra thali / pickles & sweets spread
- `logo-nrp.png` — transparent PNG: minimalist "NRP" wordmark with subtle curry-leaf + spice-dot motif, terracotta + turmeric on cream
- One image per menu item (20 total) — close-up, warm lighting, rustic textures
- 6 Instagram square tiles — varied food moments
- About collage image — hands preparing/jarring pickles

## Special features

- Floating WhatsApp button (fixed, pulse animation on hover)
- Sticky mobile CTA bar at bottom of viewport on small screens
- Framer Motion: fade-up on scroll for sections, stagger for card grids, tab content cross-fade
- Hover: card lift + image zoom
- SEO: per-route meta, semantic landmarks, single H1 per page, alt text everywhere, JSON-LD `Restaurant` / `FoodEstablishment` on root, `Product` schema for menu items
- Mobile-first Tailwind, responsive grid (1 → 2 → 3 → 4 cols)

## Out of scope (per brief)

- No cart, no checkout, no auth
- No Lovable Cloud (pure marketing site; menu lives in typed JSON, structured to migrate to Supabase later)

## Build order

1. Tokens + fonts in `styles.css` and `__root.tsx`
2. Generate logo + hero image
3. Layout: Navbar, Footer, FloatingWhatsApp, StickyMobileCTA
4. Menu data + remaining food images (batch)
5. Sections: Hero, WhyChooseUs, MenuSection (with tabs), Reviews, InstagramGallery, AboutStory
6. Routes: `/`, `/menu`, `/about`, `/reviews`, `/contact` with per-route SEO
7. Motion polish + mobile QA
