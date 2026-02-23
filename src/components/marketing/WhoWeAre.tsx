import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CircleCursor } from "../ui/Cursors";

const animation = { duration: 60000, easing: (t: number) => t };

const WhoWeAre = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.querySelectorAll(".letter");

    letters.forEach((letter) => {
            // Random initial position
            gsap.set(letter, {
                y: "random(-20, 20)",
                opacity: 1, // Ensure visible
            });

            // Animate up and down continuously with random durations
            gsap.to(letter, {
                y: "random(-20, 20)",
                duration: "random(1.5, 3)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                opacity: 1, // Keep visible
            });
    });

    return () => {
      gsap.killTweensOf(letters);
    };
  }, []);

  const services = [
    {
      title: "Civil Engineering",
      color: "bg-[#1E3A8A]", // Deep blue
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", // Construction placeholder
    },
    {
      title: "Shop Detailing",
      color: "bg-[#F59E0B]", // Yellow/Orange
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop", // Blueprint/Detail placeholder
    },
    {
      title: "Structural Engineering",
      color: "bg-[#3B82F6]", // Blue
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop", // Structure placeholder
    },
    {
      title: "Architecture",
      color: "bg-[#EF4444]", // Red
      img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop", // Architecture placeholder
    },
  ];

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 1.5,
      spacing: 16,
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 16 },
      },
    },
  });

  return (
    <section className="w-full min-h-screen grid grid-cols-1 xl:grid-cols-[40%,1fr] bg-[#0a0a2e] overflow-hidden">
      <CircleCursor isActive={true} />
      {/* Left Side - Image */}{" "}
      <div className="w-full relative min-h-[50vh] xl:min-h-screen bg-[#0a0a2e]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/marketing/who-we-are.png"
            alt="Drafting Workspace"
            className="w-full h-full object-cover drop-shadow-2xl z-10 relative"
          />
          {/* Background glow/gradient behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
      {/* Right Side - Content */}
      <div className="w-full bg-[#291c52] relative flex flex-col justify-between p-8 md:p-12 xl:p-20 rounded-tl-[3rem] xl:rounded-tl-[5rem] -mt-10 xl:mt-0 xl:-ml-10 z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        {/* Top Content */}
        <div className="flex flex-col h-full justify-center">
          {/* Logo/Brand */}
          <h3 className="text-4xl xl:text-5xl font-medium mb-12 bg-gradient-to-br from-blue-300 via-purple-400 to-orange-300 bg-clip-text text-transparent inline-block font-coolvetica pb-2">
            DraftyCo
          </h3>

          {/* Description */}
          <p className="text-white/90 text-xl xl:text-2xl leading-relaxed mb-16 max-w-2xl font-coolvetica tracking-wide">
            Your behind the scenes drafting powerhouse delivering precision,
            speed, and scale to elevate design firms across Australia.
          </p>

          {/* Service Cards Slider */}
          <div className="mb-20 -mx-8 md:-mx-12 xl:-mx-20">
            <div ref={sliderRef} className="keen-slider">
              {[...services, ...services].map((service, index) => (
                <div
                  key={index}
                  className="keen-slider__slide aspect-[4/2.5] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  onClick={() => console.log(`Clicked ${service.title}`)}
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Color tint overlay */}
                  <div
                    className={`absolute inset-0 ${service.color} opacity-60 mix-blend-multiply z-0`}
                  ></div>

                  {/* Content */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
                    <span className="text-white text-sm md:text-base font-bold leading-tight drop-shadow-md">
                      {service.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Content - Title */}
          <div className="relative mt-auto pt-10 border-t border-white/10 flex items-end justify-between w-full">
            <div className="flex items-end gap-4 md:gap-8">
                <h2
                ref={titleRef}
                className="text-6xl md:text-7xl xl:text-8xl font-maus font-black tracking-tighter leading-none uppercase flex gap-4 md:gap-8 relative z-10"
                >
                <span className="flex">
                    {"WHO".split("").map((char, i) => (
                    <span
                        key={`who-${i}`}
                        className="letter inline-block bg-gradient-to-b from-white via-purple-200 to-purple-400 text-transparent bg-clip-text drop-shadow-lg relative z-10 translate-y-0"
                    >
                        {char}
                    </span>
                    ))}
                </span>
                <span className="flex">
                    {"WE".split("").map((char, i) => (
                    <span
                        key={`we-${i}`}
                        className="letter inline-block bg-gradient-to-b from-white via-purple-200 to-purple-400 text-transparent bg-clip-text drop-shadow-lg relative z-10 translate-y-0"
                    >
                        {char}
                    </span>
                    ))}
                </span>
                <span className="flex">
                    {"ARE".split("").map((char, i) => (
                    <span
                        key={`are-${i}`}
                        className="letter inline-block bg-gradient-to-b from-white via-purple-200 to-purple-400 text-transparent bg-clip-text drop-shadow-lg relative z-10 translate-y-0"
                    >
                        {char}
                    </span>
                    ))}
                </span>
                </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
