import { createFileRoute } from "@tanstack/react-router";
import { Reviews } from "@/components/Reviews";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Home Made Foods" },
      { name: "description", content: "What Andhra families across India are saying about our homemade pickles, sweets, snacks and podis." },
      { property: "og:title", content: "Reviews — Home Made Foods" },
      { property: "og:description", content: "Real reviews from real customers — homemade Andhra food, delivered with love." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <section className="pt-10 md:pt-16">
      <SectionHeading
        eyebrow="Reviews"
        title="500+ Andhra families. One taste of home."
        subtitle="Honest words from people who've tasted, shared and re-ordered."
      />
      <div className="-mt-6">
        <Reviews />
      </div>
    </section>
  );
}
