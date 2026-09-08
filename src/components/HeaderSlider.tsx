import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Types ────────────────────────────────────────────────────

export interface SlideItem {
  id: number;
  image: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
}

// ─── Slide data ───────────────────────────────────────────────

const slides: SlideItem[] = [
  {
    id: 1,
    image: "/catalog-image/slider-2.avif",
    title: "The \nBeginning",
    // tag: "The Spark of Efficiency",
    subtitle: "1972 – 1979",
    paragraphs: [
      "The Honda Civic debuted in 1972, arriving just as the global oil crisis made fuel efficiency a top priority for drivers everywhere.",
      "Designed as a car for all citizens, the first-generation Civic was compact, nimble, and revolutionary.Designed as a car for all citizens, the first-generation Civic was compact, nimble, and revolutionary.",
      "It introduced the groundbreaking CVCC engine, which was so efficient it met strict emission standards without needing a catalytic converter—cementing Honda's reputation for engineering excellence from day one.",
    ],
  },
  {
    id: 2,
    image: "/catalog-image/slider-3.avif",
    // tag: "From Economy to Icon",
    title: "Building a Legacy",
    subtitle: "1980s – 1990s",
    paragraphs: [
      "Through the 80s and 90s, the Civic evolved from a subcompact commuter into a cultural phenomenon.",
      "This era saw the birth of the double-wishbone suspension and the legendary VTEC engines, blending daily reliability with genuine sportiness.",
      "Whether it was the sleek CRX or the versatile hatchbacks of the 4th, 5th, and 6th generations, the Civic became a favorite for families and enthusiasts alike, proving that a practical car could also be fun to drive.",
    ],
  },
  {
    id: 3,
    image: "/catalog-image/slider-5-zoomed.png",
    title: "Where it is Now",
    subtitle: "2021 – Present",
    paragraphs: [
      "Today, the 11th-generation Civic represents the pinnacle of the nameplate's 50-year journey.",
      "With a Man-Maximum, Machine-Minimum design philosophy, it features a clean, premium interior and a matured exterior.",
      "Now more refined than ever, the latest Civic integrates seamless connectivity and hybrid powertrains, continuing its mission to be the most reliable, efficient, and sophisticated choice for the modern citizen.",
    ],
  },
];

// ─── Config ───────────────────────────────────────────────────

const DRAG_THRESHOLD = 80;
const SNAP_DURATION = 0.7;
const SNAP_COOLDOWN = 900;

// ─── Component ────────────────────────────────────────────────

export default function HeaderSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const currentRef = useRef(0);
  const isSnapping = useRef(false);
  const accumulated = useRef(0);
  const lastSnapTime = useRef(0);
  const touchStartY = useRef(0);
  const isPinned = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const total = slides.length;
    const PIN_DISTANCE = (total - 1) * window.innerHeight;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: `+=${PIN_DISTANCE}`,
      onEnter: () => {
        isPinned.current = true;
        accumulated.current = 0;
      },
      onEnterBack: () => {
        isPinned.current = true;
        accumulated.current = 0;
      },
      onLeave: () => {
        isPinned.current = false;
      },
      onLeaveBack: () => {
        isPinned.current = false;
      },
    });

    function snapTo(index: number) {
      const clamped = Math.max(0, Math.min(total - 1, index));
      if (clamped === currentRef.current) {
        isSnapping.current = false;
        return;
      }
      isSnapping.current = true;
      lastSnapTime.current = Date.now();
      accumulated.current = 0;
      currentRef.current = clamped;
      setCurrent(clamped);
      gsap.to(track, {
        x: -clamped * window.innerWidth,
        duration: SNAP_DURATION,
        ease: "power3.inOut",
        onComplete: () => {
          isSnapping.current = false;
        },
      });
    }

    function onWheel(e: WheelEvent) {
      if (!isPinned.current) return;
      const atFirst = currentRef.current === 0;
      const atLast = currentRef.current === total - 1;
      if (atFirst && e.deltaY < 0) return;
      if (atLast && e.deltaY > 0) return;
      e.preventDefault();
      if (isSnapping.current) return;
      if (Date.now() - lastSnapTime.current < SNAP_COOLDOWN) return;
      accumulated.current += e.deltaY;
      if (accumulated.current > DRAG_THRESHOLD) {
        accumulated.current = 0;
        snapTo(currentRef.current + 1);
      } else if (accumulated.current < -DRAG_THRESHOLD) {
        accumulated.current = 0;
        snapTo(currentRef.current - 1);
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!isPinned.current || isSnapping.current) return;
      if (Date.now() - lastSnapTime.current < SNAP_COOLDOWN) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const atFirst = currentRef.current === 0;
      const atLast = currentRef.current === total - 1;
      if (atFirst && delta < 0) return;
      if (atLast && delta > 0) return;
      if (delta > DRAG_THRESHOLD) snapTo(currentRef.current + 1);
      if (delta < -DRAG_THRESHOLD) snapTo(currentRef.current - 1);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!isPinned.current || isSnapping.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        snapTo(currentRef.current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        snapTo(currentRef.current - 1);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      st.kill();
      window.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const slide = slides[current];

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen w-screen overflow-hidden bg-black"
      style={{ marginLeft: "calc(-50vw + 50%)" }}
    >
      {/* ── Slide track ──────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${slides.length * 100}vw`, willChange: "transform" }}
      >
        {slides.map((s, index) => (
          <div
            key={s.id}
            className="relative h-full w-screen flex-shrink-0 overflow-hidden"
          >
            <img
              src={s.image}
              alt={s.title ?? `Slide ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Dark overlay across the full slide for readability */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* ── Two-column text panel ────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex items-end px-8 pb-14 md:px-16 md:pb-16 lg:px-24 lg:pb-20">
        <div className="grid w-full grid-cols-2 items-end gap-12 lg:gap-24">
          {/* LEFT col — tag + title + subtitle */}
          <div>
            {slide.tag && (
              <span
                key={`tag-${current}`}
                className="animate-fadeIn mb-5 inline-block rounded-full border border-white/25 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase"
              >
                {slide.tag}
              </span>
            )}
            {slide.title && (
              <h2
                key={`title-${current}`}
                className="animate-fadeInUp m-0 mb-3 font-serif text-5xl leading-[1.05] font-bold tracking-tight text-white md:text-6xl lg:text-7xl whitespace-pre-line"
              >
                {slide.title}
              </h2>
            )}
            {slide.subtitle && (
              <p
                key={`sub-${current}`}
                className="animate-fadeInUp m-0 font-sans text-xs tracking-widest text-white/50 uppercase md:text-sm"
                style={{ animationDelay: "60ms" }}
              >
                {slide.subtitle}
              </p>
            )}
          </div>

          {/* RIGHT col — paragraphs */}
          <div className="flex flex-col gap-5">
            <div
              key={`div-${current}`}
              className="animate-fadeIn h-px w-8 bg-white/30"
            />
            {slide.paragraphs?.map((p, i) => (
              <p
                key={`p-${current}-${i}`}
                className="animate-fadeInUp m-0 font-sans text-sm leading-relaxed text-white/65 md:text-base"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slide counter (top-right) ─────────────────────────── */}
      <div className="absolute top-8 right-8 flex items-start gap-1 md:top-10 md:right-12">
        <span className="font-mono text-3xl leading-none font-light text-white">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 font-mono text-xs text-white/40">
          /{String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Dot indicators ───────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "h-2 w-6 bg-white" : "h-2 w-2 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* ── Progress bar ─────────────────────────────────────── */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-[#0a0a0a]">
        <div
          className="h-full origin-left bg-[#0a0a0a] transition-all duration-700 ease-out"
          style={{ transform: `scaleX(${current / (slides.length - 1)})` }}
        />
      </div>

      {/* ── Keyframe animations ──────────────────────────────── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-fadeIn    { animation: fadeIn    0.5s  ease both; }
        .animate-fadeInUp  { animation: fadeInUp  0.55s ease both; }
      `}</style>
    </div>
  );
}
