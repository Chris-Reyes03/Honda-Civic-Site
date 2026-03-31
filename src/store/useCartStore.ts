import { create } from 'zustand';

// Defining the shape of your product based on your array
export interface Product {
  id: number;
  name: string;
  imagePath: string;
  currentPrice: string; // e.g., "₱14,300.00"
  oldPrice: string;
  rating: string;
  onSale: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  getTotalPrice: () => string;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.id === product.id);
    if (existing) {
      return {
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ),
  })),

  getTotalPrice: () => {
    const total = get().items.reduce((acc, item) => {
      // Logic to strip "₱" and "," so we can do math
      const price = Number(item.currentPrice.replace(/[^0-9.-]+/g, ""));
      return acc + price * item.quantity;
    }, 0);
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(total);
  },
}));