import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-andhra-spread.jpg";
import { WhatsAppButton } from "./WhatsAppButton";
import { heroOrder } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-warm grain">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 md:grid-cols-2 md:gap-16 md:px-8 md:pb-24 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-cream/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Homemade · Andhra Pradesh
            </span>

            <h1 className="mt-6 text-balance font-serif text-4xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
              Taste of Andhra,
              <span className="block text-primary">Away From Home.</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Authentic homemade Andhra sweets, snacks, pickles and podis —
              made in small batches with traditional recipes and delivered with
              the warmth of home.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppButton message={heroOrder} size="lg">
                Order on WhatsApp
              </WhatsAppButton>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-4 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                View Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>★★★★★ 500+ happy homes</span>
              <span className="hidden h-3 w-px bg-border md:block" />
              <span>Pan-India delivery</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-hover">
              <img
                src={heroImg}
                alt="A premium spread of Andhra homemade pickles, sweets and snacks"
                width={1600}
                height={1200}
                className="h-[420px] w-full object-cover md:h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-5 left-4 hidden rounded-2xl bg-card/95 p-4 shadow-card backdrop-blur md:left-6 md:flex md:items-center md:gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-turmeric/20 text-2xl">
                🌶️
              </div>
              <div>
                <p className="font-serif text-sm text-foreground">Sun-cured Avakaya</p>
                <p className="text-xs text-muted-foreground">Slow-aged 21 days</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 right-4 hidden rounded-2xl bg-card/95 p-3 shadow-card backdrop-blur md:right-6 md:block"
            >
              <p className="font-script text-xl text-primary">"like home"</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
