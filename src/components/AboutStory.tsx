import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Leaf, Heart, Sparkles } from "lucide-react";
import about from "@/assets/about-hands.png";

const FEATURES = [
  { icon: BookOpen, label: "Traditional Recipes" },
  { icon: Leaf, label: "Pure Ingredients" },
  { icon: Heart, label: "Made with Love" },
  { icon: Sparkles, label: "Small Batch Freshness" },
];

export function AboutStory({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-gradient-warm grain py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-2 md:order-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Our Story
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-5xl">
            Amma Cheti Vanta, Always.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Born in a small Andhra kitchen, NATURAL RECIPE PRODUCTS carries the
              warmth of amma's hands into every jar — sun-cured mangoes,
              cold-pressed sesame oil, and recipes passed down through generations.
            </p>
            {!compact && (
              <p>
                Nothing rushed. Nothing faked. Just the honest taste of home,
                delivered with the same care your amma would.
              </p>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 px-4 py-3 backdrop-blur-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>

          {compact ? (
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Read the full story
            </Link>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative order-1 md:order-2"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <img
              src={about}
              alt="Andhra homemade pickle being served from a clay pot with brass vessels, dried chillies, mustard seeds and fresh mangoes"
              loading="lazy"
              width={1500}
              height={1000}
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_20px_rgba(35,20,10,0.25)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
