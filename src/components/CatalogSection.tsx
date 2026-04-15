import React from "react";

interface CarModel {
  name: string;
  description: string;
  badge: string;
  image: string;
  href: string;
}

const models: CarModel[] = [
  {
    name: "11th Gen",
    description:
      "Modern sophistication meets performance: 4-door sedan/hatchback with a refined turbocharged powertrain.",
    badge: "Gasoline",
    image: "/catalog-image/11th-gen.jpg",
    href: "/models/fe-fl",
  },
  {
    name: "10th Gen",
    description:
      "Aggressive styling and the return of the Turbo: Features the high-downforce FK8 Type R and versatile FC body styles.",
    badge: "Gasoline",
    image: "/catalog-image/10th-gen.avif",
    href: "/models/fk-fc",
  },
  {
    name: "8th Gen",
    description:
      "The 'Futuristic' era: Known for the unique dual-tier dashboard and the high-revving K20Z3 engine in the Si models.",
    badge: "Gasoline",
    image: "/catalog-image/8th-gen.jpg",
    href: "/models/fa-fg",
  },
  {
    name: "6th Gen",
    description:
      "The peak of 90s reliability: The 'EK' chassis is a tuner favorite, featuring double-wishbone suspension and the first Type R.",
    badge: "Gasoline",
    image: "/catalog-image/6th-gen.jpg",
    href: "/models/ek-ej",
  },
  {
    name: "5th Gen",
    description:
      "Aerodynamic 'Egg' styling: Lightweight, iconic EG hatchbacks that defined the front-wheel-drive racing scene.",
    badge: "Gasoline",
    image: "/catalog-image/5th-gen.jpg",
    href: "/models/eg-eh",
  },
  {
    name: "4th Gen",
    description:
      "The 'Grand Civic': Boxy 80s aesthetics featuring the legendary EF chassis and responsive double-wishbone handling.",
    badge: "Gasoline",
    image: "/catalog-image/4th-gen.jpg",
    href: "/models/ef-ed",
  },
];

const CatalogSection = () => {
  return (
    <section className="w-full bg-[#0a0a0a] px-4 py-24 md:px-8">
      <div className="mx-auto mb-12 max-w-[1200px]">
        <h1 className="font-mediumbold text-4xl tracking-tight text-white md:text-5xl">
          Your Civic journey starts now.
        </h1>
      </div>
      {/* Grid container with gap to match reference spacing */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 md:grid-cols-2">
        {models.map((model) => (
          <a
            key={model.name}
            href={model.href}
            className="group relative h-[565px] w-full overflow-hidden rounded-md bg-[#1c1c1c] transition-all"
          >
            {/* Image with dark overlay gradient */}
            <img
              src={model.image}
              alt={model.name}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-100"
            />

            {/* Top/Bottom Vignette for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

            {/* Model Name - Top Centered */}
            <div className="absolute top-8 right-0 left-0 flex justify-center px-4">
              <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic opacity-95 md:text-4xl">
                {model.name}
              </h2>
            </div>

            {/* Bottom Content Section */}
            <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 p-6">
              {/* Badge: Gray background, small text */}
              <div className="w-fit rounded-[2px] bg-[#444] px-2 py-[2px]">
                <span className="text-[11px] font-medium text-white/90">
                  {model.badge}
                </span>
              </div>

              {/* Description & Arrow Row */}
              <div className="flex items-center justify-between gap-4">
                <p className="max-w-[85%] text-[14px] leading-snug font-normal text-white">
                  {model.description}
                </p>

                {/* Arrow Icon */}
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
          </a>
        ))}
      </div>
    </section>
  );
};

export default CatalogSection;
