import { useEffect, useRef, useState } from "react";
import {
  FaArrowDown,
  FaCog,
  FaClock,
  FaRulerCombined,
  FaUsers,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { CircleCursor } from "../ui/Cursors";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import ConnectiveTech from "../ui/ConnectiveTech";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "speed",
    capsuleText: "DEADLINE CRUNCH",
    title: "Speed vs Standards",
    icon: <FaClock />,
    description:
      "Deadlines stay tight, but quality can’t slip. You’re expected to deliver speed and design integrity, constantly racing the clock without compromising the craft.",
    image:
      "/images/marketing/challenges/1.jpeg",
    activeColor: "bg-brandturquoise",
    textColor: "text-brandturquoise",
    cardTextColor: "text-black",
  },
  {
    id: "overhead",
    capsuleText: "PAYROLL PRESSURE",
    title: "Overhead Overload",
    icon: <FaArrowDown />,
    description:
      "Full-time hires come with fixed costs that don’t shrink when the workload does, leaving you carrying payroll weight even during quieter periods.",
    image:
      "/images/marketing/challenges/2.jpeg",
    activeColor: "bg-brandorange",
    textColor: "text-brandorange",
    cardTextColor: "text-white",
  },
  {
    id: "capacity",
    capsuleText: "WORKLOAD WOBBLE",
    title: "Capacity Rollercoaster",
    icon: <FaRulerCombined />,
    description:
      "Workloads fluctuate constantly. One moment you’re stretched thin, the next you’re sitting on unused capacity with no easy way to balance it.",
    image:
      "/images/marketing/challenges/3.jpeg",
    activeColor: "bg-brandpink",
    textColor: "text-brandpink",
    cardTextColor: "text-white",
  },
  {
    id: "design",
    capsuleText: "CREATIVE CLOG",
    title: "Design Trap",
    icon: <FaCog />,
    description:
      "Your designers spend valuable time on repetitive drafting instead of real design thinking, using creativity on production work rather than ideas.",
    image:
      "/images/marketing/challenges/4.jpeg",
    activeColor: "bg-brandyellow",
    textColor: "text-brandyellow",
    cardTextColor: "text-black",
  },
  {
    id: "talent",
    capsuleText: "TALENT DRAIN",
    title: "Talent Tug-of-War",
    icon: <FaUsers />,
    description:
      "Skilled drafters are difficult to find and even harder to retain, meaning every investment in training risks walking out the door.",
    image:
      "/images/marketing/challenges/5.jpeg",
    activeColor: "bg-brandlimegreen",
    textColor: "text-brandlimegreen",
    cardTextColor: "text-black",
  },
];

const Impact = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndexRef = useRef(0);

  // Fixed height for each tab item
  const ITEM_HEIGHT = 60;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      const scrollDuration = items.length * 500;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDuration}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(
            items.length - 1,
            Math.max(0, Math.floor(self.progress * items.length)),
          );

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
            if (swiperRef.current && !swiperRef.current.destroyed) {
              swiperRef.current.slideTo(index);
            }
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculate transform to scroll the list naturally from top to bottom
  const getListTransform = () => {
    if (!leftContainerRef.current) return "translateY(0px)";

    const containerHeight = leftContainerRef.current.clientHeight;
    const listHeight = items.length * ITEM_HEIGHT;

    if (listHeight <= containerHeight) return "translateY(0px)"; // No scroll needed

    const maxScroll = listHeight - containerHeight;
    // Map active index to scroll percentage
    // If index is 0 -> 0% scroll
    // If index is last -> 100% scroll
    const progress = activeIndex / (items.length - 1);
    const translateY = -1 * progress * maxScroll;

    return `translateY(${translateY}px)`;
  };

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-[#F5F5F0] relative overflow-hidden flex items-center z-10 pb-28 xl:pb-0"
    >
      <CircleCursor isActive={true} />
      <ConnectiveTech />

      {/* Background Decoration (Subtle Annoyed Faces) */}
      <div className=" absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Top Right */}
        <div className="absolute z-[2] top-[1%] right-[8%] opacity-50">
          <img src="/images/marketing/challenges/face4.png" className="w-[80px] object-contain animate-[spin_6s_linear_infinite]" alt="Annoyed face 1" />
        </div>
        {/* Bottom Left */}
        <div className="absolute z-[2] bottom-[0%] left-[8%] opacity-50">
          <img src="/images/marketing/challenges/face2.png" className="w-[80px] object-contain animate-[spin_8s_linear_infinite_reverse]" alt="Annoyed face 2" />
        </div>
        {/* Top Center Gap */}
        <div className="absolute z-[2] top-[10%] left-0 xl:left-[40%] opacity-50">
          <img src="/images/marketing/challenges/face3.png" className="w-[80px] object-contain animate-[bounce_5s_linear_infinite]" alt="Annoyed face 3" />
        </div>
        {/* Bottom Center Gap */}
        {/* <div className="absolute z-[2] bottom-[10%] right-[5%] opacity-40">
          <img src="/images/marketing/challenges/face4.png" className="w-[90px] object-contain animate-[bounce_6s_linear_infinite]" alt="Annoyed face 4" />
        </div> */}
      </div>

      {/* Header */}
      {/* <div className="absolute top-12 xl:top-24 left-8 xl:left-16 z-20 pointer-events-none">
        <h2 className="text-5xl xl:text-7xl font-maus font-black uppercase tracking-tighter text-black/90">
          Challenges you face
        </h2>
      </div> */}

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 xl:px-8 mt-24 xl:mt-14 flex h-full items-center gap-8">
        {/* Left Side - Scrolling Tabs */}
        <div
          ref={leftContainerRef}
          className="hidden xl:flex w-1/2 h-[90vh] relative flex-col gap-7 overflow-hidden"
        >
          <h2 className="text-5xl xl:text-7xl font-maus font-black uppercase tracking-tighter text-black/90">
            Challenges you face
          </h2>
          <div className="relative w-full">
            <div
              className="absolute left-0 w-full transition-transform duration-500 ease-out flex flex-col items-start top-0 gap-5"
              style={{
                transform: getListTransform(),
              }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center"
                  style={{ height: `${ITEM_HEIGHT}px` }}
                >
                  <button
                    className={`
                        group flex w-[300px] xl:w-[400px] items-center gap-6 px-6 py-4 rounded-[2rem] transition-all duration-300 text-left
                        ${index === activeIndex
                        ? `${item.activeColor} shadow-xl z-10`
                        : "bg-white border border-black/10 text-black/60 hover:bg-black/5"
                      }
                    `}
                  >
                    <span
                      className={`text-3xl ${index === activeIndex ? "text-white" : "text-current"}`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`font-coolvetica font-bold tracking-wide uppercase text-2xl ${index === activeIndex ? "text-white" : "text-current"}`}
                    >
                      {item.capsuleText}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Creative 3D Slider */}
        <div className="w-full md:w-[80%] mx-auto xl:mx-0 xl:w-1/2 h-[80vh] xl:h-[80vh] flex flex-col gap-5 items-center justify-center relative">
          <h2 className="xl:hidden flex text-5xl xl:text-7xl font-maus font-black uppercase tracking-tighter text-black/90 text-center">
            Challenges you face
          </h2>
          <Swiper
            effect={"creative"}
            grabCursor={false}
            centeredSlides={true}
            slidesPerView={"auto"}
            creativeEffect={{
              limitProgress: 2,
              prev: {
                shadow: true,
                translate: ["-20%", 0, -200],
                rotate: [0, 0, -10],
                scale: 0.85,
              },
              next: {
                shadow: true,
                translate: ["20%", 0, -200],
                rotate: [0, 0, 10],
                scale: 0.85,
              },
              shadowPerProgress: true,
            }}
            speed={700}
            modules={[EffectCreative]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="w-full h-full flex items-center justify-center !overflow-visible"
            allowTouchMove={false}
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className="w-[500px] xl:w-[600px] h-[70vh] flex items-center justify-center transition-all duration-500 !overflow-hidden rounded-[3rem]"
              >
                <div
                  className={`
                            ${item.activeColor} rounded-[3rem] p-6 shadow-2xl w-full h-full flex flex-col relative overflow-hidden
                            ${index !== activeIndex ? "brightness-90" : ""} 
                        `}
                >
                  {/* Card Image */}
                  <div className="relative flex-1 rounded-[2.5rem] overflow-hidden mb-6 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-3 shadow-lg">
                      <span className={`${item.textColor} text-lg`}>
                        {item.icon}
                      </span>{" "}
                      {item.capsuleText}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={`px-6 pb-4 ${item.cardTextColor}`}>
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-4xl xl:text-5xl font-maus font-black mb-4 leading-none text-current">
                          {item.title}
                        </h3>
                        <p className="text-lg opacity-90 leading-relaxed font-medium max-w-xl line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      {/* <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl shrink-0">
                                        <FaArrowDown className="-rotate-45" />
                                    </div> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Impact;
