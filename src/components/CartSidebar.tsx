import { useCartStore } from "../store/useCartStore";

export function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* 2. Sliding Panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-[460px] bg-[#111111] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">

          {/* ── Header ── */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <h2 className="text-[15px] font-black uppercase tracking-[0.18em] text-white">
              Cart <span className="text-white"> {items.length}</span>
            </h2>
            <button
              onClick={closeCart}
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close cart"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ── Scrollable Product List ── */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-12 h-12 opacity-30">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <p className="text-sm font-bold uppercase tracking-widest">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-white/[0.07] py-5 last:border-none"
                >
                  {/* Product image */}
                  <div className="flex-shrink-0 w-[88px] h-[88px] rounded-md overflow-hidden bg-[#1c1c1c]">
                    <img
                      src={item.imagePath}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[13px] font-bold text-white leading-snug line-clamp-2 underline underline-offset-2 decoration-white/30">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 text-gray-600 hover:text-red-500 transition-colors mt-0.5"
                        aria-label="Remove item"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-4 h-4">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty control */}
                      <div className="flex items-center border border-white/15 rounded overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-lg flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-white select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-[15px] font-black text-white">
                        {item.currentPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── Sticky Checkout Footer ── */}
          {items.length > 0 && (
            <div className="border-t border-white/10 px-6 pt-5 pb-6 bg-[#0d0d0d]">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-black uppercase tracking-widest text-gray-400">
                  Subtotal
                </span>
                <span className="text-xl font-black text-white">{getTotalPrice()}</span>
              </div>

              {/* Checkout button — matches your site's red accent */}
              <button className="w-full bg-red-600 hover:bg-red-500 active:scale-[0.98] transition-all py-4 text-white text-[13px] font-black uppercase tracking-[0.2em] rounded-sm">
                Checkout • {getTotalPrice()}
              </button>

              {/* Continue shopping */}
              <button
                onClick={closeCart}
                className="w-full mt-3 text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}