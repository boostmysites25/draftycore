import { useRef, useEffect } from 'react';
import { CircleCursor } from '../ui/Cursors';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Planning",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
    position: "top-left",
    start: { x: "-60vw", y: "-60vh" },
    color: "bg-brandturquoise",
    radius: "rounded-tl-[2rem]"
  },
  {
    id: 5,
    title: "Strategy",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    position: "top-center",
    start: { x: "0vw", y: "-80vh" },
    color: "bg-brandpurple",
    radius: "rounded-t-[2rem]"
  },
  {
    id: 2,
    title: "Design",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    position: "top-right",
    start: { x: "60vw", y: "-60vh" },
    color: "bg-brandpink",
    radius: "rounded-tr-[2rem]"
  },
  {
    id: 3,
    title: "Engineering",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    position: "bottom-left",
    start: { x: "-60vw", y: "60vh" },
    color: "bg-brandorange",
    radius: "rounded-bl-[2rem]"
  },
  {
    id: 6,
    title: "Launch",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    position: "bottom-center",
    start: { x: "0vw", y: "80vh" },
    color: "bg-brandgreen",
    radius: "rounded-b-[2rem]"
  },
  {
    id: 4,
    title: "Execution",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    position: "bottom-right",
    start: { x: "60vw", y: "60vh" },
    color: "bg-brandyellow",
    radius: "rounded-br-[2rem]"
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
      tl.fromTo(wrapperRef.current,
        { boxShadow: "none", backgroundColor: "transparent" },
        {
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          duration: 0.2
        },
        "-=0.2"
      );

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

      {/* Wrapper - 3-column, 2-row grid for 6 boxes */}
      <div
        ref={wrapperRef}
        className="relative grid gap-1.5 rounded-[2rem]"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          width: "min(85vw, 900px)",
          height: "min(60vw, 600px)"
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={el => cardRefs.current[index] = el}
            className={`relative w-full h-full overflow-hidden group ${card.radius}`}
          >
            <div className={`${card.radius} absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 ${card.color}`}></div>
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 backdrop-blur-[2px]">
              <h3 className="text-white font-coolvetica font-bold text-2xl md:text-3xl tracking-wide uppercase">
                {card.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Center Grid dividers */}
        <div className="absolute top-1/2 left-0 w-full h-[6px] bg-white z-30 pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-0 left-1/3 w-[6px] h-full bg-white z-30 pointer-events-none"></div>
        <div className="absolute top-0 left-2/3 w-[6px] h-full bg-white z-30 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default UnifiedVision;