import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Check } from "lucide-react";
import { defaultWeight, getWeights, priceFor, type MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart";
import { formatINR, orderMsg, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const weights = getWeights(item);
  const [weight, setWeight] = useState(() => defaultWeight(item));
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { add, open } = useCart();

  const unitPrice = priceFor(item, weight);

  const handleAdd = () => {
    add({
      id: item.id,
      name: item.name,
      image: item.image,
      weight,
      unitPrice,
      qty,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-shadow duration-300 hover:shadow-hover"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.popular ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-card">
            Bestseller
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={unitPrice}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="text-right"
            >
              <p className="font-serif text-lg text-primary">{formatINR(unitPrice)}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{weight.label}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Weight selector */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {weights.map((w) => {
            const active = w.label === weight.label;
            return (
              <button
                key={w.label}
                onClick={() => setWeight(w)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-background text-foreground/70 hover:border-primary/40 hover:text-primary",
                )}
              >
                {w.label}
              </button>
            );
          })}
        </div>

        {/* Qty + Add to cart */}
        <div className="mt-4 flex items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center text-foreground/80 hover:text-primary"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-medium tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center text-foreground/80 hover:text-primary"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-card transition-colors",
              justAdded
                ? "bg-curry text-primary-foreground"
                : "bg-primary text-primary-foreground hover:shadow-hover",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Check className="h-4 w-4" /> Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  Add to cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <button
            onClick={open}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            View cart →
          </button>
          <a
            href={waLink(orderMsg(`${item.name} (${weight.label})`))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-whatsapp transition-colors hover:underline"
          >
            Quick WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}
