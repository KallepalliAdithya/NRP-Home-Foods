import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink, generalEnquiry } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink(generalEnquiry)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NRP on WhatsApp"
      className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-hover"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
      <MessageCircle className="relative h-7 w-7" strokeWidth={2.2} />
    </motion.a>
  );
}
