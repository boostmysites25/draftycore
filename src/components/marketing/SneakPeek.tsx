import { useRef, useEffect } from 'react';
import { CircleCursor } from '../ui/Cursors';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Project Management",
    image: "/images/marketing/sneakpeek/1.png",
    color: "group-hover:text-brandturquoise",
  },
  {
    id: 2,
    title: "Schedules",
    image: "/images/marketing/sneakpeek/2.png",
    color: "group-hover:text-brandorange",
  },
  {
    id: 3,
    title: "Dashboard",
    image: "/images/marketing/sneakpeek/3.png",
    color: "group-hover:text-brandpink",
  },
  {
    id: 4,
    title: "Daily Calender",
    image: "/images/marketing/sneakpeek/4.png",
    color: "group-hover:text-brandyellow",
  },
  {
    id: 5,
    title: "Screen Share Meeting",
    image: "/images/marketing/sneakpeek/5.png",
    color: "group-hover:text-brandlimegreen",
  },
];

const SneakPeek = ({ heading }: { heading: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const scrollAmount = trackWidth - containerWidth + 100; // Extra buffer

      gsap.to(trackRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // hover tilt effect temporarily disabled
  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
  //   const card = cardsRef.current[index];
  //   if (!card) return;
  //
  //   const rect = card.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;
  //
  //   const centerX = rect.width / 2;
  //   const centerY = rect.height / 2;
  //
  //   const rotateX = ((y - centerY) / centerY) * -5;
  //   const rotateY = ((x - centerX) / centerX) * 5;
  //
  //   gsap.to(card, {
  //     rotateX: rotateX,
  //     rotateY: rotateY,
  //     transformPerspective: 1000,
  //     scale: 1.02,
  //     duration: 0.4,
  //     ease: "power2.out"
  //   });
  // };
  //
  // const handleMouseLeave = (index: number) => {
  //   const card = cardsRef.current[index];
  //   if (!card) return;
  //
  //   gsap.to(card, {
  //     rotateX: 0,
  //     rotateY: 0,
  //     scale: 1,
  //     duration: 0.7,
  //     ease: "elastic.out(1, 0.5)"
  //   });
  // };

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-white xl:h-screen relative overflow-hidden flex flex-col justify-center py-20 xl:mt-20 xl:py-0">
      <CircleCursor isActive={true} />

      <div className="w-full xl:h-full flex flex-col justify-center">

        {/* Centered Heading */}
        <div className="w-full text-center mb-8 xl:mb-8 flex-shrink-0">
          <h2 className="text-5xl xl:text-7xl font-maus font-black tracking-tighter bg-gradient-to-r from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent inline-block px-4">
            {heading}
          </h2>
          <p className="mt-4 text-2xl text-gray-500 font-coolvetica max-w-2xl mx-auto">
          AI POWERED DRAFTING POWERHOUSE 
          </p>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="w-full flex-1 flex items-center overflow-hidden pl-4 md:pl-8 lg:pl-16">
          <div ref={trackRef} className="flex gap-4 md:gap-8 lg:gap-16 w-fit pr-10 md:pr-20">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[55vw] shrink-0 rounded-[2rem] md:rounded-[2.5rem]"
              >
                <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]">
                  <div
                    // ref={el => cardsRef.current[index] = el}
                    className={`
                                group relative w-full h-full bg-gray-50 p-2 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem]
                            `}
                    // onMouseMove={(e) => handleMouseMove(e, index)}
                    // onMouseLeave={() => handleMouseLeave(index)}
                    // style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="w-full h-full relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-white flex flex-col border border-gray-100">
                      {/* Image Container */}
                      <div className="relative flex-1 overflow-hidden">
                        <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      </div>

                      {/* Content Overlay */}
                      {/* <div className="absolute bottom-0 left-0 w-full p-3 md:p-6 lg:p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white/95 backdrop-blur-md p-3 md:p-5 lg:p-6 rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/40 shadow-xl w-fit max-w-[95%]">
                          <h3 className={`text-lg md:text-2xl xl:text-4xl font-coolvetica font-bold text-black transition-colors duration-300 truncate ${feature.color}`}>
                            {feature.title}
                          </h3>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-5 lg:p-6 w-fit max-w-[95%] mx-auto">
                  <h3 className={`text-2xl md:text-3xl xl:text-3xl font-coolvetica font-bold text-black transition-colors duration-300 truncate ${feature.color}`}>
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SneakPeek;