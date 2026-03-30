"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageWrapper = PageWrapper;
const jsx_runtime_1 = require("react/jsx-runtime");
function PageWrapper({ children }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-zinc-950 text-zinc-100", children: children }));
}
