import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

// Replace these paths with the feature product images you want to display.
const featureProductImages = [
  '/catalog-image/feature-catalog-1.webp',
  '/catalog-image/feature-catalog-2.webp',
  '/catalog-image/feature-catalog-3.webp',
];

export function FeatureProduct() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImage((currentImage) =>
        currentImage === featureProductImages.length - 1 ? 0 : currentImage + 1
      );
    }, 1900);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPreviousImage = () => {
    setActiveImage((currentImage) =>
      currentImage === 0 ? featureProductImages.length - 1 : currentImage - 1
    );
  };

  const showNextImage = () => {
    setActiveImage((currentImage) =>
      currentImage === featureProductImages.length - 1 ? 0 : currentImage + 1
    );
  };

  return (
    <section
      className="col-span-full mt-10 flex w-full justify-center"
      aria-label="Featured product"
    >
      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-sm shadow-black/30">
        <img
          src="/catalog-image/adro-logo.avif"
          alt="ADRO"
          className="pointer-events-none absolute top-4 left-1/2 z-10 h-auto w-20 -translate-x-1/2 object-contain sm:w-28"
        />

        <button
          type="button"
          onClick={showPreviousImage}
          aria-label="Show previous featured product image"
          className="absolute top-1/2 left-4 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/60 text-white transition hover:border-red-600 hover:bg-red-600"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={showNextImage}
          aria-label="Show next featured product image"
          className="absolute top-1/2 right-4 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/60 text-white transition hover:border-red-600 hover:bg-red-600"
        >
          <FaChevronRight aria-hidden="true" />
        </button>

        <div className="relative flex aspect-[14/6] min-h-64 items-center justify-center bg-zinc-800 sm:min-h-80">
          <img
            src={featureProductImages[activeImage]}
            alt={`Featured product image ${activeImage + 1}`}
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 px-3 py-2">
            {featureProductImages.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(imageIndex)}
                aria-label={`Show featured product image ${imageIndex + 1}`}
                aria-current={activeImage === imageIndex}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeImage === imageIndex
                    ? 'bg-red-600'
                    : 'bg-zinc-300/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
