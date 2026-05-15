import { motion } from "motion/react";
import { Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { SectionHeading } from "./SectionHeading";

export function Reviews({ limit }: { limit?: number }) {
  const list = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  return (
    <section className="bg-gradient-warm grain py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Loved by Andhra families"
          title="Tastes that bring tears, smiles & second helpings."
          subtitle="From Bengaluru to Boston — here's what our community is saying."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-hover"
            >
              <div className="flex gap-1 text-turmeric">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 text-pretty font-serif text-lg leading-relaxed text-foreground">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-serif text-primary">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.city}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
