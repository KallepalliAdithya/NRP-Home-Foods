import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { MenuSection } from "@/components/MenuSection";
import { Reviews } from "@/components/Reviews";
import { InstagramGallery } from "@/components/InstagramGallery";
import { AboutStory } from "@/components/AboutStory";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { heroOrder } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NATURAL RECIPE PRODUCTS — Taste of Andhra, Away From Home" },
      { name: "description", content: "Authentic homemade Andhra sweets, snacks, pickles & podis. Order on WhatsApp — delivered with the warmth of home." },
      { property: "og:title", content: "NATURAL RECIPE PRODUCTS — Taste of Andhra, Away From Home" },
      { property: "og:description", content: "Homemade Andhra food, made with traditional recipes. Order on WhatsApp." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />

      <section id="menu" className="py-20 md:py-28">
        <SectionHeading
          eyebrow="Our Menu"
          title="A taste of every Andhra kitchen."
          subtitle="From sun-cured avakaya to soft ariselu — explore our most-loved homemade specialties."
        />
        <MenuSection full={false} />
        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all"
          >
            See full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AboutStory compact />

      <Reviews limit={3} />

      <InstagramGallery />

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <p className="font-script text-3xl text-primary md:text-4xl">— a jar away from home —</p>
          <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-5xl">
            Crave home? We're one WhatsApp away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Send us a message and we'll prepare your order with the same care your amma would.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton message={heroOrder} size="lg">
              Order on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
