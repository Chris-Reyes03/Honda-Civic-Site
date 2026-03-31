import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export function CartToggle() {
    const [inCart, setInCart] = useState(false);

    
    return (
        <button
              aria-label="Add to cart"
              onClick={() => setInCart(!inCart)}
              className= {`inline-flex h-10 w-10 items-center justify-center rounded-full border bg-zinc-950 transition-all duration-300 ${
                inCart
                  ? "border-red-500/50 text-red-500"
                  : "border-white/20 text-zinc-100 hover:border-red-500 hover:text-red-500"
              }`}
            >
                <ShoppingCart
                width={20}
                height={20}
                />
            </button>
    )
}