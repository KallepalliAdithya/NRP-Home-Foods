import { motion } from "motion/react";
import type { MenuItem } from "@/data/menu";
import { WhatsAppButton } from "./WhatsAppButton";
import { orderMsg } from "@/lib/whatsapp";

export function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.popular ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-card">
            Bestseller
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
          <div className="text-right">
            <p className="font-serif text-lg text-primary">₹{item.price}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.unit}</p>
          </div>
        </div>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="mt-5">
          <WhatsAppButton
            message={orderMsg(item.name)}
            variant="ghost"
            size="md"
            className="w-full"
            ariaLabel={`Order ${item.name} on WhatsApp`}
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </motion.article>
  );
}
