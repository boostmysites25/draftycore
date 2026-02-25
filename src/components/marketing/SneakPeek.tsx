import { useRef, useEffect } from 'react';
import { CircleCursor } from '../ui/Cursors';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    color: "group-hover:text-brandturquoise",
  },
  {
    id: 2,
    title: "Project Management",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    color: "group-hover:text-brandorange",
  },
  {
    id: 3,
    title: "Live Chat",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    color: "group-hover:text-brandpink",
  },
  {
    id: 4,
    title: "Screen Share Meeting",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop",
    color: "group-hover:text-brandyellow",
  },
  {
    id: 5,
    title: "Invoicing",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    color: "group-hover:text-brandlimegreen",
  },
  {
    id: 6,
    title: "Company/Employee Profile",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    color: "group-hover:text-brandturquoise",
  }
];

const SneakPeek = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; // Subtle tilt
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <section ref={containerRef} className="w-full h-screen bg-white relative overflow-hidden flex flex-col justify-center">
      <CircleCursor isActive={true} />
      
      <div className="w-full h-full flex flex-col justify-center">
        
        {/* Centered Heading */}
        <div className="w-full text-center mb-12 flex-shrink-0 pt-20">
            <h2 className="text-6xl md:text-8xl font-maus font-black tracking-tighter bg-gradient-to-r from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent inline-block">
                Drafty Sneak-Peek
            </h2>
            <p className="mt-4 text-xl text-gray-500 font-coolvetica max-w-2xl mx-auto">
                Scroll to explore the powerful interface.
            </p>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="w-full flex-1 flex items-center overflow-hidden pl-8 md:pl-16">
            <div ref={trackRef} className="flex gap-8 md:gap-16 w-fit pr-20">
                {features.map((feature, index) => (
                    <div 
                        key={feature.id} 
                        className="w-[85vw] md:w-[70vw] h-[50vh] md:h-[60vh] flex-shrink-0"
                    >
                         <div
                            ref={el => cardsRef.current[index] = el}
                            className={`
                                group relative w-full h-full rounded-[2.5rem] bg-gray-50 p-2 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500
                            `}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="w-full h-full relative rounded-[2rem] overflow-hidden bg-white flex flex-col border border-gray-100">
                                {/* Image Container */}
                                <div className="relative flex-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                                    <img 
                                        src={feature.image} 
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    
                                    {/* Floating Badge (Glassmorphism) */}
                                    <div className="absolute top-8 right-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <span className="text-sm font-bold text-white tracking-widest uppercase">View</span>
                                    </div>

                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-xl w-fit">
                                        <h3 className={`text-2xl md:text-4xl font-coolvetica font-bold text-black transition-colors duration-300 ${feature.color}`}>
                                            {feature.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
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