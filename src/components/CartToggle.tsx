import { ShoppingCart } from "lucide-react";
import { useCartStore, Product } from "../store/useCartStore";

interface CartToggleProps {
  product: Product;
}

export function CartToggle({ product }: CartToggleProps) {
  // 1. Pull the items and actions from the store
  const { items, addItem, removeItem } = useCartStore();

  // 2. Derived State: Check if THIS specific product is already in the cart
  const inCart = items.some((item) => item.id === product.id);

  const handleToggle = () => {
    if (inCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <button
      aria-label={inCart ? "Remove from cart" : "Add to cart"}
      onClick={handleToggle}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border bg-zinc-950 transition-all duration-300 ${
        inCart
          ? "border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          : "border-white/20 text-zinc-100 hover:border-red-500 hover:text-red-500"
      }`}
    >
      <ShoppingCart width={20} height={20} strokeWidth={inCart ? 2.5 : 2} />
    </button>
  );
}