import { createFileRoute } from "@tanstack/react-router";
import { AboutStory } from "@/components/AboutStory";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalEnquiry } from "@/lib/whatsapp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Home Made Foods" },
      { name: "description", content: "The story of Home Made Foods: a small Andhra kitchen, traditional recipes, and a promise to deliver the taste of home." },
      { property: "og:title", content: "About — Home Made Foods" },
      { property: "og:description", content: "Born from longing, served with love. Home Made Foods brings homemade Andhra food to families away from home." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-warm grain pb-4 pt-14 md:pt-20">
        <SectionHeading
          eyebrow="About Home Made Foods"
          title="A kitchen that travels with you."
          subtitle="Slow-cooked recipes from Andhra Pradesh, made fresh and packed with care."
        />
      </section>
      <AboutStory />
      <WhyChooseUs />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">Have a question?</h2>
          <p className="mt-3 text-muted-foreground">
            We're a small team — and we love hearing from you.
          </p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton message={generalEnquiry} size="lg">
              Chat with us
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
