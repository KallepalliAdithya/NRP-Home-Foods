import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Truck, Clock, Instagram, Facebook, Mail } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WHATSAPP_DISPLAY, generalEnquiry } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Home Made Foods" },
      { name: "description", content: "Order homemade Andhra pickles, sweets, snacks and podis on WhatsApp at +91 9390524599. Pan-India delivery." },
      { property: "og:title", content: "Contact Home Made Foods" },
      { property: "og:description", content: "WhatsApp +91 9390524599 to order homemade Andhra food. Delivered pan-India." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-gradient-warm grain pt-14 md:pt-20">
        <SectionHeading
          eyebrow="Contact"
          title="One message away from home."
          subtitle="WhatsApp is the easiest way to reach us. We usually reply within minutes."
        />
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-8">
          {/* WhatsApp big card */}
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-hover md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-80">Order or enquire</p>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">WhatsApp us</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-90">
              Send a message with the items you'd like. We'll confirm the order,
              share delivery details and pack it fresh.
            </p>
            <p className="mt-8 font-serif text-2xl">{WHATSAPP_DISPLAY}</p>
            <div className="mt-6">
              <WhatsAppButton message={generalEnquiry} variant="ghost" size="lg">
                Open WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid gap-4">
            <InfoCard icon={Phone} title="Call / WhatsApp" lines={[WHATSAPP_DISPLAY]} />
            <InfoCard icon={Truck} title="Delivery" lines={["Pan-India · 3–6 business days", "Free shipping above ₹1,500"]} />
            <InfoCard icon={Clock} title="Order timings" lines={["Mon–Sat · 9 AM to 8 PM IST", "Sunday: limited replies"]} />
            <InfoCard icon={MapPin} title="Kitchen" lines={["Andhra Pradesh, India"]} />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-card p-6">
            <p className="font-serif text-lg text-foreground">Find us on social</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Mail, href: "mailto:hello@nrpfoods.in", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full bg-secondary p-3 text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-turmeric-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-serif text-lg text-foreground">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-muted-foreground">{l}</p>
        ))}
      </div>
    </div>
  );
}
