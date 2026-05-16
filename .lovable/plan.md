## Plan

### 1. Update phone number everywhere
Replace `+91 62814 73558` / `916281473558` with `+91 93905 24599` / `919390524599` in `src/lib/whatsapp.ts` (single source of truth — `WHATSAPP_NUMBER` and `WHATSAPP_DISPLAY` constants). This automatically propagates to Footer, Contact page, WhatsApp buttons, and floating WhatsApp CTA.

Quick grep to confirm no hardcoded copies live elsewhere; fix any stragglers found.

### 2. Fix any issues found
Scan the menu data file and components for:
- Leftover odd text from earlier edits (e.g. the "Murukulu" entry whose name was replaced with a description sentence — name field likely now reads like a sentence). Restore a proper short name ("Murukulu") and keep the description as-is.
- Verify all swapped images resolve correctly.

### 3. Smooth menu animation
In `src/components/MenuSection.tsx`:
- The current `AnimatePresence mode="wait"` re-mounts the entire grid on every tab change, which feels abrupt and re-runs every card's entry animation.
- Switch to a smoother approach: keep the grid mounted, animate individual cards with a subtle stagger using `motion` + `layout`, and use a gentler spring for the active tab pill.
- Add `layout` prop on the grid container and cards so filtering reflows smoothly instead of hard-cutting.
- Slightly slow tab pill spring (stiffness ~300, damping ~30) and shorten card fade/translate for snappier-but-smoother feel.

### Files touched
- `src/lib/whatsapp.ts` — phone constants
- `src/data/menu.ts` — restore Murukulu name if mangled
- `src/components/MenuSection.tsx` — smoother filter/tab animation
- `src/components/MenuCard.tsx` — add `layout` prop, tune transition (read first to confirm)
