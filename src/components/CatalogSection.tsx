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
    description: "Iconic sports car with rear engine: 2 doors, 2+2 seats.",
    badge: "Gasoline",
    image: "/catalog-image/911.jpeg",
    href: "/models/911",
  },
  {
    name: "10th Gen",
    description: "Precise mid-engine sports car: 2 doors, 2 seats.",
    badge: "Gasoline",
    image: "/catalog-image/718.jpeg",
    href: "/models/718",
  },
  {
    name: "8th Gen",
    description: "Iconic sports car with rear engine: 2 doors, 2+2 seats.",
    badge: "Gasoline",
    image: "/catalog-image/911.jpeg",
    href: "/models/911",
  },
  {
    name: "6th Gen",
    description: "Precise mid-engine sports car: 2 doors, 2 seats.",
    badge: "Gasoline",
    image: "/catalog-image/718.jpeg",
    href: "/models/718",
  },
  {
    name: "5th Gen",
    description: "Iconic sports car with rear engine: 2 doors, 2+2 seats.",
    badge: "Gasoline",
    image: "/catalog-image/911.jpeg",
    href: "/models/911",
  },
  {
    name: "4th Gen",
    description: "Precise mid-engine sports car: 2 doors, 2 seats.",
    badge: "Gasoline",
    image: "/catalog-image/718.jpeg",
    href: "/models/718",
  },
];

const CatalogSection = () => {
  return (
    <section className="w-full bg-[#0a0a0a] px-4 py-12 md:px-8">
      {/* Grid container with gap to match reference spacing */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2">
        {models.map((model) => (
          <a
            key={model.name}
            href={model.href}
            className="group relative aspect-[1.1/1] overflow-hidden rounded-md bg-[#1c1c1c] transition-all"
          >
            {/* Image with dark overlay gradient */}
            <img
              src={model.image}
              alt={model.name}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
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
