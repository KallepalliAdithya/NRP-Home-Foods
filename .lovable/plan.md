
## Goal

Keep the current NRP design, routes, palette, and components intact. Layer in commerce-style interactions (cart, weight, quantity, WhatsApp checkout) and premium polish (glass navbar, scroll effects, sticky behavior, motion).

No redesign. No new pages. No backend.

---

## 1. Cart system (client-side, zero backend)

New files:
- `src/store/cart.tsx` — React context + reducer + `localStorage` persistence (key `nrp_cart_v1`).
- `src/hooks/useCart.ts` — thin hook over the context.
- `src/components/CartDrawer.tsx` — slide-in drawer (uses existing `ui/sheet.tsx`) with line items, qty steppers, weight badge, subtotal, "Checkout on WhatsApp" CTA.
- `src/components/CartButton.tsx` — icon button with animated item-count badge; opens the drawer.

Cart item shape:
```ts
{ id, name, image, weight: { label, grams, priceMultiplier }, qty, unitPrice, lineTotal }
```

Provider mounted once in `src/routes/__root.tsx` so cart persists across route changes.

## 2. Weight + quantity selection

Extend `src/data/menu.ts`:
- Add optional `weights?: { label: string; grams: number; multiplier: number }[]` per `MenuItem`.
- Default presets per category (e.g. pickles: 250g/500g/1kg; podis: 100g/200g/500g; sweets: 250g/500g). Base price stays the existing `price`/`unit`.

Upgrade `MenuCard.tsx` (no visual redesign — same card, same spacing):
- Replace the single "Order on WhatsApp" button with: weight pill-group + qty stepper (− / value / +) + "Add to cart" primary button.
- Keep a secondary subtle "Order now on WhatsApp" link for single-item express order (preserves current behavior).
- Animate price update with `motion` `key` swap when weight changes.

## 3. WhatsApp checkout summary

Extend `src/lib/whatsapp.ts`:
- Add `cartCheckoutMsg(items, subtotal)` that formats a clean multi-line WhatsApp message:
  ```
  Hi NRP, I'd like to order:
  • Avakaya — 500g × 2 = ₹960
  • Karam Podi — 200g × 1 = ₹240
  ---
  Subtotal: ₹1,200
  Name: …
  Address: …
  ```
- Drawer "Checkout on WhatsApp" opens `waLink(cartCheckoutMsg(...))`.

## 4. Glassmorphism navbar + scroll effects

Update `src/components/Navbar.tsx` only (keep markup/structure):
- Replace scrolled style with `backdrop-blur-xl bg-background/60 border-b border-border/40` + soft shadow; transparent at top.
- Add `useScroll` + `useTransform` (motion) for subtle logo scale-down and padding shrink on scroll.
- Add active-section underline animation using `layoutId` (already used in MenuSection tabs — reuse pattern).
- Add cart icon to desktop + mobile nav.

## 5. Smooth section highlighting (home page)

Home page (`src/routes/index.tsx`) anchors:
- New small hook `src/hooks/useActiveSection.ts` using `IntersectionObserver` to track which section is in view.
- Navbar links pointing to in-page sections gain an animated indicator when their section is active. Cross-route links (Menu/About/Reviews/Contact) keep existing behavior.

## 6. Premium animations (additive only)

- Hero: parallax on hero image via `useScroll` + `y` transform; staggered headline reveal (already partially there — tighten timing).
- MenuCard: add `whileHover={{ y: -6 }}` + image `scale` already exists; add price-change spring animation.
- Section reveals: standardize a `<Reveal>` wrapper component (`src/components/Reveal.tsx`) using `whileInView` with consistent easing, reused across `WhyChooseUs`, `AboutStory`, `Reviews`, `InstagramGallery`. Replace ad-hoc motion props.
- CartDrawer: spring slide-in, item add → badge bounce, line item remove → height collapse via `AnimatePresence`.

## 7. Sticky interactions

- Keep existing `StickyMobileCTA`; extend it to show **cart subtotal + item count** when cart has items, otherwise the current "Order on WhatsApp" CTA.
- On `/menu`, make the category tab bar `sticky top-[64px]` with glass background so it stays visible while scrolling long lists (mobile-first benefit).
- `FloatingWhatsApp` stays; hide it when the cart drawer is open to avoid overlap.

---

## Out of scope

- No payments, no auth, no Lovable Cloud.
- No new routes, no removal of existing sections.
- No palette / typography / logo changes.
- No image regeneration.

## Technical notes

- Persistence: `localStorage` only; SSR-safe guard (`typeof window !== "undefined"`).
- All new colors/blurs use existing tokens in `src/styles.css` — no hardcoded hex.
- All new motion uses the already-installed `motion` package.
- Cart context is the single source of truth; no prop drilling.

## File change summary

Created:
- `src/store/cart.tsx`
- `src/hooks/useCart.ts`
- `src/hooks/useActiveSection.ts`
- `src/components/CartDrawer.tsx`
- `src/components/CartButton.tsx`
- `src/components/Reveal.tsx`

Edited (surgical, no redesign):
- `src/data/menu.ts` (add weights)
- `src/lib/whatsapp.ts` (add cart message builder)
- `src/components/MenuCard.tsx` (weight + qty + add-to-cart)
- `src/components/Navbar.tsx` (glass + scroll motion + cart button + active section)
- `src/components/StickyMobileCTA.tsx` (cart-aware)
- `src/components/FloatingWhatsApp.tsx` (hide when drawer open)
- `src/routes/__root.tsx` (mount CartProvider + CartDrawer)
- `src/routes/menu.tsx` (sticky category bar wrapper)
