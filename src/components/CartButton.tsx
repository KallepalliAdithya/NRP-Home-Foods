import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const { count, toggle } = useCart();
  return (
    <button
      onClick={toggle}
      aria-label={`Open cart (${count} items)`}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/70 text-foreground shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:text-primary hover:shadow-card",
        className,
      )}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={2} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0, y: -4 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground shadow-card"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
