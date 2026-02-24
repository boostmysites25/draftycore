import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "Sonder goods",
    year: "/2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop", 
    textColor: "text-white"
  },
  {
    id: 2,
    title: "Urban Future",
    year: "/2026",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2560&auto=format&fit=crop", 
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Abstract Realm",
    year: "/2025",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2560&auto=format&fit=crop", 
    textColor: "text-white"
  }
];

const RecentWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardsRef = useRef<(HTMLDivElement | null)[]>([]); 
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]); 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${works.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      works.forEach((_, index) => {
        const card = cardsRef.current[index];
        const innerCard = innerCardsRef.current[index];
        const image = imagesRef.current[index];
        const prevInnerCard = index > 0 ? innerCardsRef.current[index - 1] : null;

        if (card && image) {
          const slideTl = gsap.timeline();
          
          // 1. Solid Slide Up (No Opacity Fade)
          // 3D feel: Starts slightly tilted back and lower
          slideTl.fromTo(card, 
            { y: "100%", rotateX: -5, z: -50 }, 
            { y: "0%", rotateX: 0, z: 0, duration: 1, ease: "power2.out" }
          );

          // 2. Parallax Image Effect (Image moves inside mask)
          slideTl.fromTo(image,
            { y: "-30%", scale: 1.1 },
            { y: "0%", scale: 1, duration: 1, ease: "power2.out" },
            "<" 
          );

          // 3. Previous Card Retreats (Scale down but stay fully opaque)
          // Creates "stacking" depth without dimming
          if (prevInnerCard) {
            slideTl.to(prevInnerCard, {
              scale: 0.9,
              y: "-10%", // Moves up slightly to show it's behind
              boxShadow: "0px 10px 40px rgba(0,0,0,0.2)", // Reduce shadow as it goes back
              duration: 1,
              ease: "power2.out"
            }, "<");
          }

          tl.add(slideTl, index === 0 ? 0 : "-=0.2"); // Tighter sequencing
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">
      
      {/* Background Title - Black on White */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <h2 ref={titleRef} className="text-[12vw] md:text-[15vw] font-maus font-bold uppercase tracking-tighter text-black leading-none text-center select-none">
          RECENT WORK
        </h2>
      </div>

      {/* Cards - Layers */}
      {works.map((work, index) => (
        <div
          key={work.id}
          ref={el => cardsRef.current[index] = el}
          className={`absolute bottom-0 w-full md:w-[90%] lg:w-[80%] h-[85vh] z-[${index + 10}] will-change-transform`}
          style={{ transform: 'translateY(100%)' }} 
        >
          <div 
            ref={el => innerCardsRef.current[index] = el}
            className="w-full h-full relative rounded-t-[3rem] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.3)] origin-bottom bg-gray-100"
          >
            
            {/* Parallax Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    ref={el => imagesRef.current[index] = el}
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-[130%] object-cover object-center" 
                />
                <div className="absolute inset-0 bg-black/20"></div> 
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-16">
              <div className="flex justify-end items-start">
                {/* <span className="text-white text-xl font-bold tracking-widest uppercase border border-white/30 px-6 py-2 rounded-full backdrop-blur-md">
                  Project 0{index + 1}
                </span> */}
                <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300">
                  <FaArrowRight className="-rotate-45" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <h3 className={`text-6xl md:text-[8rem] font-maus font-black uppercase leading-none ${work.textColor} drop-shadow-lg`}>
                  {work.title}
                </h3>
                <span className={`text-3xl md:text-5xl font-coolvetica ${work.textColor} opacity-90`}>
                  {work.year}
                </span>
              </div>
            </div>

          </div>
        </div>
      ))}

    </section>
  );
};

export default RecentWorks;