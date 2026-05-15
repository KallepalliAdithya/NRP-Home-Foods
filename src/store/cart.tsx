import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";

export type CartWeight = { label: string; grams: number; multiplier: number };

export type CartItem = {
  key: string; // id + weight.label
  id: string;
  name: string;
  image: string;
  weight: CartWeight;
  qty: number;
  unitPrice: number; // price after multiplier, per pack
};

type State = { items: CartItem[]; isOpen: boolean };

type Action =
  | { type: "ADD"; item: Omit<CartItem, "key" | "qty"> & { qty?: number } }
  | { type: "REMOVE"; key: string }
  | { type: "SET_QTY"; key: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "nrp_cart_v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const key = `${action.item.id}__${action.item.weight.label}`;
      const existing = state.items.find((i) => i.key === key);
      const addQty = action.item.qty ?? 1;
      const items = existing
        ? state.items.map((i) => (i.key === key ? { ...i, qty: i.qty + addQty } : i))
        : [...state.items, { ...action.item, key, qty: addQty }];
      return { ...state, items };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case "SET_QTY":
      return {
        ...state,
        items: state.items
          .map((i) => (i.key === action.key ? { ...i, qty: Math.max(0, action.qty) } : i))
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "key" | "qty"> & { qty?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        if (Array.isArray(items)) dispatch({ type: "HYDRATE", items });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
    return {
      items: state.items,
      isOpen: state.isOpen,
      count,
      subtotal,
      add: (item) => dispatch({ type: "ADD", item }),
      remove: (key) => dispatch({ type: "REMOVE", key }),
      setQty: (key, qty) => dispatch({ type: "SET_QTY", key, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      open: () => dispatch({ type: "OPEN" }),
      close: () => dispatch({ type: "CLOSE" }),
      toggle: () => dispatch({ type: "TOGGLE" }),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
