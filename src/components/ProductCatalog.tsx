import { type Product } from "../types";
import React from "react";
import { CartToggle } from "./CartToggle";

export function ProductCatalog({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        // console.log("PRODUCT", product),
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <li key={product.id}>
      <article className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-sm shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/40">
        <div className="relative h-56 bg-zinc-800">
          <span className="absolute top-2 right-2 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
            Sale
          </span>
          <img
            src={product.imagePath}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="flex min-h-50 flex-col px-3 pt-3 pb-4">
          <div className="h-15 overflow-hidden">
            <h3 className="w-auto pt-2 pb-3 text-sm leading-tight font-semibold text-ellipsis text-zinc-100">
              {product.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-500">From</p>
          <p className="text-xs text-zinc-600 line-through">
            {product.oldPrice}
          </p>
          <div className="mt-1 flex items-end justify-between pb-1">
            <p className="text-2xl leading-none font-medium text-zinc-100">
              {product.currentPrice}
            </p>
            <p className="text-xs font-medium text-zinc-400">
              {product.rating}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-2 pt-2">
            <button className="h-10 flex-1 rounded-full bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-red-600 hover:text-white">
              Select options
            </button>
            <CartToggle />
          </div>
        </div>
      </article>
    </li>
  );
}
