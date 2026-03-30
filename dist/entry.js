"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const react_1 = require("react");
require("./app.css");
const App_1 = require("./App");
(0, client_1.createRoot)(document.getElementById("app")).render((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: (0, jsx_runtime_1.jsx)(App_1.App, {}) }));
