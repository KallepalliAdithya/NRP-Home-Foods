import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-nrp.png";
import { WhatsAppButton } from "./WhatsAppButton";
import { WHATSAPP_DISPLAY, generalEnquiry } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cocoa text-cream/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="NRP" className="h-12 w-12 object-contain" width={48} height={48} />
            <span className="font-serif text-2xl font-semibold text-cream">NRP</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            Homemade Andhra sweets, snacks, pickles and podis — packed fresh,
            delivered with the warmth of home. Taste of Andhra, away from home.
          </p>
          <div className="mt-6">
            <WhatsAppButton message={generalEnquiry} variant="ghost" size="md">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About" },
              { to: "/reviews", label: "Reviews" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/70 hover:text-turmeric">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-turmeric" />
              <span>Andhra Pradesh, India · Pan-India delivery</span>
            </li>
            <li>
              <a href={`tel:${WHATSAPP_DISPLAY.replace(/\s/g, "")}`} className="hover:text-turmeric">
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-cream/10 p-2 hover:bg-turmeric hover:text-cocoa">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-cream/10 p-2 hover:bg-turmeric hover:text-cocoa">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="mailto:hello@nrpfoods.in" aria-label="Email" className="rounded-full bg-cream/10 p-2 hover:bg-turmeric hover:text-cocoa">
                <Mail className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-cream/60 md:px-8">
          © {new Date().getFullYear()} NRP Homemade Foods. Crafted with care from Andhra.
        </div>
      </div>
    </footer>
  );
}
