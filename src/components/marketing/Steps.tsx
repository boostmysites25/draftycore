import SmoothScroll from "../common/SmoothScroll";
import { CircleCursor } from "../ui/Cursors";
import { FallingShapes } from "../ui/FallingShapes";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: "01",
    tag: "Scalable",
    title: "GROW WHEN WORK GROWS",
    description:
      "Add drafting power the moment projects demand it. No hiring cycles. No extra desks. Just capacity when you need it.",
    color: "bg-brandpink brightness-95",
    textColor: "text-white",
    rotation: "-rotate-3",
  },
  {
    id: "02",
    tag: "Cost Efficient",
    title: "SPEND WHERE IT MATTERS",
    description:
      "High-quality production without the weight of in-house overhead, so your resources stay focused on design, clients, and growth.",
    color: "bg-brandorange",
    textColor: "text-white",
    rotation: "rotate-2",
  },
  {
    id: "03",
    tag: "Effective",
    title: "WORK THAT KEEPS MOVING",
    description:
      "Structured drafting that turns markups into momentum, keeping projects flowing and bottlenecks out of the way.",
    color: "bg-[#379BD6]",
    textColor: "text-white",
    rotation: "-rotate-2",
  },
];



const Steps = () => {
  const [triggerDropIn, setTriggerDropIn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerDropIn(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);



  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative w-full bg-white border-b-4 border-brandyellow">
        <CircleCursor isActive={true} />
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
                  linear-gradient(to right, #EAB308 1px, transparent 1px),
                  linear-gradient(to bottom, #EAB308 1px, transparent 1px)
                `,
            backgroundSize: '4rem 4rem'
          }}
        />

        <div className="xl:grid flex flex-col-reverse xl:grid-cols-[1fr,60%] w-full">
          {/* Left Side - Scrolling Cards */}
          <div className="w-full relative px-8 xl:px-16 py-12 xl:py-24 z-20">
            <div className="flex flex-col gap-24 xl:gap-32 items-center xl:items-start relative z-10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`sticky max-w-lg top-12 xl:top-24 min-h-[60vh] xl:min-h-[80vh] flex flex-col justify-center p-8 xl:p-16 ${step.color} shadow-2xl origin-center transition-transform duration-500 ease-out ${step.rotation}`}
                  style={{
                    zIndex: index + 1,
                  }}
                >
                  <div
                    className={`relative max-w-lg ${step.textColor} mx-auto`}
                  >
                    <div className="flex flex-col justify-between gap-4">
                      <span className="inline-block w-fit px-4 py-1.5 rounded-full border-2 border-current text-sm font-bold tracking-wider mb-12 uppercase h-fit">
                        {step.tag}
                      </span>

                      <h3 className="text-[6rem] xl:text-[10rem] font-maus font-black leading-none tracking-tighter mb-4 xl:-ml-2">
                        {step.id}
                      </h3>
                    </div>

                    <h4 className="text-3xl xl:text-4xl font-coolvetica font-bold uppercase mb-8 leading-tight max-w-md">
                      {step.title}
                    </h4>

                    <p className="text-base xl:text-lg font-medium leading-relaxed opacity-90 max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-screen xl:h-screen sticky top-0 flex flex-col justify-center items-center p-8 xl:p-16 z-10 overflow-hidden">
            <div className="w-full h-full absolute inset-0 z-0">
              <FallingShapes triggerDropIn={triggerDropIn} />
            </div>

            <div className="relative z-20 pointer-events-none mix-blend-difference flex justify-center h-full w-full">
              <h2 className="text-5xl xl:text-7xl font-maus font-black leading-none tracking-tighter uppercase text-center text-black">
                BUILT TO BE
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Steps;
