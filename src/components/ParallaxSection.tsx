import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const sections = [
  {
    id: 1,
    title: 'A Civic for everyone',
    description:
      'The Honda Civic began with a simple idea: thoughtful engineering should make everyday driving more efficient, comfortable, and enjoyable.',
    imageUrl: '/catalog-image/slider-2.avif',
    reverse: false,
  },
  {
    id: 2,
    title: 'Built to evolve',
    description:
      'Across generations, the Civic has grown from a practical commuter into an icon without losing the balanced character that made it distinct.',
    imageUrl: '/catalog-image/slider-3.avif',
    reverse: true,
  },
  {
    id: 3,
    title: 'Made for what is next',
    description:
      'The latest Civic carries that legacy forward with a refined interior, confident design, and technology shaped around the driver.',
    imageUrl: '/catalog-image/10th-gen.avif',
    reverse: false,
  },
];

export const ParallaxSection = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [firstSectionRef, secondSectionRef, thirdSectionRef];

  const scrollProgress = sectionRefs.map(
    (sectionRef) =>
      useScroll({
        target: sectionRef,
        offset: ['start end', 'center start'],
      }).scrollYProgress
  );

  const opacityContents = scrollProgress.map((progress) =>
    useTransform(progress, [0, 0.5], [0, 1])
  );
  const clipProgresses = scrollProgress.map((progress) =>
    useTransform(progress, [0, 0.5], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  );
  const translateContents = scrollProgress.map((progress) =>
    useTransform(progress, [0, 1], [-50, 0])
  );

  return (
    <section className="overflow-hidden bg-black text-white">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
        <h2 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          THE CIVIC STORY, IN MOTION
        </h2>
        <p className="mt-16 flex items-center gap-2 text-xs tracking-[0.3em] text-white/60">
          SCROLL <ArrowDown size={15} />
        </p>
      </div>

      <div className="flex flex-col px-6 md:px-0">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={sectionRefs[index]}
            className={`flex min-h-screen items-center justify-center gap-12 py-20 md:gap-40 md:py-0 ${section.reverse ? 'flex-row-reverse' : ''}`}
          >
            <motion.div
              style={{ y: translateContents[index] }}
              className="max-w-sm"
            >
              <h3 className="text-4xl font-semibold tracking-tight md:text-6xl">
                {section.title}
              </h3>
              <motion.p
                style={{ y: translateContents[index] }}
                className="mt-8 max-w-sm text-base leading-relaxed text-white/70"
              >
                {section.description}
              </motion.p>
            </motion.div>

            <motion.div
              style={{
                opacity: opacityContents[index],
                clipPath: clipProgresses[index],
              }}
              className="relative hidden md:block"
            >
              <img
                src={section.imageUrl}
                className="size-100 object-cover"
                alt={section.title}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxSection;
