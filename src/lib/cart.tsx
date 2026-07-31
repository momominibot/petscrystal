"use client";

/**
 * The bag.
 *
 * Deliberately client-only and persisted to localStorage rather than to a
 * server session: there are no accounts on this site, and a bag that survives
 * a refresh is the whole of what a buyer expects. Nothing here is trusted —
 * the checkout route re-resolves every price from our own map, so a tampered
 * localStorage can change what you see in the drawer but never what you pay.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Collection, VariantKey } from "./variants";

export interface CartLine {
  productId: string;
  variant: VariantKey;
  quantity: number;
  /** Denormalised so the drawer can render without loading both catalogues. */
  name: string;
  collection: Collection;
  price: number;
  image: string;
  href: string;
}

const KEY = "petscrystals.bag.v1";
const MAX_QTY = 10;

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "quantity">, qty?: number) => void;
  setQuantity: (productId: string, variant: VariantKey, qty: number) => void;
  remove: (productId: string, variant: VariantKey) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  /** False until localStorage has been read, so SSR and first paint agree. */
  ready: boolean;
}

const CartContext = createContext<CartApi | null>(null);

const same = (a: CartLine, productId: string, variant: VariantKey) =>
  a.productId === productId && a.variant === variant;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Read once on mount. Reading during render would desync server and client
  // markup and trip a hydration mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed.filter(isLine));
      }
    } catch {
      // Corrupt or unavailable storage is not worth breaking the page over.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      // Private browsing can refuse writes; the bag just will not persist.
    }
  }, [lines, ready]);

  const add = useCallback((line: Omit<CartLine, "quantity">, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => same(l, line.productId, line.variant));
      if (i === -1) return [...prev, { ...line, quantity: Math.min(qty, MAX_QTY) }];
      const next = [...prev];
      next[i] = {
        ...next[i],
        quantity: Math.min(next[i].quantity + qty, MAX_QTY),
      };
      return next;
    });
  }, []);

  const setQuantity = useCallback(
    (productId: string, variant: VariantKey, qty: number) => {
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => !same(l, productId, variant))
          : prev.map((l) =>
              same(l, productId, variant)
                ? { ...l, quantity: Math.min(qty, MAX_QTY) }
                : l
            )
      );
    },
    []
  );

  const remove = useCallback((productId: string, variant: VariantKey) => {
    setLines((prev) => prev.filter((l) => !same(l, productId, variant)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.quantity, 0);
    return { lines, count, subtotal, add, setQuantity, remove, clear, open, setOpen, ready };
  }, [lines, add, setQuantity, remove, clear, open, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

function isLine(x: unknown): x is CartLine {
  if (!x || typeof x !== "object") return false;
  const l = x as Record<string, unknown>;
  return (
    typeof l.productId === "string" &&
    (l.variant === "pet" || l.variant === "owner" || l.variant === "set") &&
    typeof l.quantity === "number" &&
    l.quantity > 0
  );
}
