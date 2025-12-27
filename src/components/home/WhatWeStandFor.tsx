import FallingText from "../ui/FallingText"
import ConnectiveTech from "../ui/ConnectiveTech"

const WhatWeStandFor = () => {
    return (
        <div className="relative pb-5 pt-24 bg-[#F5F5F0]">
            <ConnectiveTech />
            <div className="wrapper relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold font-octin-college text-secondary uppercase tracking-tighter mb-6">
                    What We Stand For
                </h2>
            </div>
            <div className="relative z-10">
                <FallingText text={["Precision", "Speed", "Seamlessness", "Scalable", 'DesignLed', 'Reliable', 'Transparent', 'Committed', 'CostEffective', 'Flexible']}
                    trigger="hover"
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