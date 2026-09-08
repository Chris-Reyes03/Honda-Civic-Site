import { SidebarSection } from "./components/SidebarSection";
import { UtilityBar } from "./components/UtilityBar";
import { ProductCatalog } from "./components/ProductCatalog";

import { products } from "./Data/products"; // Adjust path as needed
import { createBrowserRouter, Link, RouterProvider } from "react-router";
import { ProductPage } from "./pages/ProductPage";
import NotFound from "./pages/NotFoundPage";
import Homepage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
