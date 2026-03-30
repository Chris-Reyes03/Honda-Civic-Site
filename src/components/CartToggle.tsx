import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export function CartToggle() {
    let isInCart = false;
    const [inCart, setInCart] = useState(false);

    function handleClick() {
        setInCart(!inCart);
        isInCart = !isInCart;
        console.log(isInCart)
    }
    return (
        <button
              aria-label="Add to cart"
              onClick={handleClick}
              className= {`inline-flex h-10 w-10 items-center justify-center rounded-full border bg-zinc-950 transition-all duration-300 ${
                inCart
                  ? "border-red-500/50 text-red-500 hover:border-zinc-100 hover:text-zinc-100"
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