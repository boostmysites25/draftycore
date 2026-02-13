import FallingText from "../ui/FallingText"
import ConnectiveTech from "../ui/ConnectiveTech"

const WhatWeStandFor = () => {
    return (
        <div className="relative pt-24 bg-[#F5F5F0] border-t-2 border-brandlimegreen">
            <ConnectiveTech />
            <div className="wrapper relative z-10">
                <h2 className="text-5xl md:text-8xl font-black font-maus text-secondary uppercase tracking-tighter mb-4 text-center">
                    What We Stand For
                </h2>
                <p className="text-xl md:text-2xl text-neutral-500 font-medium max-w-5xl mx-auto font-coolvetica-condensed tracking-widest text-center">
                    Easy to commit to, simple to scale, and built to feel personal. With local Australian support handling communication and process. Fluent in the tools you already use, we integrate quietly into your workflow.
                    <br />
                    <br />
                    And no matter how much we grow, we make it feel like you’re our only client.
                </p>
            </div>
            <div className="relative z-10">
                <FallingText text={["Precision", "Speed", "Seamlessness", "Scalable", 'DesignLed', 'Reliable', 'Transparent', 'Committed', 'CostEffective', 'Flexible']}
                    trigger="scroll"
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    fontSize="1.25rem"
                    mouseConstraintStiffness={0.9} />
            </div>
        </div>
    )
}

export default WhatWeStandFor