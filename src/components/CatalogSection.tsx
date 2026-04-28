import React, { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Upgrade {
  id: string;
  shortLabel: string;
  description: string;
  // Every stat this upgrade realistically affects
  deltaHP?: number;
  deltaNm?: number;
  deltaKmh?: number;
  delta0100?: number;
}

interface CarModel {
  name: string;
  description: string;
  badge: string;
  image: string;
  href: string;
  baseHP: number;
  baseNm: number;
  baseTopSpeed: number;
  base0100: number;
}

// ─── Upgrade Definitions — cross-stat effects ─────────────────────────────────
//
// Real-world logic:
//  ECU Tune     → more boost = +HP, +Nm, removes limiter = +kmh, better spool = −0100
//  Turbo Kit    → biggest power jump, also raises top speed, helps 0-100 via torque
//  Downpipe     → less backpressure: +HP, +Nm, slight top speed benefit
//  Cold Intake  → better airflow: small +HP, +Nm only
//  Intercooler  → denser charge air: +HP, +Nm, sustains power at high speed = slight +kmh
//  Flex Fuel    → huge torque on E85, also +HP from better knock resistance, −0100
//  Light Wheels → unsprung mass: only helps 0-100 and handling, no engine gains
//  Flywheel     → faster revs: −0100, tiny +HP from reduced parasitic loss
//  Early Spool  → ECU low-end torque map: +Nm, −0100, tiny +HP
//  Speed Limiter→ purely removes governor: +kmh only
//  Exhaust      → less restriction: +HP, +Nm, +kmh at high RPM
//  Aero Kit     → drag reduction: +kmh at top end, slight −0100 from stability

const UPGRADE_GROUPS: Record<"power" | "acceleration" | "topSpeed", Upgrade[]> =
  {
    power: [
      {
        id: "ecu",
        shortLabel: "ECU Tune",
        description: "Raises boost, optimises fuel maps — affects all stats",
        deltaHP: 30, // +30 whp from boost/fuel map
        deltaNm: 45, // torque responds strongly to boost
        deltaKmh: 15, // removes factory speed limiter as part of full tune
        delta0100: -0.3, // better spool & torque delivery
      },
      {
        id: "turbo",
        shortLabel: "Turbo Kit",
        description:
          "Larger turbo — dramatic power, torque, and top speed gains",
        deltaHP: 110, // 27WON W1 / RV6 R365 territory
        deltaNm: 90, // huge mid-range torque
        deltaKmh: 20, // more power = higher terminal velocity
        delta0100: -0.6, // torque spike helps launch hard
      },
      {
        id: "downpipe",
        shortLabel: "Downpipe",
        description:
          "Less backpressure improves turbo efficiency and top-end flow",
        deltaHP: 15,
        deltaNm: 15,
        deltaKmh: 5, // marginal top-end breathing benefit
        delta0100: -0.1,
      },
      {
        id: "intake",
        shortLabel: "Cold Intake",
        description: "Cooler, denser air improves combustion slightly",
        deltaHP: 7,
        deltaNm: 5,
        // no meaningful top speed or 0-100 effect on its own
      },
      {
        id: "intercooler",
        shortLabel: "Intercooler",
        description: "Reduces heat soak — sustains power at high speeds",
        deltaHP: 8,
        deltaNm: 8,
        deltaKmh: 4, // sustained power at high speed = marginally higher top speed
      },
    ],
    acceleration: [
      {
        id: "flexfuel",
        shortLabel: "Flex Fuel",
        description:
          "E85 raises octane — big torque & knock-resistance HP gains",
        deltaHP: 25, // better knock resistance allows more timing advance
        deltaNm: 55, // E85 torque is the biggest single torque upgrade
        delta0100: -0.4,
        // no top speed benefit — purely low/mid range
      },
      {
        id: "wheels",
        shortLabel: "Light Wheels",
        description:
          "Reduces rotational unsprung mass — faster acceleration only",
        delta0100: -0.25,
        // no HP/Nm/top speed effect
      },
      {
        id: "flywheel",
        shortLabel: "Flywheel",
        description: "Lighter flywheel lets the engine rev faster",
        deltaHP: 3, // tiny reduction in parasitic rotational loss
        delta0100: -0.2,
      },
      {
        id: "earlyspool",
        shortLabel: "Early Spool",
        description: "ECU map prioritises low-end torque and reduces turbo lag",
        deltaHP: 5,
        deltaNm: 20, // strong low-end torque improvement
        delta0100: -0.2,
      },
    ],
    topSpeed: [
      {
        id: "speedlimiter",
        shortLabel: "Speed Limiter",
        description: "Removes factory speed governor — top speed only",
        deltaKmh: 30, // biggest single top speed unlock
        // no power or acceleration effect
      },
      {
        id: "exhaust",
        shortLabel: "Exhaust",
        description: "Less restriction helps the engine breathe at high RPM",
        deltaHP: 10,
        deltaNm: 10,
        deltaKmh: 10, // high-RPM breathing directly raises top speed
        delta0100: -0.1,
      },
      {
        id: "aero",
        shortLabel: "Aero Kit",
        description:
          "Splitter + skirts reduce drag and improve high-speed stability",
        deltaKmh: 10, // drag reduction raises top speed
        delta0100: -0.1, // stability aids confident launches
      },
    ],
  };

// Flat list of all upgrades for easy lookup
const ALL_UPGRADES = [
  ...UPGRADE_GROUPS.power,
  ...UPGRADE_GROUPS.acceleration,
  ...UPGRADE_GROUPS.topSpeed,
];

// ─── Model Data ───────────────────────────────────────────────────────────────

const models: CarModel[] = [
  {
    name: "11th Gen",
    description:
      "Modern sophistication meets performance: 4-door sedan/hatchback with a refined turbocharged powertrain.",
    badge: "Gasoline",
    image: "/catalog-image/11th-gen.jpg",
    href: "/models/fe-fl",
    baseHP: 315,
    baseNm: 420,
    baseTopSpeed: 273,
    base0100: 5.4,
  },
  {
    name: "10th Gen",
    description:
      "Aggressive styling and the return of the Turbo: Features the high-downforce FK8 Type R and versatile FC body styles.",
    badge: "Gasoline",
    image: "/catalog-image/10th-gen.avif",
    href: "/models/fk-fc",
    baseHP: 320,
    baseNm: 400,
    baseTopSpeed: 272,
    base0100: 5.7,
  },
  {
    name: "8th Gen",
    description:
      "The 'Futuristic' era: Known for the unique dual-tier dashboard and the high-revving K20Z3 engine in the Si models.",
    badge: "Gasoline",
    image: "/catalog-image/8th-gen.jpg",
    href: "/models/fa-fg",
    baseHP: 201,
    baseNm: 193,
    baseTopSpeed: 225,
    base0100: 6.9,
  },
  {
    name: "6th Gen",
    description:
      "The peak of 90s reliability: The 'EK' chassis is a tuner favorite, featuring double-wishbone suspension.",
    badge: "Gasoline",
    image: "/catalog-image/6th-gen.jpg",
    href: "/models/ek-ej",
    baseHP: 185,
    baseNm: 178,
    baseTopSpeed: 235,
    base0100: 6.8,
  },
  {
    name: "5th Gen",
    description:
      "Aerodynamic 'Egg' styling: Lightweight, iconic EG hatchbacks that defined the front-wheel-drive racing scene.",
    badge: "Gasoline",
    image: "/catalog-image/5th-gen.jpg",
    href: "/models/eg-eh",
    baseHP: 160,
    baseNm: 160,
    baseTopSpeed: 220,
    base0100: 7.5,
  },
  {
    name: "4th Gen",
    description:
      "The 'Grand Civic': Boxy 80s aesthetics featuring the legendary EF chassis and responsive double-wishbone handling.",
    badge: "Gasoline",
    image: "/catalog-image/4th-gen.jpg",
    href: "/models/ef-ed",
    baseHP: 130,
    baseNm: 142,
    baseTopSpeed: 185,
    base0100: 9.2,
  },
];

// ─── Scale & percent helpers ──────────────────────────────────────────────────

const SCALE = { HP: 650, Nm: 750, kmh: 400, sec: 12 };

const hpPct = (v: number) => Math.min((v / SCALE.HP) * 100, 99);
const nmPct = (v: number) => Math.min((v / SCALE.Nm) * 100, 99);
const kmhPct = (v: number) => Math.min((v / SCALE.kmh) * 100, 99);
const sec0100Pct = (v: number) =>
  Math.min(((SCALE.sec - v) / SCALE.sec) * 100, 99);

// ─── Animated number hook ─────────────────────────────────────────────────────

function useAnimatedValue(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef<number>(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(from + (target - from) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// ─── StatBar ──────────────────────────────────────────────────────────────────

const StatBar = ({
  label,
  baseVal,
  upgradeVal,
  unit,
  baseBarPct,
  bonusBarPct,
  upgradeKey,
  drawer,
  onToggleDrawer,
  isActive,
}: {
  label: string;
  baseVal: number;
  upgradeVal: number;
  unit: string;
  baseBarPct: number;
  bonusBarPct: number;
  upgradeKey: "power" | "acceleration" | "topSpeed";
  drawer: "power" | "acceleration" | "topSpeed" | null;
  onToggleDrawer: (e: React.MouseEvent) => void;
  isActive: boolean;
}) => {
  const is0100 = unit === "s";
  const changed = upgradeVal !== baseVal;
  const delta = is0100 ? baseVal - upgradeVal : upgradeVal - baseVal;

  const animVal = useAnimatedValue(upgradeVal, 550);
  const animBase = useAnimatedValue(isActive ? baseBarPct : 0, 700);
  const animBonus = useAnimatedValue(isActive ? bonusBarPct : 0, 650);

  return (
    <div className="flex items-center gap-2">
      <div className="w-[128px] shrink-0">
        <p className="mb-0.5 text-[10px] leading-none text-white/40">{label}</p>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-[13px] font-semibold transition-colors duration-300 ${changed ? "text-red-400" : "text-white"}`}
          >
            {is0100 ? animVal.toFixed(1) : Math.round(animVal)}
            <span className="ml-0.5 text-[10px] font-normal text-white/40">
              {unit}
            </span>
          </span>
          <span
            className={`text-[10px] font-medium text-red-400 transition-all duration-300 ${
              changed ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            }`}
          >
            {is0100 ? `−${delta.toFixed(2)}s` : `+${Math.round(delta)}`}
          </span>
        </div>
      </div>

      <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-white"
          style={{ width: `${animBase}%` }}
        />
        <div
          className="absolute top-0 h-full rounded-r-full"
          style={{
            left: `${baseBarPct}%`,
            width: `${animBonus}%`,
            background: "linear-gradient(to right, #7f1d1d, #ef4444)",
          }}
        />
      </div>

      <button
        onClick={onToggleDrawer}
        className={`ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm transition-all duration-200 ${
          drawer === upgradeKey
            ? "bg-red-800 text-white"
            : "bg-white/10 text-white/40 hover:bg-white/20 hover:text-white"
        }`}
      >
        {drawer === upgradeKey ? (
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </button>
    </div>
  );
};

// ─── UpgradeDrawer ────────────────────────────────────────────────────────────

const UpgradeDrawer = ({
  drawer,
  modelName,
  active,
  onToggleUpgrade,
  onClear,
}: {
  drawer: "power" | "acceleration" | "topSpeed" | null;
  modelName: string;
  active: Set<string>;
  onToggleUpgrade: (id: string, e: React.MouseEvent) => void;
  onClear: (e: React.MouseEvent) => void;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (drawer && innerRef.current) {
      // Small timeout lets the DOM paint first so scrollHeight is accurate
      const id = setTimeout(() => {
        if (innerRef.current) setHeight(innerRef.current.scrollHeight);
      }, 10);
      return () => clearTimeout(id);
    } else {
      setHeight(0);
    }
  }, [drawer, modelName]);

  const drawerLabel = {
    power: "Power Upgrades",
    acceleration: "Acceleration Upgrades",
    topSpeed: "Top Speed Upgrades",
  };

  // Which upgrade IDs are currently active for this drawer group
  const groupIds = drawer ? UPGRADE_GROUPS[drawer].map((u) => u.id) : [];
  const activeInGroup = groupIds.filter((id) => active.has(id));
  const hasActiveInGroup = activeInGroup.length > 0;

  return (
    <div
      className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        maxHeight: `${height}px`,
        opacity: drawer ? 1 : 0,
        transition:
          "max-height 380ms cubic-bezier(0.4,0,0.2,1), opacity 280ms ease",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div ref={innerRef}>
        <div className="mt-3 border-t border-white/10 pt-2.5 pb-5">
          {drawer && (
            <>
              {/* Drawer header with clear button */}
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] tracking-widest text-white/30 uppercase">
                  {drawerLabel[drawer]}
                </p>
                {hasActiveInGroup && (
                  <button
                    onClick={onClear}
                    className="flex items-center gap-1 rounded-sm bg-white/8 px-2 text-[10px] text-white/40 ring-1 ring-white/10 transition-all duration-200 hover:bg-white/15 hover:text-white/70"
                    style={{ animation: "chipIn 200ms ease-out both" }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5">
                {UPGRADE_GROUPS[drawer].map((upgrade, i) => {
                  const on = active.has(upgrade.id);

                  // Build a tooltip string showing which stats this upgrade affects
                  const affects: string[] = [];
                  if (upgrade.deltaHP) affects.push(`+${upgrade.deltaHP} HP`);
                  if (upgrade.deltaNm) affects.push(`+${upgrade.deltaNm} Nm`);
                  if (upgrade.deltaKmh)
                    affects.push(`+${upgrade.deltaKmh} km/h`);
                  if (upgrade.delta0100)
                    affects.push(`${upgrade.delta0100}s 0-100`);
                  const tooltip = affects.join(" · ");

                  return (
                    <div key={upgrade.id} className="group/chip relative">
                      <button
                        onClick={(e) => onToggleUpgrade(upgrade.id, e)}
                        style={{
                          animation: `chipIn 250ms ease-out ${i * 40}ms both`,
                        }}
                        className={`rounded-sm px-2.5 py-1 text-[10px] font-medium tracking-wide transition-all duration-200 ${
                          on
                            ? "scale-[1.03] bg-red-800 text-white"
                            : "bg-white/8 text-white/50 ring-1 ring-white/10 hover:bg-white/15 hover:text-white/80"
                        }`}
                      >
                        {upgrade.shortLabel}
                      </button>

                      {/* Tooltip showing cross-stat effects */}
                      <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-1.5 min-w-max rounded-sm bg-black/90 px-2.5 py-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover/chip:opacity-100">
                        <p className="text-[10px] font-medium text-white/90">
                          {upgrade.shortLabel}
                        </p>
                        <p className="mt-0.5 text-[9px] text-white/50">
                          {tooltip}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CatalogSection = () => {
  const [selectedIds, setSelectedIds] = useState(new Set<string>());
  const [upgradesByModel, setUpgradesByModel] = useState<
    Record<string, Set<string>>
  >({});
  const [openDrawer, setOpenDrawer] = useState<
    Record<string, "power" | "acceleration" | "topSpeed" | null>
  >({});

  const toggleCard = (name: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const toggleUpgrade = (
    modelName: string,
    upgradeId: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setUpgradesByModel((prev) => {
      const current = new Set(prev[modelName] ?? []);
      current.has(upgradeId)
        ? current.delete(upgradeId)
        : current.add(upgradeId);
      return { ...prev, [modelName]: current };
    });
  };

  // Clear only the upgrades belonging to the currently open drawer group
  const clearDrawerUpgrades = (
    modelName: string,
    drawer: "power" | "acceleration" | "topSpeed",
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    const groupIds = new Set(UPGRADE_GROUPS[drawer].map((u) => u.id));
    setUpgradesByModel((prev) => {
      const current = new Set(prev[modelName] ?? []);
      groupIds.forEach((id) => current.delete(id));
      return { ...prev, [modelName]: current };
    });
  };

  const toggleDrawer = (
    modelName: string,
    key: "power" | "acceleration" | "topSpeed",
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setOpenDrawer((prev) => ({
      ...prev,
      [modelName]: prev[modelName] === key ? null : key,
    }));
  };

  return (
    <>
      <style>{`
        @keyframes chipIn {
          from { opacity: 0; transform: translateY(5px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>

      <section className="w-full bg-[#0a0a0a] px-4 py-24 md:px-8">
        <div className="mx-auto mb-12 max-w-[1200px]">
          <h1 className="font-mediumbold h-100 text-4xl tracking-tight text-white md:text-5xl">
            Your Civic journey starts now.
          </h1>
          <h1>greatness through generation</h1>
          <h1>"animated slide show with multiple images"</h1>
          <h1>a smooth transition to the next section of the website.</h1>
        </div>

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 md:grid-cols-2">
          {models.map((model) => {
            const isActive = selectedIds.has(model.name);
            const active = upgradesByModel[model.name] ?? new Set<string>();
            const drawer = openDrawer[model.name] ?? null;

            // ── Accumulate deltas across ALL upgrades (cross-stat) ──────────
            let dHP = 0,
              dNm = 0,
              dKmh = 0,
              d0100 = 0;
            ALL_UPGRADES.forEach((u) => {
              if (!active.has(u.id)) return;
              dHP += u.deltaHP ?? 0;
              dNm += u.deltaNm ?? 0;
              dKmh += u.deltaKmh ?? 0;
              d0100 += u.delta0100 ?? 0;
            });

            const totalHP = model.baseHP + dHP;
            const totalNm = model.baseNm + dNm;
            const totalTopSpeed = model.baseTopSpeed + dKmh;
            const total0100 = Math.max(model.base0100 + d0100, 2.2);
            const hasAnyUpgrade = active.size > 0;

            const bars = {
              topSpeed: {
                base: kmhPct(model.baseTopSpeed),
                bonus: kmhPct(totalTopSpeed) - kmhPct(model.baseTopSpeed),
              },
              hp: {
                base: hpPct(model.baseHP),
                bonus: hpPct(totalHP) - hpPct(model.baseHP),
              },
              nm: {
                base: nmPct(model.baseNm),
                bonus: nmPct(totalNm) - nmPct(model.baseNm),
              },
              s0100: {
                base: sec0100Pct(model.base0100),
                bonus: sec0100Pct(total0100) - sec0100Pct(model.base0100),
              },
            };

            return (
              <div
                key={model.name}
                onClick={() => toggleCard(model.name)}
                className="group relative h-[565px] w-full cursor-pointer overflow-hidden rounded-md bg-[#1c1c1c]"
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className={`h-full w-full object-cover transition-all duration-500 ${
                    isActive
                      ? "scale-[1.03] opacity-25"
                      : "opacity-80 group-hover:opacity-90"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/65" />

                <div className="absolute top-8 right-0 left-0 flex justify-center px-4">
                  <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic opacity-95 md:text-4xl">
                    {model.name}
                  </h2>
                </div>

                {/* DEFAULT */}
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

                {/* ACTIVE PANEL */}
                <div
                  className={`absolute right-0 bottom-0 left-0 transition-all duration-500 ease-out ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  <div className="m-3 rounded-md bg-black/75 px-4 py-3.5 backdrop-blur-sm">
                    {/* Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="w-fit rounded-[2px] bg-[#444] px-2 py-[2px]">
                        <span className="text-[11px] font-medium text-white/90">
                          {model.name} Honda Civic
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasAnyUpgrade && (
                          <>
                            <span className="text-[10px] font-semibold tracking-widest text-red-400 uppercase">
                              Tuned
                            </span>
                            {/* Global clear — resets all upgrades on this card */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setUpgradesByModel((prev) => ({
                                  ...prev,
                                  [model.name]: new Set(),
                                }));
                              }}
                              className="flex items-center gap-1 rounded-sm bg-white/8 px-2 py-0.5 text-[10px] text-white/40 ring-1 ring-white/10 transition-all duration-200 hover:bg-red-900/40 hover:text-red-300 hover:ring-red-800"
                            >
                              <svg
                                width="8"
                                height="8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                              Reset all
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-3">
                      <StatBar
                        label="Top Speed"
                        baseVal={model.baseTopSpeed}
                        upgradeVal={totalTopSpeed}
                        unit="km/h"
                        baseBarPct={bars.topSpeed.base}
                        bonusBarPct={bars.topSpeed.bonus}
                        upgradeKey="topSpeed"
                        drawer={drawer}
                        onToggleDrawer={(e) =>
                          toggleDrawer(model.name, "topSpeed", e)
                        }
                        isActive={isActive}
                      />
                      <StatBar
                        label="Power"
                        baseVal={model.baseHP}
                        upgradeVal={totalHP}
                        unit="HP"
                        baseBarPct={bars.hp.base}
                        bonusBarPct={bars.hp.bonus}
                        upgradeKey="power"
                        drawer={drawer}
                        onToggleDrawer={(e) =>
                          toggleDrawer(model.name, "power", e)
                        }
                        isActive={isActive}
                      />
                      <StatBar
                        label="Torque"
                        baseVal={model.baseNm}
                        upgradeVal={totalNm}
                        unit="Nm"
                        baseBarPct={bars.nm.base}
                        bonusBarPct={bars.nm.bonus}
                        upgradeKey="power"
                        drawer={drawer}
                        onToggleDrawer={(e) =>
                          toggleDrawer(model.name, "power", e)
                        }
                        isActive={isActive}
                      />
                      <StatBar
                        label="0–100 km/h"
                        baseVal={model.base0100}
                        upgradeVal={total0100}
                        unit="s"
                        baseBarPct={bars.s0100.base}
                        bonusBarPct={bars.s0100.bonus}
                        upgradeKey="acceleration"
                        drawer={drawer}
                        onToggleDrawer={(e) =>
                          toggleDrawer(model.name, "acceleration", e)
                        }
                        isActive={isActive}
                      />
                    </div>

                    {/* Drawer */}
                    <UpgradeDrawer
                      drawer={drawer}
                      modelName={model.name}
                      active={active}
                      onToggleUpgrade={(id, e) =>
                        toggleUpgrade(model.name, id, e)
                      }
                      onClear={(e) =>
                        drawer && clearDrawerUpgrades(model.name, drawer, e)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-[1200px]">
          <p className="text-xs tracking-[0.25em] text-white/30 uppercase">
            {selectedIds.size === 0
              ? "No models selected"
              : `${selectedIds.size} model${selectedIds.size > 1 ? "s" : ""} selected`}
          </p>
        </div>
      </section>
    </>
  );
};

export default CatalogSection;
