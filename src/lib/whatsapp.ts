import type { CartItem } from "@/store/cart";

export const WHATSAPP_NUMBER = "919390524599";
export const WHATSAPP_DISPLAY = "+91 93905 24599";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const orderMsg = (item: string) => `Hi NATURAL RECIPE PRODUCTS, I want to order ${item}.`;
export const generalEnquiry = "Hi NATURAL RECIPE PRODUCTS, I'd like to know more about your homemade Andhra food.";
export const heroOrder = "Hi NATURAL RECIPE PRODUCTS, I'd like to place an order.";

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function cartCheckoutMsg(items: CartItem[], subtotal: number): string {
  if (items.length === 0) return heroOrder;
  const lines = items.map((i) => {
    const line = i.qty * i.unitPrice;
    return `• ${i.name} — ${i.weight.label} × ${i.qty} = ${formatINR(line)}`;
  });
  return [
    "Hi NATURAL RECIPE PRODUCTS, I'd like to place this order:",
    "",
    ...lines,
    "—",
    `Subtotal: ${formatINR(subtotal)}`,
    "",
    "Name: ",
    "Address: ",
    "Pincode: ",
  ].join("\n");
}
