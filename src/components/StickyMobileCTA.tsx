import { WhatsAppButton } from "./WhatsAppButton";
import { heroOrder } from "@/lib/whatsapp";
import { Link } from "@tanstack/react-router";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <Link
          to="/menu"
          className="flex-1 rounded-full border border-primary/30 px-4 py-3 text-center text-sm font-medium text-primary"
        >
          View Menu
        </Link>
        <WhatsAppButton message={heroOrder} variant="primary" size="md" className="flex-1">
          Order Now
        </WhatsAppButton>
      </div>
    </div>
  );
}
