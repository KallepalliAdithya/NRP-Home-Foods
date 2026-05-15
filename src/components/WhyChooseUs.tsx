import { motion } from "motion/react";
import { ChefHat, Flame, Leaf, Sparkles, Soup, Truck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const ITEMS = [
  { icon: ChefHat, title: "Homemade Recipes", text: "Family recipes passed down across generations." },
  { icon: Flame, title: "Authentic Andhra Taste", text: "True Andhra heat, depth and aroma — no shortcuts." },
  { icon: Leaf, title: "Fresh Ingredients", text: "Hand-picked produce, cold-pressed sesame oil, real spices." },
  { icon: Sparkles, title: "Hygienic Preparation", text: "Made in a clean small-batch kitchen, sealed with care." },
  { icon: Soup, title: "Traditional Cooking", text: "Slow-cooked, sun-cured and hand-pounded the old way." },
  { icon: Truck, title: "Fast Delivery", text: "Carefully packed and shipped pan-India within days." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Why NRP"
          title="Made the way home would make it."
          subtitle="Every jar, every podi packet carries the same care a mother puts into food for her children."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turmeric-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
