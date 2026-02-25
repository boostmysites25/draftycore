import { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaArrowDown,
  FaGlobe,
  FaSmile,
  FaCog,
  FaHeart,
  FaClock,
  FaShieldAlt,
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
    id: "precision",
    title: "PRECISION ACCURACY",
    icon: <FaStar />,
    description:
      "Our drafting teams maintain the highest standards of accuracy, ensuring every line and dimension meets strict Australian engineering protocols.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandturquoise",
    textColor: "text-brandturquoise",
    cardTextColor: "text-black",
  },
  {
    id: "turnaround",
    title: "FAST TURNAROUND",
    icon: <FaArrowDown />,
    description:
      "We understand that time is money. Our workflow is optimized to deliver detailed shop drawings significantly faster than traditional methods.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandorange",
    textColor: "text-brandorange",
    cardTextColor: "text-white",
  },
  {
    id: "scalable",
    title: "SCALABLE TEAMS",
    icon: <FaGlobe />,
    description:
      "Scale your drafting capacity up or down instantly. We provide the resources you need, exactly when you need them.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandpink",
    textColor: "text-brandpink",
    cardTextColor: "text-white",
  },
  {
    id: "cost",
    title: "COST EFFECTIVE",
    icon: <FaSmile />,
    description:
      "Reduce overheads without compromising quality. Our remote drafting model offers significant cost savings for design firms.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandyellow",
    textColor: "text-brandyellow",
    cardTextColor: "text-black",
  },
  {
    id: "technology",
    title: "LATEST TECH",
    icon: <FaCog />,
    description:
      "We utilize the latest BIM and CAD software to ensure compatibility and integration with your existing project workflows.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandlimegreen",
    textColor: "text-brandlimegreen",
    cardTextColor: "text-black",
  },
  {
    id: "dedicated",
    title: "DEDICATED SUPPORT",
    icon: <FaHeart />,
    description:
      "You get a dedicated project manager who ensures clear communication and timely delivery throughout the project lifecycle.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandturquoise",
    textColor: "text-brandturquoise",
    cardTextColor: "text-black",
  },
  {
    id: "availability",
    title: "24/7 AVAILABILITY",
    icon: <FaClock />,
    description:
      "Our global team structure allows for round-the-clock progress on your projects, minimizing downtime.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandorange",
    textColor: "text-brandorange",
    cardTextColor: "text-white",
  },
  {
    id: "security",
    title: "SECURE DATA",
    icon: <FaShieldAlt />,
    description:
      "We employ enterprise-grade security protocols to protect your intellectual property and project data at all times.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    activeColor: "bg-brandpink",
    textColor: "text-brandpink",
    cardTextColor: "text-white",
  },
  {
    id: "custom",
    title: "CUSTOM WORKFLOWS",
    icon: <FaRulerCombined />,
    description:
      "We adapt our drafting standards and processes to match your firm's specific requirements and templates.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
    activeColor: "bg-brandyellow",
    textColor: "text-brandyellow",
    cardTextColor: "text-black",
  },
  {
    id: "experts",
    title: "INDUSTRY EXPERTS",
    icon: <FaUsers />,
    description:
      "Our drafters are not just CAD operators; they are engineering professionals with deep domain knowledge.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
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
  const ITEM_HEIGHT = 80;

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
      className="w-full h-screen bg-white relative overflow-hidden flex items-center z-10"
    >
      <CircleCursor isActive={true} />
      <ConnectiveTech />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 xl:px-8 flex h-full items-center gap-8">
        {/* Left Side - Scrolling Tabs */}
        <div
          ref={leftContainerRef}
          className="hidden xl:flex w-1/2 h-[80vh] relative flex-col overflow-hidden"
        >
          <div className="relative w-full">
            <div
              className="absolute left-0 w-full transition-transform duration-500 ease-out flex flex-col items-start top-0"
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
                        group flex items-center gap-6 px-8 py-4 rounded-full transition-all duration-300 w-fit text-left
                        ${
                          index === activeIndex
                            ? `${item.activeColor} shadow-xl scale-110 translate-x-4 z-10`
                            : "bg-transparent border border-black/10 text-black/60 scale-95 hover:bg-black/5"
                        }
                    `}
                  >
                    <span
                      className={`text-2xl ${index === activeIndex ? "text-white" : "text-current"}`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`font-coolvetica font-bold tracking-wide uppercase text-xl ${index === activeIndex ? "text-white" : "text-current"}`}
                    >
                      {item.title}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Creative 3D Slider */}
        <div className="w-full xl:w-1/2 h-[80vh] flex items-center justify-center relative">
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
                  <div className="relative flex-1 rounded-[2.5rem] overflow-hidden mb-6 bg-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-3 shadow-lg">
                      <span className={`${item.textColor} text-lg`}>
                        {item.icon}
                      </span>{" "}
                      {item.title}
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
