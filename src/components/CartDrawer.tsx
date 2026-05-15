import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/store/cart";
import { cartCheckoutMsg, formatINR, waLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count, clear } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(v) => (v ? null : close())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-serif text-2xl text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <p className="mt-4 font-serif text-xl text-foreground">Your cart is empty</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Add a jar of pickle, a tin of laddu, or a packet of podi — straight from amma's kitchen.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.key}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-soft"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-base text-foreground">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">{item.weight.label}</p>
                        </div>
                        <button
                          onClick={() => remove(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border border-border/70 bg-background">
                          <button
                            onClick={() => setQty(item.key, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-foreground/80 hover:text-primary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium tabular-nums">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.key, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-foreground/80 hover:text-primary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-serif text-base text-primary">
                          {formatINR(item.qty * item.unitPrice)}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/60 bg-card/60 px-6 py-5 backdrop-blur">
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Subtotal</span>
              <span className="font-serif text-2xl text-foreground">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              You'll confirm address & delivery on WhatsApp.
            </p>
            <a
              href={waLink(cartCheckoutMsg(items, subtotal))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-sm font-semibold text-white shadow-hover transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
              Checkout on WhatsApp
            </a>
            <button
              onClick={clear}
              className="mt-3 w-full text-center text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
            >
              Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
