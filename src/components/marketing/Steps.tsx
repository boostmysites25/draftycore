import SmoothScroll from "../common/SmoothScroll";
import { CircleCursor } from "../ui/Cursors";

const steps = [
  {
    id: "01",
    title: "DISCOVER AND DEFINE",
    description:
      "We begin with deep listening understanding your vision, goals, and audience to build a solid foundation.",
    color: "bg-brandyellow", // Yellow
    textColor: "text-black",
    rotation: "-rotate-3",
  },
  {
    id: "02",
    title: "PLAN AND STRATEGIZE",
    description:
      "Our team maps out the user journey and technical architecture to ensure seamless execution.",
    color: "bg-brandorange", // Orange
    textColor: "text-black",
    rotation: "rotate-2",
  },
  {
    id: "03",
    title: "DESIGN AND DEVELOP",
    description:
      "We bring ideas to life with stunning visuals and robust code, focusing on performance and scalability.",
    color: "bg-brandpink", // Pink
    textColor: "text-white",
    rotation: "-rotate-2",
  },
  {
    id: "04",
    title: "DELIVER AND SUPPORT",
    description:
      "After rigorous testing, we launch your product and provide ongoing support to ensure long-term success.",
    color: "bg-brandturquoise", // Turquoise/Blue
    textColor: "text-black",
    rotation: "rotate-3",
  },
];

const Steps = () => {
  return (
    <SmoothScroll>
      <div className="relative w-full bg-white">
        <CircleCursor isActive={true} />

        <div className="grid grid-cols-1 xl:grid-cols-[60%,1fr] w-full">
          {/* Left Side - Sticky Content */}
          <div className="w-full h-[50vh] xl:h-screen sticky top-0 flex flex-col justify-between p-8 xl:p-16 border-r border-gray-100 bg-white z-10">
            <div className="pt-8">
              <h2 className="text-8xl xl:text-[10rem] font-maus font-black leading-none tracking-tighter uppercase mb-8 relative z-20">
                STEP
              </h2>
            </div>

            <div className="w-full h-full flex-1 absolute right-0 top-8 z-10">
              <video
                src="/images/marketing/step-video.mp4"
                className="w-full h-full aspect-square object-contain 2xl:object-cover 2xl:translate-x-1/3"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Right Side - Scrolling Cards */}
          <div className="w-full relative px-8 xl:px-16 py-12 xl:py-24 z-20">
            <div className="flex flex-col gap-24 xl:gap-32 items-center xl:items-end">
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
                    <div className="flex justify-between gap-4">
                      <span className="inline-block px-4 py-1.5 rounded-full border-2 border-current text-sm font-bold tracking-wider mb-12 uppercase h-fit">
                        STEP
                      </span>

                      <h3 className="text-[8rem] xl:text-[12rem] font-maus font-black leading-none tracking-tighter mb-4 xl:-ml-2">
                        {step.id}
                      </h3>
                    </div>

                    <h4 className="text-3xl xl:text-5xl font-coolvetica font-bold uppercase mb-8 leading-tight max-w-sm">
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
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Steps;
