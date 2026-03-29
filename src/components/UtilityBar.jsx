export function UtilityBar() {
    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-zinc-300">
        <span className="text-zinc-100">55</span> Products
      </p>
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Search..."
          className="rounded-md border-white/15 bg-zinc-900 px-3 py-[6px] text-zinc-200 focus:border-red-500 focus:outline-none cursor-pointer"
          id="search"
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-zinc-400">Sort by:</span>
          <div className="relative group">
            {/* Trigger Button */}
            <button className="flex items-center gap-2 rounded-md border border-white/15 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50">
              <span className="px-1">Featured</span>
              {/* Custom Chevron Icon */}
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Custom Dropdown Menu */}
            <div className="absolute right-0 mt-1 hidden group-focus-within:block w-48 rounded-md border border-white/15 bg-zinc-900 p-1 shadow-xl z-50">
              <button className="w-full text-left rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-red-500/20 hover:text-red-500">
                Featured
              </button>
              <button className="w-full text-left rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-red-500/20 hover:text-red-500">
                Best Selling
              </button>
              <button className="w-full text-left rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-red-500/20 hover:text-red-500">
                Price: Low to High
              </button>
              <button className="w-full text-left rounded-md px-3 py-2 text-sm text-zinc-200 hover:bg-red-500/20 hover:text-red-500">
                Price: High to Low
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}