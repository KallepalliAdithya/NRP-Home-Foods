import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import logo from "@/assets/logo-nrp.jpg";
import { WhatsAppButton } from "./WhatsAppButton";
import { CartButton } from "./CartButton";
import { heroOrder } from "@/lib/whatsapp";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.88]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/60 shadow-soft backdrop-blur-xl"
          : "bg-background/0 backdrop-blur-0"
      }`}
    >
      <motion.div
        animate={{ paddingTop: scrolled ? 8 : 14, paddingBottom: scrolled ? 8 : 14 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8"
      >
        <Link to="/" className="flex items-center gap-2" aria-label="NATURAL RECIPE PRODUCTS home">
          <motion.img
            style={{ scale: logoScale }}
            src={logo}
            alt="NATURAL RECIPE PRODUCTS"
            className="h-10 w-10 object-contain md:h-12 md:w-12"
            width={48}
            height={48}
          />
          <span className="font-serif text-xl font-semibold text-primary md:text-2xl">NATURAL RECIPE PRODUCTS</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CartButton />
          <WhatsAppButton message={heroOrder} size="md">
            Order
          </WhatsAppButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/40 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-secondary"
                  activeProps={{ className: "text-primary bg-secondary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <WhatsAppButton message={heroOrder} className="w-full" size="lg">
                  Order on WhatsApp
                </WhatsAppButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
