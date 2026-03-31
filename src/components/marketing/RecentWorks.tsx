import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeaturedCursor } from "../ui/Cursors";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "",
    year: "",
    image: "/images/marketing/recentworks/1.png",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "",
    year: "",
    image: "/images/marketing/recentworks/2.png",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "",
    year: "",
    image: "/images/marketing/recentworks/3.png",
    textColor: "text-white",
  },
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
        },
      });

      works.forEach((_, index) => {
        const card = cardsRef.current[index];
        const image = imagesRef.current[index];
        const prevInnerCard =
          index > 0 ? innerCardsRef.current[index - 1] : null;

        if (card && image) {
          const slideTl = gsap.timeline();

          // 1. Solid Slide Up (No Opacity Fade)
          // 3D feel: Starts slightly tilted back and lower
          slideTl.fromTo(
            card,
            { xPercent: -50, yPercent: -50, y: "120vh", rotateX: -5, z: -50 },
            {
              xPercent: -50,
              yPercent: -50,
              y: "0",
              rotateX: 0,
              z: 0,
              duration: 1,
              ease: "power2.out",
            },
          );

          // 2. Parallax Image Effect (Image moves inside mask)
          slideTl.fromTo(
            image,
            { y: "-30%", scale: 1.1 },
            { y: "0%", scale: 1, duration: 1, ease: "power2.out" },
            "<",
          );

          // 3. Previous Card Retreats (Scale down but stay fully opaque)
          // Creates "stacking" depth without dimming
          if (prevInnerCard) {
            slideTl.to(
              prevInnerCard,
              {
                scale: 0.9,
                y: "-10%", // Moves up slightly to show it's behind
                // boxShadow: "0px 10px 40px rgba(0,0,0,0.2)", // Reduce shadow as it goes back
                duration: 1,
                ease: "power2.out",
              },
              "<",
            );
          }

          // Add a pause so the card is fully viewed before the next one enters
          tl.add(slideTl, index === 0 ? 0 : "+=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center perspective-[1200px]"
    >
      <FeaturedCursor isActive={true} />

      {/* Background Title - Black on White */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <h2
          ref={titleRef}
          className="text-5xl xl:text-7xl font-maus font-bold uppercase tracking-tighter text-black leading-none text-center select-none px-8"
        >
          How we cater to different Firm Sizes
        </h2>
      </div>

      {/* Cards - Layers */}
      {works.map((work, index) => (
        <div
          key={work.id}
          ref={(el) => (cardsRef.current[index] = el)}
          className={`absolute top-1/2 left-1/2 w-full md:w-[90%] lg:w-[88%] h-[88vh] z-[${index + 10}] will-change-transform`}
          style={{ transform: "translate(-50%, -50%) translateY(120vh)" }}
        >
          <div
            ref={(el) => (innerCardsRef.current[index] = el)}
            className="w-full h-full relative overflow-hidden origin-bottom"
          >
            {/*  shadow-[0_-20px_60px_rgba(0,0,0,0.3)] bg-gray-100 */}
            {/* Parallax Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                ref={(el) => (imagesRef.current[index] = el)}
                src={work.image}
                alt={work.title}
                className="w-full h-full object-contain object-center"
              />
              {/* <div className="absolute inset-0 bg-black/20"></div> */}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RecentWorks;
