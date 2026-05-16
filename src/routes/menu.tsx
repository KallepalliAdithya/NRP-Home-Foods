import { createFileRoute } from "@tanstack/react-router";
import { MenuSection } from "@/components/MenuSection";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Home Made Foods" },
      { name: "description", content: "Browse the full menu: Andhra sweets, snacks, veg & non-veg pickles, and traditional podis. Order any item on WhatsApp." },
      { property: "og:title", content: "Menu — Home Made Foods" },
      { property: "og:description", content: "Andhra sweets, snacks, pickles & podis — all homemade. Order on WhatsApp." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="The full menu"
        title="Pick a jar. We'll pack it like it's going home."
        subtitle="Tap any item to order on WhatsApp. Prices are for fresh, small-batch packs."
      />
      <MenuSection full />
    </section>
  );
}
