import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { MENU } from "@/data/menu";

// Reuse 8 menu images as IG tiles
const TILES = [
  "avakaya", "ariselu", "chicken-pickle", "karam-podi",
  "gongura", "boondi-laddu", "andhra-mixture", "pootharekulu",
].map((id) => MENU.find((m) => m.id === id)!).filter(Boolean);

export function InstagramGallery() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="@nrp.foods"
          title="From our kitchen to your screen."
          subtitle="A glimpse of what's bubbling, frying and being jarred this week."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {TILES.map((t, i) => (
            <motion.a
              key={t.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
              aria-label={`View ${t.name} on Instagram`}
            >
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-cocoa/0 transition-colors duration-300 group-hover:bg-cocoa/50">
                <Instagram className="h-7 w-7 text-cream opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
