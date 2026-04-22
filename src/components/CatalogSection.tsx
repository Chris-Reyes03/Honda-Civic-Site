import React, { useState } from "react";

interface CarModel {
  name: string;
  description: string;
  badge: string;
  image: string;
  href: string;
  stats: {
    label: string;
    value: string;
    percent: number; // 0–100, controls the bar fill width
  }[];
}

const models: CarModel[] = [
  {
    name: "11th Gen",
    description:
      "Modern sophistication meets performance: 4-door sedan/hatchback with a refined turbocharged powertrain.",
    badge: "Gasoline",
    image: "/catalog-image/11th-gen.jpg",
    href: "/models/fe-fl",
    stats: [
      { label: "Top Speed", value: "273 km/h", percent: 90 },
      { label: "Power (HP)", value: "315 HP", percent: 82 },
      { label: "Torque", value: "420 Nm", percent: 75 },
      { label: "0–100 km/h", value: "5.4 Seconds", percent: 88 },
    ],
  },
  {
    name: "10th Gen",
    description:
      "Aggressive styling and the return of the Turbo: Features the high-downforce FK8 Type R and versatile FC body styles.",
    badge: "Gasoline",
    image: "/catalog-image/10th-gen.avif",
    href: "/models/fk-fc",
    stats: [
      { label: "Top Speed", value: "272 km/h", percent: 89 },
      { label: "Power (HP)", value: "320 HP", percent: 84 },
      { label: "Torque", value: "400 Nm", percent: 72 },
      { label: "0–100 km/h", value: "5.7 Seconds", percent: 85 },
    ],
  },
  {
    name: "8th Gen",
    description:
      "The 'Futuristic' era: Known for the unique dual-tier dashboard and the high-revving K20Z3 engine in the Si models.",
    badge: "Gasoline",
    image: "/catalog-image/8th-gen.jpg",
    href: "/models/fa-fg",
    stats: [
      { label: "Top Speed", value: "225 km/h", percent: 70 },
      { label: "Power (HP)", value: "201 HP", percent: 55 },
      { label: "Torque", value: "193 Nm", percent: 45 },
      { label: "0–100 km/h", value: "6.9 Seconds", percent: 72 },
    ],
  },
  {
    name: "6th Gen",
    description:
      "The peak of 90s reliability: The 'EK' chassis is a tuner favorite, featuring double-wishbone suspension and the first Type R.",
    badge: "Gasoline",
    image: "/catalog-image/6th-gen.jpg",
    href: "/models/ek-ej",
    stats: [
      { label: "Top Speed", value: "235 km/h", percent: 73 },
      { label: "Power (HP)", value: "185 HP", percent: 50 },
      { label: "Torque", value: "178 Nm", percent: 42 },
      { label: "0–100 km/h", value: "6.8 Seconds", percent: 73 },
    ],
  },
  {
    name: "5th Gen",
    description:
      "Aerodynamic 'Egg' styling: Lightweight, iconic EG hatchbacks that defined the front-wheel-drive racing scene.",
    badge: "Gasoline",
    image: "/catalog-image/5th-gen.jpg",
    href: "/models/eg-eh",
    stats: [
      { label: "Top Speed", value: "220 km/h", percent: 67 },
      { label: "Power (HP)", value: "160 HP", percent: 44 },
      { label: "Torque", value: "160 Nm", percent: 38 },
      { label: "0–100 km/h", value: "7.5 Seconds", percent: 65 },
    ],
  },
  {
    name: "4th Gen",
    description:
      "The 'Grand Civic': Boxy 80s aesthetics featuring the legendary EF chassis and responsive double-wishbone handling.",
    badge: "Gasoline",
    image: "/catalog-image/4th-gen.jpg",
    href: "/models/ef-ed",
    stats: [
      { label: "Top Speed", value: "185 km/h", percent: 52 },
      { label: "Power (HP)", value: "130 HP", percent: 36 },
      { label: "Torque", value: "142 Nm", percent: 32 },
      { label: "0–100 km/h", value: "9.2 Seconds", percent: 50 },
    ],
  },
];

const CatalogSection = () => {
  const [selectedIds, setSelectedIds] = useState(new Set<string>());

  const toggleItem = (name: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <section className="w-full bg-[#0a0a0a] px-4 py-24 md:px-8">
      <div className="mx-auto mb-12 max-w-[1200px]">
        <h1 className="font-mediumbold text-4xl tracking-tight text-white md:text-5xl">
          Your Civic journey starts now.
        </h1>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 md:grid-cols-2">
        {models.map((model) => {
          const isActive = selectedIds.has(model.name);

          return (
            <div
              key={model.name}
              onClick={() => toggleItem(model.name)}
              className="group relative h-[565px] w-full cursor-pointer overflow-hidden rounded-md bg-[#1c1c1c]"
            >
              {/* Image — dims when active */}
              <img
                src={model.image}
                alt={model.name}
                className={`h-full w-full object-cover transition-all duration-500 ${
                  isActive
                    ? "scale-[1.03] opacity-40"
                    : "opacity-80 group-hover:opacity-90"
                }`}
              />

              {/* Always-on vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

              {/* Model Name — top center */}
              <div className="absolute top-8 right-0 left-0 flex justify-center px-4">
                <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic opacity-95 md:text-4xl">
                  {model.name}
                </h2>
              </div>

              {/* ── DEFAULT STATE: bottom content (fades out when active) ── */}
              <div
                className={`absolute right-0 bottom-0 left-0 flex flex-col gap-3 p-6 transition-all duration-300 ${
                  isActive ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <div className="w-fit rounded-[2px] bg-[#444] px-2 py-[2px]">
                  <span className="text-[11px] font-medium text-white/90">
                    {model.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="max-w-[85%] text-[14px] leading-snug text-white">
                    {model.description}
                  </p>
                  <div className="flex-shrink-0 text-white opacity-80 transition-transform group-hover:translate-x-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ── ACTIVE STATE: stats overlay — slides up from bottom ── */}
              <div
                className={`absolute right-0 bottom-0 left-0 transition-all duration-500 ease-out ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                  //            ↑ visible                     ↑ hidden below card edge
                }`}
              >
                {/* Frosted dark panel */}
                <div className="m-3 rounded-md bg-black/60 px-5 py-4 backdrop-blur-sm">
                  {/* Caption: e.g. "11th-gen Honda Civic Type R (FL5)" */}
                  <p className="mb-4 text-[11px] font-medium tracking-wide text-white/50">
                    {model.name} Honda Civic
                  </p>

                  {/* Stat rows */}
                  <div className="flex flex-col gap-3">
                    {model.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-3">
                        {/* Label + value */}
                        <span className="w-36 shrink-0 text-[12px] text-white/80">
                          {stat.label}:{" "}
                          <span className="font-semibold text-white">
                            {stat.value}
                          </span>
                        </span>

                        {/* Bar track */}
                        <div className="h-[6px] flex-1 rounded-full bg-white/10">
                          {/* Bar fill — width driven by percent, animates when isActive */}
                          <div
                            className="h-full rounded-full bg-white transition-all duration-700 ease-out"
                            style={{
                              width: isActive ? `${stat.percent}%` : "0%",
                              // ↑ starts at 0, grows to target once slide-up completes
                              transitionDelay: isActive ? "200ms" : "0ms",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection counter */}
      <div className="mx-auto mt-10 max-w-[1200px]">
        <p className="text-xs tracking-[0.25em] text-white/30 uppercase">
          {selectedIds.size === 0
            ? "No models selected"
            : `${selectedIds.size} model${selectedIds.size > 1 ? "s" : ""} selected`}
        </p>
      </div>
    </section>
  );
};

export default CatalogSection;
