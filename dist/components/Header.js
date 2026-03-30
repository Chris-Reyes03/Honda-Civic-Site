"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
function Header() {
    return ((0, jsx_runtime_1.jsx)("header", { className: "sticky top-0 z-20 border-b border-white/10 bg-zinc-950/95 backdrop-blur", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex max-w-[1300px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: "/catalog-image/Vector.svg", alt: "Logo", className: "h-auto !w-[10rem] md:w-48" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: (0, jsx_runtime_1.jsxs)("button", { className: "group flex items-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "View Cart" }), (0, jsx_runtime_1.jsx)("span", { id: "cart-count", className: "flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[12px] font-bold group-hover:bg-zinc-950", children: "3" })] }) })] }) }));
}
