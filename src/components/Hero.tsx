import { motion } from "motion/react";
import heroBg from "@/assets/hero-bg.png";

export function Hero() {
  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/menu";
    }
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="relative min-h-[600px] w-full bg-cover bg-center md:min-h-[720px]"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-4 py-20 md:min-h-[720px] md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-turmeric" />
              100% Homemade • Made with love in Andhra
            </span>

            <h1 className="mt-6 text-balance font-serif text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Taste of Andhra,
              <span className="block text-turmeric">Away From Home</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/85 md:text-lg">
              Authentic Telugu homemade pickles, sweets, snacks & podis — crafted with traditional homemade care.
            </p>

            <div className="mt-8">
              <a
                href="/menu"
                onClick={handleExplore}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-hover transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Explore Menu
              </a>
            </div>

            <p className="mt-6 text-sm font-medium text-white/90">
              ⭐ 5,000+ happy families served
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
