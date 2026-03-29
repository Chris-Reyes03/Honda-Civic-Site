export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <img
            src="/catalog-image/Vector.svg"
            alt="Logo"
            className="h-auto !w-[10rem] md:w-48"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="group flex items-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-600">
            <span>View Cart</span>
            <span
              id="cart-count"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[12px] font-bold group-hover:bg-zinc-950"
            >
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
