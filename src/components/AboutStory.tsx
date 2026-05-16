import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import about from "@/assets/about-hands.png";

export function AboutStory({ compact = false }: { compact?: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <img
              src={about}
              alt="A pair of hands carefully filling a glass jar with homemade Andhra pickle"
              loading="lazy"
              width={1200}
              height={1000}
              className="h-[420px] w-full object-cover md:h-[540px]"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-primary px-6 py-5 text-primary-foreground shadow-hover md:block">
            <p className="font-script text-3xl leading-none">Made with love</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] opacity-80">Since the very first jar</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Our story</p>
          <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-5xl">
            Born from longing, served with love.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Home Made Foods began in a small Andhra kitchen, with a daughter calling
              home and asking — "Amma, can you send me a jar of avakaya?"
              That one jar became two, then ten, then a family of recipes
              travelling across cities and oceans.
            </p>
            <p>
              We hand-pick mangoes in season, sun-cure them on cotton cloth,
              and pour cold-pressed sesame oil over freshly pounded mustard
              and chilli. Every sweet is shaped by hand. Every podi is roasted
              in small batches. Nothing is rushed. Nothing is faked.
            </p>
            {!compact && (
              <p>
                If you grew up on Sunday meals of curd-rice with avakaya, on
                Sankranti mornings filled with the smell of frying ariselu —
                we made Home Made Foods for you.
              </p>
            )}
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
      </div>
    </section>
  );
}
