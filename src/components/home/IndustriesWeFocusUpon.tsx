import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CyberCircuit from "../ui/CyberCircuit";
import { FeaturedCursor } from "../ui/Cursors";
import img1 from '../../assets/images/Artboard_1.png'
import img2 from '../../assets/images/Artboard_2.png'
import img3 from '../../assets/images/Artboard_3.png'
import img4 from '../../assets/images/Artboard_4.png'

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
    id: string;
    title: string;
    image: string;
    color: string;
    shape: string;
}

// const SHAPES = {
//     circle: "circle(50% at 50% 50%)",
//     octagon: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
//     hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
//     starburst: "polygon(50% 0%, 61% 10%, 75% 6%, 80% 20%, 93% 25%, 89% 39%, 98% 50%, 89% 61%, 93% 75%, 80% 80%, 75% 94%, 61% 90%, 50% 100%, 39% 90%, 25% 94%, 20% 80%, 7% 75%, 11% 61%, 2% 50%, 11% 39%, 7% 25%, 20% 20%, 25% 6%, 39% 10%)"
// };

const services: ServiceItem[] = [
    {
        id: "04",
        title: "Architecture",
        image: img4,
        color: "#B8F135",
        shape: "octagon"
    },
    {
        id: "03",
        title: "Structural Engineering",
        image: img3,
        color: "#FF2D95",
        shape: "starburst"
    },
    {
        id: "01",
        title: "Civil Engineering",
        image: img1,
        color: "#FF7A00",
        shape: "starburst"
    },
    {
        id: "02",
        title: "Shop Detailing",
        image: img2,
        color: "#FFC300",
        shape: "octagon"
    },
];

const IndustriesWeFocusUpon = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
    const contentRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Horizontal Scroll with Rolling Physics (Now only for 2xl and up)
            mm.add("(min-width: 1536px)", () => {
                const track = trackRef.current;

                // FeaturedWork is pinned for 300% (approx). 
                // We overlap because pinSpacing=false.
                // So we need to WAIT for that 300% before we start moving.
                const waitDuration = 100; // Relative units for timeline
                const scrollDuration = 100; // Relative units for timeline

                // Total distance: We need to pin for (Wait + Scroll)
                // However, the "Wait" part is effectively covering the FeaturedWork pin duration.
                // Let's assume FeaturedWork takes ~300vh.
                const totalScroll = "400%";

                if (track) {
                    // const sections = services.length + 1; // Unused

                    // Main Timeline
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: "+=" + totalScroll,
                            pin: true,
                            scrub: 0.5,
                        }
                    });

                    // 1. WAIT PHASE (Synced with FeaturedWork)
                    // We hold everything static for the first half of the scroll
                    tl.to({}, { duration: waitDuration });

                    // 2. MOVE PHASE (Horizontal Scroll)
                    tl.addLabel("move");

                    tl.to(track, {
                        x: () => -(track.scrollWidth - window.innerWidth),
                        ease: "none",
                        duration: scrollDuration
                    }, "move");

                    // 3. ROLLING ANIMATION (Synced with Move Phase)
                    circlesRef.current.forEach((circle) => {
                        if (circle) {
                            tl.to(circle, {
                                rotation: 360 * 2,
                                ease: "none",
                                duration: scrollDuration
                            }, "move");
                        }
                    });

                    // Counter-Rotation (Synced with Move Phase)
                    contentRef.current.forEach((content) => {
                        if (content) {
                            tl.to(content, {
                                rotation: -360 * 2,
                                ease: "none",
                                duration: scrollDuration
                            }, "move");
                        }
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !circlesRef.current.includes(el)) {
            circlesRef.current[index] = el;
        }
    };

    const addToContentRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !contentRef.current.includes(el)) {
            contentRef.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="bg-[#f1f1f1] relative overflow-hidden 2xl:h-screen flex flex-col 2xl:flex-row items-center py-20 2xl:py-0 max-w-[100vw] overflow-x-hidden">
            <FeaturedCursor isActive={true} />

            {/* Background */}
            <CyberCircuit className="z-0 opacity-10 absolute inset-0 pointer-events-none" color="#000000" />

            <div ref={trackRef} className="flex flex-col 2xl:flex-row w-full 2xl:h-full items-center gap-20 2xl:gap-0 2xl:w-[max-content] z-10 pl-5 2xl:pl-0">

                {/* Header Section (Intro) - Now just a lead-in */}
                <div className="w-full 2xl:w-[40vw] shrink-0 flex flex-col justify-center gap-8 px-10 2xl:pl-24 2xl:pr-10 text-center 2xl:text-left">
                    <h2 className="text-5xl 2xl:text-8xl font-bold font-maus text-secondary uppercase tracking-tighter leading-none">
                        Industries <br /> We Focus Upon
                    </h2>
                    <div className="flex items-center gap-4 text-secondary justify-center 2xl:justify-start font-coolvetica">
                        <span className="text-lg">Scroll To Explore</span>
                        <span className="animate-bounce">→</span>
                    </div>
                </div>

                {/* Circular Cards - Larger and tighter */}
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className="relative shrink-0 w-full 2xl:w-[80vh] flex items-center justify-center px-2 2xl:px-0"
                    >
                        {/* ROTATING CONTAINER */}
                        <div
                            ref={(el) => addToRefs(el, index)}
                            className="w-[85vw] h-[85vw] 2xl:w-[70vh] 2xl:h-[70vh] relative flex items-center justify-center overflow-hidden group"
                        // style={{
                        //     clipPath: SHAPES[service.shape as keyof typeof SHAPES],
                        //     filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.15))"
                        // }}
                        >
                            {/* Background Image (Rotates with container) */}
                            <div className="absolute inset-0">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-contain opacity-100 transition-transform duration-700 brightness-75"
                                />
                                {/* <div className="absolute inset-0 bg-black/30"></div> */}
                            </div>

                            {/* Inner Content (Counter-Rotated) */}
                            <div
                                ref={(el) => addToContentRefs(el, index)}
                                className="relative z-10 text-center text-white p-10 flex flex-col items-center justify-center h-full w-full"
                            >
                                <div className="content-rotator flex flex-col items-center">
                                    <h3 className="text-4xl 2xl:text-[3.5rem] font-bold font-maus uppercase tracking-tighter leading-none mb-2 drop-shadow-lg md:max-w-[20rem] mx-auto">{service.title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default IndustriesWeFocusUpon;
