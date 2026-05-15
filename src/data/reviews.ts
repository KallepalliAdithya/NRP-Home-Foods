export type Review = {
  name: string;
  city: string;
  text: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    name: "Lakshmi Reddy",
    city: "Bengaluru",
    rating: 5,
    text: "The avakaya took me straight back to my mother's kitchen in Vijayawada. The smell, the heat, the oil — exactly the same. I ordered three jars in a week.",
  },
  {
    name: "Karthik Varma",
    city: "Hyderabad",
    rating: 5,
    text: "Ariselu that actually tastes like Sankranti at home. Soft inside, crisp outside, real jaggery flavour. My wife thought I had it shipped from Eluru.",
  },
  {
    name: "Sravani M.",
    city: "Pune",
    rating: 5,
    text: "I've been searching for honest gongura pickle for years. NRP's version is tangy, garlicky, perfectly oiled. Finally something that feels homemade.",
  },
  {
    name: "Prasad Rao",
    city: "Mumbai",
    rating: 5,
    text: "The chicken pickle is a knockout — slow-cooked, dark, rich. Pairs beautifully with hot rice and ghee. NRP has earned a permanent spot in my fridge.",
  },
  {
    name: "Anitha Devi",
    city: "Chennai",
    rating: 5,
    text: "Karam podi the way my ammamma used to pound it. Hand-mixed with hot rice and a spoon of ghee — pure joy. Quick WhatsApp ordering too.",
  },
  {
    name: "Vikram S.",
    city: "Delhi NCR",
    rating: 5,
    text: "Murukulu and mixture stay crisp for weeks. Packing is careful, delivery is quick. Authentic Andhra flavour — no shortcuts, no compromises.",
  },
];
