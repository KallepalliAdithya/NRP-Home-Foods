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
      <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
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

      <AnimatePresence mode="wait">
        <motion.div
          key={active + (full ? "-full" : "-teaser")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
