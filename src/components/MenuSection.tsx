import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, MENU, type CategoryId } from "@/data/menu";
import { MenuCard } from "./MenuCard";

type Props = {
  /** When true, show ALL items per category. When false, show first 4 per all-tab. */
  full?: boolean;
};

type Tab = "all" | CategoryId;

export function MenuSection({ full = false }: Props) {
  const [active, setActive] = useState<Tab>("all");

  const tabs: { id: Tab; label: string }[] = useMemo(
    () => [{ id: "all", label: "All" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))],
    [],
  );

  const items = useMemo(() => {
    const filtered = active === "all" ? MENU : MENU.filter((i) => i.category === active);
    if (!full && active === "all") {
      // Teaser: 8 popular-or-first items
      const popular = filtered.filter((i) => i.popular);
      const rest = filtered.filter((i) => !i.popular);
      return [...popular, ...rest].slice(0, 8);
    }
    return filtered;
  }, [active, full]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div
        className={`mt-10 flex flex-wrap justify-center gap-2 md:gap-3 ${
          full
            ? "sticky top-[64px] z-30 -mx-4 rounded-2xl border border-border/40 bg-background/70 px-4 py-3 backdrop-blur-xl md:top-[80px] md:mx-0"
            : ""
        }`}
      >
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-primary"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-card"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.45,
                delay: Math.min(i, 7) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <MenuCard item={item} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
