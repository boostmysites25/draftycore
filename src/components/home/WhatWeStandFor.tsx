import FallingText from "../ui/FallingText";
import ConnectiveTech from "../ui/ConnectiveTech";

const WhatWeStandFor = () => {
  return (
    <div className="relative pt-24 lg:pt-12 bg-[#F5F5F0] border-t-4 border-brandlimegreen lg:h-[88vh] lg:max-h-screen lg:overflow-hidden lg:flex lg:flex-col">
      <ConnectiveTech />
      <div className="wrapper absolute inset-0 top-24 z-10 lg:flex-none">
        <h2 className="text-5xl md:text-8xl font-black font-maus text-secondary uppercase tracking-tighter mb-4 text-center">
          What We Stand For
        </h2>
        <div className="max-w-3xl mx-auto pt-10">
          <p
            className="text-lg md:text-xl text-neutral-500 font-medium font-coolvetica tracking-widest break-words text-justify hyphens-auto"
            lang="en"
          >
            Easy to commit to, simple to scale, and built to feel personal. With
            local Australian support handling communication and process. Fluent
            in the tools you already use, we integrate quietly into your
            workflow.
          </p>
          <br className="hidden lg:block" />
          <p className="text-lg md:text-xl text-neutral-900 font-bold font-coolvetica tracking-widest mb-4 lg:mb-0">
            No matter how much we grow, we make you feel you’re our only client.
          </p>
        </div>
      </div>
      <div className="relative z-10 lg:flex-1 lg:overflow-hidden">
        <FallingText
          text={[
            "Precision",
            "Speed",
            "Seamlessness",
            "Scalable",
            "DesignLed",
            "Reliable",
            "Transparent",
            "Committed",
            "CostEffective",
            "Flexible",
          ]}
          trigger="scroll"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="1.25rem"
          mouseConstraintStiffness={0.9}
          className="lg:min-h-0"
        />
      </div>
    </div>
  );
};

export default WhatWeStandFor;
