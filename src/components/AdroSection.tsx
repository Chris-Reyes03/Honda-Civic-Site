import { adroProducts } from '../Data/adroProducts';

export function AdroSection() {
  return (
    <section
      className="col-span-full mt-10 overflow-hidden rounded-xl bg-white px-5 py-12 text-black sm:px-8 sm:py-16 lg:px-12"
      aria-labelledby="adro-partnership-title"
    >
      <div className="mx-auto max-w-325">
        <div className="flex flex-col items-center border-b border-black/15 pb-10 text-center sm:pb-12">
          <img
            src="/catalog-image/adro-logo-black.webp"
            alt="ADRO"
            className="h-auto w-36 object-contain sm:w-44"
          />
          <p className="mt-8 text-[10px] font-semibold tracking-[0.35em] text-black/50 uppercase">
            Honda Civic x ADRO
          </p>
          <h2
            id="adro-partnership-title"
            className="mt-4 max-w-2xl text-3xl leading-tight font-black tracking-[-0.03em] uppercase sm:text-5xl"
          >
            Designed together. Built to stand apart.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
            Our collaboration with ADRO brings motorsport-inspired aerodynamics
            and precise street styling to the Civic. Explore a curated selection
            of parts made for a sharper presence on the road.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {adroProducts.map((product) => (
            <article key={product.id} className="group min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef]">
                <span className="absolute top-3 left-3 z-10 bg-black px-2 py-1 text-[9px] font-bold tracking-[0.18em] text-white uppercase">
                  ADRO EDITION
                </span>
                <img
                  src={`/${product.imagePath}`}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="border-t-2 border-black pt-4">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-black/45 uppercase">
                  {product.type}
                </p>
                <h3 className="mt-2 min-h-12 text-sm leading-5 font-bold uppercase">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-base font-black">{product.price}</p>
                  <button
                    type="button"
                    className="border border-black bg-white px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-black uppercase transition hover:bg-black hover:text-white"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
