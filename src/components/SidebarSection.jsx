export function SidebarSection() {
  return (
    <div className="mt-1 flex w-64 flex-col gap-[6.5px]">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl leading-none font-bold">Product type</h2>
          <span className="px-2 text-xl text-zinc-500">-</span>
        </div>
        <aside className="mt-[21.5px] rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 shadow-sm shadow-black/30">
          <div>
            <div className="space-y-2 text-[15px]">
              <label className="flex items-center justify-between gap-1 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Canards
                </span>
                <span className="text-zinc-500">5</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Exhaust
                </span>
                <span className="text-zinc-500">2</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Front Lip
                </span>
                <span className="text-zinc-500">3</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Front Splitter
                </span>
                <span className="text-zinc-500">8</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Front Splitters
                </span>
                <span className="text-zinc-500">9</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Gurney Flap
                </span>
                <span className="text-zinc-500">1</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Hood Scoop
                </span>
                <span className="text-zinc-500">1</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Rear Diffusers
                </span>
                <span className="text-zinc-500">5</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Rear Window Spoiler
                </span>
                <span className="text-zinc-500">1</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Wheels
                </span>
                <span className="text-zinc-500">10</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                  />
                  Side Skirts
                </span>
                <span className="text-zinc-500">16</span>
              </label>
            </div>
            <button className="mt-4 text-sm font-medium text-red-500 hover:text-red-600">
              + Show More
            </button>
          </div>
        </aside>
      </section>

      {/* second sidebar */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl leading-none font-bold">Model</h2>
          <span className="px-2 text-xl text-zinc-500">-</span>
        </div>
        <aside className="mt-[21.5px] rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 shadow-sm shadow-black/30">
          <div className="space-y-2 text-[15px]">
            <label className="flex items-center justify-between gap-2 text-zinc-300">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                />
                Accord
              </span>
              <span className="text-zinc-500">5</span>
            </label>
            <label className="flex items-center justify-between gap-2 text-zinc-300">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                />
                Civic
              </span>
              <span className="text-zinc-500">2</span>
            </label>
            <label className="flex items-center justify-between gap-2 text-zinc-300">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                />
                Civic FL5 Type R
              </span>
              <span className="text-zinc-500">3</span>
            </label>
            <label className="flex items-center justify-between gap-2 text-zinc-300">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                />
                CRZ
              </span>
              <span className="text-zinc-500">8</span>
            </label>
            <label className="flex items-center justify-between gap-2 text-zinc-300">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                />
                Prelude
              </span>
              <span className="text-zinc-500">9</span>
            </label>
          </div>
          <button className="mt-4 text-sm font-medium text-red-500 hover:text-red-600">
            + Show More
          </button>
        </aside>
      </section>
    </div>
  );
}
