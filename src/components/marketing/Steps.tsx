import SmoothScroll from "../common/SmoothScroll";
import { CircleCursor } from "../ui/Cursors";

const steps = [
  {
    id: "01",
    tag: "Scalable",
    title: "Upward, On Demand",
    description:
      "Add drafting power without adding payroll, desks, or recruitment cycles. Built to handle peaks, protect margins, and remove bottlenecks.",
    color: "bg-brandyellow", // Yellow
    textColor: "text-black",
    rotation: "-rotate-3",
  },
  {
    id: "02",
    tag: "Cost Efficient",
    title: "Budget-Friendly Brilliance",
    description:
      "High-level production support at a fraction of full in-house operational cost so you can Spend where it matters, ideas, clients and growth.",
    color: "bg-brandorange", // Orange
    textColor: "text-black",
    rotation: "rotate-2",
  },
  {
    id: "03",
    tag: "Effective",
    title: "Output That Outperforms",
    description:
      "Streamlined production that keeps projects progressing, not stalling while ensuring Smart coordination that eliminates bottlenecks before they grow.",
    color: "bg-brandpink", // Pink
    textColor: "text-white",
    rotation: "-rotate-2",
  },
];



const Steps = () => {
  return (
    <SmoothScroll>
      <div className="relative w-full bg-white">
        <CircleCursor isActive={true} />

        <div className="xl:grid flex flex-col-reverse xl:grid-cols-[1fr,60%] w-full">
          {/* Left Side - Scrolling Cards */}
          <div className="w-full relative px-8 xl:px-16 py-12 xl:py-24 z-20">
            <div className="flex flex-col gap-24 xl:gap-32 items-center xl:items-start">
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

          <div className="w-full h-[50vh] xl:h-screen sticky top-0 flex flex-col justify-center items-center p-8 xl:p-16 bg-white z-10 overflow-hidden">
            <div className="w-full h-full absolute inset-0 z-0 opacity-40">
              <video
                src="/images/marketing/step-video.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="relative z-20 pointer-events-none mix-blend-difference flex items-center justify-center h-full w-full">
              <h2 className="text-8xl xl:text-[10rem] font-maus font-black leading-none tracking-tighter uppercase text-center text-white">
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
