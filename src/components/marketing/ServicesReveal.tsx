import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !textRef.current) return;

      const words = textRef.current.querySelectorAll(".word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500", // Increased scroll distance
          pin: true,
          scrub: 1,
        },
      });

      // 1. Reveal Words (Staggered from bottom)
      tl.fromTo(
        words,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          stagger: 0.1,
          ease: "power3.out",
        },
      )
        // Small pause after reveal
        .to({}, { duration: 0.5 })

        // 2. Zoom Effect
        .to(textRef.current, {
          scale: 100, // Massive zoom
          duration: 4,
          ease: "power2.inOut",
          transformOrigin: "center center",
        })

        // 3. Fade out at the end
        .to(
          textRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          "-=1",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sentence = "What services we provide you actually";

  return (
      <section
        ref={containerRef}
        className="w-full h-screen bg-[#111111] flex items-center justify-center overflow-hidden relative z-50"
      >
        <div className="relative z-10 text-center px-4">
          <h2
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-8xl font-coolvetica leading-tight tracking-tight text-white flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-5xl mx-auto"
          >
            {sentence.split(" ").map((word, i) => (
              <span key={i} className="word inline-block relative">
                {word}
              </span>
            ))}
          </h2>
        </div>
      </section>
  );
};

export default ServicesReveal;
