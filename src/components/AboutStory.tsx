import { motion } from "motion/react";
import { BookOpen, Leaf, Heart, Sparkles } from "lucide-react";
import about from "@/assets/about-hands.png";

const features = [
  { icon: BookOpen, label: "Traditional Recipes" },
  { icon: Leaf, label: "Pure Ingredients" },
  { icon: Heart, label: "Made with Love" },
  { icon: Sparkles, label: "Small Batch Freshness" },
];

export function AboutStory({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-gradient-warm py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        {/* LEFT — content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary/50" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Our Story
            </p>
          </div>

          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.1] text-primary md:text-5xl lg:text-6xl">
            Amma Cheti Vanta, Always.
          </h2>

          <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary/40 to-transparent" />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every jar, every sweet, every snack carries the warmth of home.
            Inspired by authentic Andhra traditions, our recipes are lovingly
            prepared in small batches using trusted ingredients — bringing the
            taste of home to your doorstep.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 md:gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-background/60 text-primary shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-hover">
                  <f.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-xs font-medium leading-tight text-foreground/80">
                  {f.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — uploaded image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-hover">
            <img
              src={about}
              alt="Amma's hands serving freshly made Andhra pickle from a clay pot — traditional homemade recipe"
              loading="lazy"
              width={1500}
              height={1000}
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
            {/* Soft fade/blend on the left edge so the image melts into the cream background */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
