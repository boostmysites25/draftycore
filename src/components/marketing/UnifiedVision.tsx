import { useRef, useEffect } from 'react';
import { CircleCursor } from '../ui/Cursors';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Planning",
    image: "/images/marketing/unified/1.jpeg",
    position: "top-left",
    start: { x: "-60vw", y: "-60vh" },
    color: "bg-brandturquoise",
    radius: "rounded-[2rem]"
  },
  {
    id: 5,
    title: "",
    image: "/images/marketing/unified/2.jpeg",
    position: "top-center",
    start: { x: "0vw", y: "-80vh" },
    color: "bg-brandpurple",
    radius: "rounded-[2rem]"
  },
  {
    id: 2,
    title: "Design",
    image: "/images/marketing/unified/3.jpeg",
    position: "top-right",
    start: { x: "60vw", y: "-60vh" },
    color: "bg-brandpink",
    radius: "rounded-[2rem]"
  },
  {
    id: 3,
    title: "",
    image: "/images/marketing/unified/4.jpeg",
    position: "bottom-left",
    start: { x: "-60vw", y: "60vh" },
    color: "bg-brandorange",
    radius: "rounded-[2rem]"
  },
  {
    id: 6,
    title: "Launch",
    image: "/images/marketing/unified/5.jpeg",
    position: "bottom-center",
    start: { x: "0vw", y: "80vh" },
    color: "bg-brandgreen",
    radius: "rounded-[2rem]"
  },
  {
    id: 4,
    title: "",
    image: "/images/marketing/unified/6.jpeg",
    position: "bottom-right",
    start: { x: "60vw", y: "60vh" },
    color: "bg-brandyellow",
    radius: "rounded-[2rem]"
  }
];

const UnifiedVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current || !containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animate cards from screen edges to center
      cards.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        tl.fromTo(el,
          {
            x: card.start.x,
            y: card.start.y,
            rotation: Math.random() * 30 - 15,
            scale: 0.5,
            opacity: 1
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            duration: 1
          },
          "<"
        );
      });

      // Fade in the wrapper shadow/background at the end to unify them
      // tl.fromTo(wrapperRef.current,
      //   { boxShadow: "none", backgroundColor: "transparent" },
      //   {
      //     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      //     backgroundColor: "white",
      //     duration: 0.2
      //   },
      //   "-=0.2"
      // );

      // Scale up the unified card slightly at the end
      tl.to(wrapperRef.current, {
        scale: 1.05,
        duration: 0.5,
        ease: "power1.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-white relative overflow-hidden flex items-center justify-center">
      <CircleCursor isActive={true} />

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[15vw] font-maus font-black text-gray-50 leading-none select-none">
          UNIFIED
        </h2>
      </div>

      {/* Wrapper */}
      <div
        ref={wrapperRef}
        className="relative grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-[1000px] px-4 md:px-8 z-10"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={el => cardRefs.current[index] = el}
            className={`relative w-full aspect-[4/5] md:aspect-square overflow-hidden group ${card.radius} shadow-lg`}
          >
            {/* <div className={`${card.radius} absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 ${card.color}`}></div> */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-700 group-hover:backdrop-blur-[2px] group-hover:brightness-75"
            />

            {/* Overlay Content */}
            <div className={`${card.radius} absolute inset-0 h-full w-full flex items-center justify-center`}>
              <h3 className="text-white brightness-90 font-coolvetica font-bold text-2xl md:text-3xl tracking-wide uppercase">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UnifiedVision;