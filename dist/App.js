"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const PageWrapper_1 = require("./components/PageWrapper");
const Screen_1 = require("./components/Screen");
const Header_1 = require("./components/Header");
const SidebarSection_1 = require("./components/SidebarSection");
const UtilityBar_1 = require("./components/UtilityBar");
const ProductCatalog_1 = require("./components/ProductCatalog");
const products_1 = require("./Data/products"); // Adjust path as needed
function App() {
    return ((0, jsx_runtime_1.jsx)(PageWrapper_1.PageWrapper, { children: (0, jsx_runtime_1.jsxs)(Screen_1.Screen, { children: [(0, jsx_runtime_1.jsx)(Header_1.Header, {}), (0, jsx_runtime_1.jsx)(Main, {})] }) }));
}
function Main() {
    return ((0, jsx_runtime_1.jsxs)("main", { className: "mx-auto grid max-w-325 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8", children: [(0, jsx_runtime_1.jsx)(SidebarSection_1.SidebarSection, {}), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)(UtilityBar_1.UtilityBar, {}), (0, jsx_runtime_1.jsx)(ProductCatalog_1.ProductCatalog, { products: products_1.products })] })] }));
}
