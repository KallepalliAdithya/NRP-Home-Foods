import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "icon";

type Props = {
  message: string;
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground rounded-full shadow-card hover:shadow-hover hover:-translate-y-0.5",
  ghost:
    "bg-whatsapp text-white rounded-full hover:brightness-110 shadow-soft",
  outline:
    "border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-primary-foreground",
  icon: "bg-whatsapp text-white rounded-full shadow-hover hover:scale-105",
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}: Props) {
  if (variant === "icon") {
    return (
      <motion.a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel ?? "Order on WhatsApp"}
        className={cn(base, variants.icon, "h-12 w-12 p-0", className)}
        whileTap={{ scale: 0.94 }}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
      </motion.a>
    );
  }

  return (
    <motion.a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? "Order on WhatsApp"}
      className={cn(base, variants[variant], sizes[size], className)}
      whileTap={{ scale: 0.97 }}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
      {children ?? "Order on WhatsApp"}
    </motion.a>
  );
}
