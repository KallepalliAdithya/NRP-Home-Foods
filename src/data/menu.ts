// Supabase-ready menu schema. When migrating, this shape maps 1:1 to a
// `menu_items` table; the imported image asset becomes a storage URL.

import ariselu from "@/assets/menu/ariselu.jpg";
import pootharekulu from "@/assets/menu/pootharekulu.jpg";
import boondiLaddu from "@/assets/menu/boondi-laddu.jpg";
import gavvalu from "@/assets/menu/gavvalu.jpg";
import janthikalu from "@/assets/menu/janthikalu.jpg";
import chekkalu from "@/assets/menu/chekkalu.jpg";
import murukulu from "@/assets/menu/murukulu.jpg";
import andhraMixture from "@/assets/menu/andhra-mixture.jpg";
import avakaya from "@/assets/menu/avakaya.png";
import gongura from "@/assets/menu/gongura.jpg";
import tomatoPickle from "@/assets/menu/tomato-pickle.jpg";
import lemonPickle from "@/assets/menu/lemon-pickle.jpg";
import chickenPickle from "@/assets/menu/chicken-pickle.jpg";
import prawnPickle from "@/assets/menu/prawn-pickle.jpg";
import fishPickle from "@/assets/menu/fish-pickle.jpg";
import muttonPickle from "@/assets/menu/mutton-pickle.jpg";
import karamPodi from "@/assets/menu/karam-podi.jpg";
import idliPodi from "@/assets/menu/idli-podi.jpg";
import curryLeafPodi from "@/assets/menu/curry-leaf-podi.jpg";
import peanutPodi from "@/assets/menu/peanut-podi.jpg";

export type CategoryId =
  | "sweets"
  | "snacks"
  | "veg-pickles"
  | "non-veg-pickles"
  | "podi";

export type WeightOption = { label: string; grams: number; multiplier: number };

export type MenuItem = {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  price: number; // INR — base price for the default unit
  unit: string;
  image: string;
  popular?: boolean;
  weights?: WeightOption[];
};

const PRESETS: Record<CategoryId, WeightOption[]> = {
  sweets: [
    { label: "250 g", grams: 250, multiplier: 1 },
    { label: "500 g", grams: 500, multiplier: 1.9 },
    { label: "1 kg", grams: 1000, multiplier: 3.6 },
  ],
  snacks: [
    { label: "250 g", grams: 250, multiplier: 1 },
    { label: "500 g", grams: 500, multiplier: 1.9 },
  ],
  "veg-pickles": [
    { label: "250 g", grams: 250, multiplier: 0.55 },
    { label: "500 g", grams: 500, multiplier: 1 },
    { label: "1 kg", grams: 1000, multiplier: 1.9 },
  ],
  "non-veg-pickles": [
    { label: "250 g", grams: 250, multiplier: 1 },
    { label: "500 g", grams: 500, multiplier: 1.9 },
  ],
  podi: [
    { label: "100 g", grams: 100, multiplier: 0.55 },
    { label: "200 g", grams: 200, multiplier: 1 },
    { label: "500 g", grams: 500, multiplier: 2.3 },
  ],
};

export function getWeights(item: MenuItem): WeightOption[] {
  return item.weights ?? PRESETS[item.category];
}

export function defaultWeight(item: MenuItem): WeightOption {
  const weights = getWeights(item);
  return weights.find((w) => w.multiplier === 1) ?? weights[0];
}

export function priceFor(item: MenuItem, weight: WeightOption): number {
  return Math.round(item.price * weight.multiplier);
}

export const CATEGORIES: { id: CategoryId; label: string; tagline: string }[] = [
  { id: "sweets", label: "Sweets", tagline: "Festive jaggery & ghee classics" },
  { id: "snacks", label: "Snacks & Hots", tagline: "Crispy, spicy tea-time joys" },
  { id: "veg-pickles", label: "Veg Pickles", tagline: "Sun-cured Andhra flavours" },
  { id: "non-veg-pickles", label: "Non-Veg Pickles", tagline: "Slow-cooked, deeply spiced" },
  { id: "podi", label: "Podis", tagline: "Hand-pounded spice powders" },
];

export const MENU: MenuItem[] = [
  // Sweets
  { id: "ariselu", category: "sweets", name: "Ariselu", description: "Soft jaggery–rice flour discs, fried in ghee till deep gold.", price: 380, unit: "250 g", image: ariselu, popular: true },
  { id: "pootharekulu", category: "sweets", name: "Pootharekulu", description: "Paper-thin rice sheets layered with ghee, sugar & dry fruit.", price: 450, unit: "250 g", image: pootharekulu, popular: true },
  { id: "boondi-laddu", category: "sweets", name: "Golden gram-Made Rich Quality Dry fruits and flour pearls bound in fragrant cardamom syrup.", description: "Golden gram-flour pearls bound in fragrant cardamom syrup.", price: 320, unit: "500 g (12 pcs)", image: boondiLaddu },
  { id: "gavvalu", category: "sweets", name: "Bellam Gavvalu", description: "Shell-shaped crispies dipped in slow-cooked jaggery glaze.", price: 280, unit: "250 g", image: gavvalu },

  // Snacks
  { id: "janthikalu", category: "snacks", name: "Janthikalu", description: "Hand-pressed rice flour spirals — crisp, light & savoury.", price: 220, unit: "250 g", image: janthikalu, popular: true },
  { id: "chekkalu", category: "snacks", name: "Chekkalu", description: "Thin rice crackers studded with sesame, peanut & curry leaf.", price: 240, unit: "250 g", image: chekkalu },
  { id: "murukulu", category: "snacks", name: "Murukulu", description: "Coiled, crunchy spice rings — perfect with evening chai.", price: 220, unit: "250 g", image: murukulu },
  { id: "andhra-mixture", category: "snacks", name: "Andhra Mixture", description: "A fiery medley of sev, peanut, dal & curry leaf.", price: 260, unit: "250 g", image: andhraMixture, popular: true },

  // Veg pickles
  { id: "avakaya", category: "veg-pickles", name: "Avakaya", description: "The legendary raw mango pickle — mustard, chilli, sesame oil.", price: 480, unit: "500 g", image: avakaya, popular: true },
  { id: "gongura", category: "veg-pickles", name: "Amla Pickle", description: "Tangy sorrel leaves slow-cooked with garlic & red chilli.", price: 460, unit: "500 g", image: gongura, popular: true },
  { id: "tomato-pickle", category: "veg-pickles", name: "Tomato Pickle", description: "Sun-ripened tomatoes tempered with mustard & curry leaf.", price: 380, unit: "500 g", image: tomatoPickle },
  { id: "lemon-pickle", category: "veg-pickles", name: "Lemon Pickle", description: "Aged lemon wedges in turmeric, salt & green chilli.", price: 340, unit: "500 g", image: lemonPickle },

  // Non-veg pickles
  { id: "chicken-pickle", category: "non-veg-pickles", name: "Chicken Pickle", description: "Natukodi chicken in a deep, oily Andhra masala — bold & rich.", price: 680, unit: "250 g", image: chickenPickle, popular: true },
  { id: "prawn-pickle", category: "non-veg-pickles", name: "Prawn Pickle", description: "Tender prawns simmered with garlic, chilli & sesame oil.", price: 720, unit: "250 g", image: prawnPickle },
  { id: "fish-pickle", category: "non-veg-pickles", name: "Fish Pickle", description: "Boneless fish chunks in tangy, fiery Andhra spice oil.", price: 650, unit: "250 g", image: fishPickle },
  { id: "mutton-pickle", category: "non-veg-pickles", name: "Mutton Pickle", description: "Slow-cooked mutton, deeply spiced — a heritage recipe.", price: 780, unit: "250 g", image: muttonPickle },

  // Podis
  { id: "karam-podi", category: "podi", name: "Rich, Spicy & Aromatic Straight from Guntur", description: "The classic red chilli–garlic podi — heat with depth.", price: 240, unit: "200 g", image: karamPodi, popular: true },
  { id: "idli-podi", category: "podi", name: "KAKARAKAYA PODI", description: "Unique, Healthy & Traditional Made with Bitter Gourd", price: 220, unit: "200 g", image: idliPodi },
  { id: "curry-leaf-podi", category: "podi", name: "Protein Rich & Delicious Made with Roasted Toor Dal", description: "Aromatic curry leaves ground with dal & dry red chilli.", price: 240, unit: "200 g", image: curryLeafPodi },
  { id: "peanut-podi", category: "podi", name: "Peanut Podi", description: "Roasted peanut, garlic & chilli — comfort in a spoonful.", price: 220, unit: "200 g", image: peanutPodi },
];
