export const WHATSAPP_NUMBER = "916281473558";
export const WHATSAPP_DISPLAY = "+91 62814 73558";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const orderMsg = (item: string) => `Hi NRP, I want to order ${item}.`;
export const generalEnquiry = "Hi NRP, I'd like to know more about your homemade Andhra food.";
export const heroOrder = "Hi NRP, I'd like to place an order.";
