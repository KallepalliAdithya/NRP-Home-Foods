import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink, generalEnquiry } from "@/lib/whatsapp";
import { useCart } from "@/store/cart";

export function FloatingWhatsApp() {
  const { isOpen } = useCart();
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.a
          href={waLink(generalEnquiry)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with NRP on WhatsApp"
          className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-hover md:bottom-6 md:right-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="absolute inset-0 rounded-full bg-whatsapp opacity-30 animate-ping" />
          <MessageCircle className="relative h-7 w-7" strokeWidth={2.2} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
