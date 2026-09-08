import React, { useState } from "react";
import { useNavigate } from "react-router";
import CatalogSection from "../components/CatalogSection";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HomepageHeader from "../components/HomepageHeader";
import HeaderSlider from "../components/HeaderSlider";
import { Footer } from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    const Herotl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top 1%",
        end: "bottom top",
        scrub: true,
      },
    });
    Herotl.to(".hero-container", {
      rotate: 0,
      // scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  }, []);

  const menuItems = [
    { label: "Models", onClick: () => navigate("/products") },
    { label: "Vehicle Purchase", onClick: () => setIsMenuOpen(false) },
    { label: "Services", onClick: () => setIsMenuOpen(false) },
    { label: "Experience", onClick: () => setIsMenuOpen(false) },
    { label: "Find a Dealer", onClick: () => setIsMenuOpen(false) },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-black">
      {/* Hero Section */}
      <div className="hero-container relative h-screen w-full overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" />

        {/* Blurred Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 z-50 h-screen w-1/3 transform bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-8">
            <h2 className="text-2xl font-bold tracking-[0.15em] text-white uppercase">
              Menu
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white/80 transition-colors hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4 px-6 py-8">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-between rounded-lg px-6 py-4 text-left text-lg font-semibold tracking-wide text-white uppercase transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg"
              >
                <span>{item.label}</span>
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
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-10 py-8">
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2 text-white/80 transition-colors duration-300 hover:text-white"
            >
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
            </button>
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
              "radial-gradient(circle, , transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>
      <HomepageHeader />
      <HeaderSlider />
      <CatalogSection />
      <Footer />
    </div>
  );
};

export default Homepage;
