import FallingText from "../ui/FallingText"
import ConnectiveTech from "../ui/ConnectiveTech"

const WhatWeStandFor = () => {
    return (
        <div className="relative pt-24 lg:pt-12 bg-[#F5F5F0] border-t-2 border-brandlimegreen lg:h-screen lg:max-h-screen lg:overflow-hidden lg:flex lg:flex-col">
            <ConnectiveTech />
            <div className="wrapper relative z-10 lg:flex-none">
                <h2 className="text-5xl md:text-8xl font-black font-maus text-secondary uppercase tracking-tighter mb-4 text-center">
                    What We Stand For
                </h2>
                <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-6xl mx-auto font-coolvetica tracking-widest text-center">
                    Easy to commit to, simple to scale, and built to feel personal. With local Australian support handling communication and process. Fluent in the tools you already use, we integrate quietly into your workflow.
                </p>
                <br className="hidden lg:block" />
                <p className="text-lg md:text-xl text-neutral-900 font-bold max-w-5xl mx-auto font-coolvetica tracking-widest text-center mb-4 lg:mb-0">
                    And no matter how much we grow, we make it feel like you’re our only client.
                </p>
            </div>
            <div className="relative z-10 lg:flex-1 lg:overflow-hidden">
                <FallingText text={["Precision", "Speed", "Seamlessness", "Scalable", 'DesignLed', 'Reliable', 'Transparent', 'Committed', 'CostEffective', 'Flexible']}
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
    )
}

export default WhatWeStandFor