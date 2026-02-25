import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import { FaArrowRight } from "react-icons/fa";
import { CircleCursor } from "../ui/Cursors";

const animation = { duration: 60000, easing: (t: number) => t };

const TickerLetter = ({ char }: { char: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(wrapperRef.current, {
        yPercent: -50,
        duration: 2 + Math.random() * 1, // Random speed between 2s and 3s for independent feel
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <span className="relative overflow-hidden h-[0.85em] inline-block align-bottom leading-none">
      <span ref={wrapperRef} className="flex flex-col">
        <span className="bg-gradient-to-br from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent pb-1">
          {char}
        </span>
        <span className="bg-gradient-to-br from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent pb-1">
          {char}
        </span>
      </span>
    </span>
  );
};

const WhoWeAre = () => {
  const services = [
    {
      title: "Civil Engineering",
      color: "bg-brandturquoise",
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Shop Detailing",
      color: "bg-brandorange",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Structural Engineering",
      color: "bg-brandpink",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Architecture",
      color: "bg-brandyellow",
      img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop",
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
    <section className="w-full min-h-screen grid grid-cols-1 xl:grid-cols-[40%,1fr] bg-white relative">
      <CircleCursor isActive={true} />

      {/* Left Side - Image */}
      <div className="w-full relative min-h-[50vh] xl:min-h-screen bg-white z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/marketing/who-we-are.webp"
            alt="Drafting Workspace"
            className="w-full h-full object-cover drop-shadow-2xl relative"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brandturquoise/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>

      {/* Right Side - Content Container */}
      <div className="w-full bg-white relative flex flex-col p-8 md:p-12 xl:p-20 rounded-tl-[3rem] xl:rounded-tl-[5rem] -mt-10 xl:mt-0 xl:-ml-[4.5rem] z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] md:pb-40 border-l border-black/5">
        {/* Top Content */}
        <div className="flex flex-col justify-center w-full">
          <h3 className="text-4xl xl:text-5xl font-medium mb-12 bg-gradient-to-br from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent inline-block font-coolvetica pb-2">
            DraftyCo
          </h3>

          <p className="text-black/80 text-xl xl:text-2xl leading-relaxed mb-16 max-w-2xl font-coolvetica tracking-wide">
            Your behind the scenes drafting powerhouse delivering precision,
            speed, and scale to elevate design firms across Australia.
          </p>

          <div className="mb-20 -mx-8 md:-mx-12 xl:-mx-[5.1rem] overflow-hidden">
            <div ref={sliderRef} className="keen-slider">
              {[...services, ...services].map((service, index) => (
                <div
                  key={index}
                  className="keen-slider__slide aspect-[4/2.5] rounded-2xl overflow-hidden relative group cursor-pointer border border-black/10 hover:border-black/30 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 ${service.color} opacity-60 mix-blend-multiply z-0`}
                  ></div>
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
                    <span className="text-white text-sm md:text-base font-bold leading-tight drop-shadow-md">
                      {service.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Content - Positioned Absolute to Section */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 xl:bottom-16 xl:right-16 z-[100] flex items-end gap-4 md:gap-8 pointer-events-none">
        <h2 className="text-6xl md:text-7xl xl:text-8xl font-maus font-black tracking-tighter leading-none uppercase flex gap-4 md:gap-8 relative text-black pointer-events-auto">
          <span className="flex">
            {"WHO".split("").map((char, i) => (
              <TickerLetter key={`who-${i}`} char={char} />
            ))}
          </span>
          <span className="flex">
            {"WE".split("").map((char, i) => (
              <TickerLetter key={`we-${i}`} char={char} />
            ))}
          </span>
          <span className="flex">
            {"ARE".split("").map((char, i) => (
              <TickerLetter key={`are-${i}`} char={char} />
            ))}
          </span>
        </h2>
        {/* <div className="animate-bounce h-fit w-fit">
          <FaArrowRight className="w-12 h-12 md:w-20 md:h-20 text-yellow-400 mb-2 md:mb-4 shrink-0 rotate-45 pointer-events-auto" />
        </div> */}
      </div>
    </section>
  );
};

export default WhoWeAre;