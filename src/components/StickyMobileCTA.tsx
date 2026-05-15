import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { heroOrder, formatINR } from "@/lib/whatsapp";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/store/cart";

export function StickyMobileCTA() {
  const { count, subtotal, open } = useCart();
  const hasItems = count > 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/40 bg-background/80 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {hasItems ? (
            <motion.button
              key="cart"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onClick={open}
              className="flex flex-1 items-center justify-between gap-2 rounded-full bg-primary px-5 py-3 text-left text-primary-foreground shadow-card"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="text-sm font-semibold">{count} {count === 1 ? "item" : "items"}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="font-serif text-base">{formatINR(subtotal)}</span>
                <span className="text-xs uppercase tracking-wider opacity-90">View →</span>
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-1 items-center gap-2"
            >
              <Link
                to="/menu"
                className="flex-1 rounded-full border border-primary/30 px-4 py-3 text-center text-sm font-medium text-primary"
              >
                View Menu
              </Link>
              <WhatsAppButton message={heroOrder} variant="primary" size="md" className="flex-1">
                Order Now
              </WhatsAppButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
