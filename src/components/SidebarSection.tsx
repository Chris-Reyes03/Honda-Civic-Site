import React from "react";
import { sidebaritems } from "../Data/sidebar"; // Adjust path as needed

export function SidebarSection() {
  return (
    <div className="mt-1 flex w-64 flex-col gap-[6.5px]">
      {sidebaritems.map((section) => (
        <section key={section.id}>
          {/* Section Header */}
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl leading-none font-bold text-zinc-100">
              {section.title}
            </h2>
            <span className="px-2 text-xl text-zinc-500">-</span>
          </div>

          {/* Filter Card */}
          <aside className="mt-[21.5px] rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 shadow-sm shadow-black/30">
            <div className="space-y-2 text-[15px]">
              {section.options.map((option, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-center justify-between gap-2 text-zinc-300 transition-colors hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-red-600"
                    />
                    {option.name}
                  </span>
                  <span className="text-zinc-500">{option.count}</span>
                </label>
              ))}
            </div>

            <button className="mt-4 text-sm font-medium text-red-500 transition hover:text-red-600">
              + Show More
            </button>
          </aside>
        </section>
      ))}
    </div>
  );
}
