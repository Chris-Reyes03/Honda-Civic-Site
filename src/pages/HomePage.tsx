import React from "react";
import CatalogSection from "../components/CatalogSection";

const Homepage = () => {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 3) 2%,
              rgba(0, 0, 0, 0) 40%,
              rgba(0, 0, 0, 0) 60%,
              rgba(0, 0, 0, 1) 100%
            ), url('/public/catalog-image/hero-bg.jpeg')`,
          }}
        />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-10 py-8">
          <div className="flex cursor-pointer items-center gap-2 text-white/80 transition-colors duration-300 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <line x1={4} x2={20} y1={12} y2={12} />
              <line x1={4} x2={20} y1={6} y2={6} />
              <line x1={4} x2={20} y1={18} y2={18} />
            </svg>
            <span className="text-base font-semibold tracking-[0.15em] uppercase">
              Menu
            </span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              className="h-auto w-40"
              src="/public/catalog-image/Vector.svg"
              alt="nav-logo"
            />
          </div>

          <div className="w-20" />
        </nav>

        {/* Main Content */}
        <main
          className="relative z-10 flex flex-col justify-center px-12 md:px-24"
          style={{ height: "calc(100vh - 150px)" }}
        >
          <div className="mt-72">
            <svg
              className="overflow-visible pt-4"
              style={{ width: "551px", height: "auto" }}
              width="818"
              height="181"
              viewBox="0 0 818 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                href="/public/catalog-image/hero-contentt.svg"
                x="0"
                y="10"
                width="818"
                height="161"
                preserveAspectRatio="none"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M143.814 33.4604L148.295 21.1506H73.2862C73.2862 21.1506 54.5227 22.3115 46.6681 43.8917C39.8299 62.6795 53.5417 66.3944 57.208 67.0428H130.421L134.919 54.685H82.9125C82.9125 54.685 73.8493 55.4045 78.4325 42.8124C81.7054 33.8201 90.8871 33.8201 90.8871 33.8201L143.814 33.4604ZM445.946 21.1485H371.082C371.082 21.1485 352.319 22.3094 344.464 43.8896C337.626 62.6774 351.338 66.3923 355.004 67.0408H428.217L432.715 54.6829H380.706C380.706 54.6829 371.645 55.4025 376.228 42.8103C379.501 33.818 388.683 33.818 388.683 33.818L441.465 33.4604L445.946 21.1485ZM173.474 66.5513H142.832L159.357 21.1485H189.999L173.474 66.5513ZM326.379 66.6412H295.737L312.262 21.2385H342.904L326.379 66.6412ZM279.015 21C279.015 21 243.461 46.0608 236.536 50.374C229.607 54.6913 225.913 54.3336 225.913 54.3336H218.262L230.337 21.159H199.695L182.994 67.0449H233.632C240.309 66.3045 245.896 62.6649 250.603 60.0879C255.857 57.2118 306.561 21.0021 306.561 21.0021L279.015 21Z"
                fill="#050505"
              />
            </svg>

            <div className="mt-4">
              <button className="cursor-pointer border border-white/40 bg-transparent px-10 py-3 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </main>

        {/* Controls */}
        <div className="absolute right-10 bottom-10 z-10">
          <button className="flex cursor-pointer items-center justify-center rounded-sm border border-white/40 bg-transparent p-3 transition-all duration-300 hover:border-white hover:bg-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={6} y={4} width={4} height={16} />
              <rect x={14} y={4} width={4} height={16} />
            </svg>
          </button>
        </div>

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      <CatalogSection />
    </div>
  );
};

export default Homepage;
