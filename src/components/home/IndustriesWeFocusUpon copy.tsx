import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CyberCircuit from "../ui/CyberCircuit";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
    id: string;
    title: string;
    services: string[];
    image: string;
    color: string;
}

const services: ServiceItem[] = [
    {
        id: "01",
        title: "Branding",
        services: ["Creative Direction", "Brand Identity", "Branding Strategy", "Graphic Design", "Startup"],
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
        color: "#FF7A00"
    },
    {
        id: "02",
        title: "UI-UX Design",
        services: ["Website Design", "App Design", "Wireframing", "Prototyping", "User Research"],
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2700&auto=format&fit=crop",
        color: "#FFC300"
    },
    {
        id: "03",
        title: "Development",
        services: ["Frontend Dev", "Backend Dev", "Full Stack", "CMS Integration", "E-commerce"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2700&auto=format&fit=crop",
        color: "#FF2D95"
    },
    {
        id: "04",
        title: "Digital Marketing",
        services: ["SEO Optimization", "Social Media", "Content Strategy", "Email Marketing", "Analytics"],
        image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2700&auto=format&fit=crop",
        color: "#B8F135"
    }
];

const IndustriesWeFocusUpon1 = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Horizontal Scroll
            mm.add("(min-width: 768px)", () => {
                const scrollDistance = "300%"; // Duration match for FeaturedWork
                const horizontalScrollLength = "500%"; // Duration for Horizontal (Header + 4 services)

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=" + (parseInt(scrollDistance) + parseInt(horizontalScrollLength)) + "%",
                        pin: true,
                        scrub: 1,
                        // pinSpacing: true // Default
                    }
                });

                // 1. WAIT PHASE (While FeaturedWork Curtain opens)
                // We just hold for the duration of the previous section's effect (300vh)
                tl.to({}, { duration: 3 });

                // 2. HORIZONTAL SCROLL PHASE
                if (trackRef.current) {
                    const sections = 5; // Header + 4 services
                    // We want to move (sections - 1) * 100vw
                    tl.to(trackRef.current, {
                        xPercent: -100 * (sections - 1) / sections, // Move to show the last item
                        ease: "none",
                        duration: 5 // Relative to Wait phase
                    });
                }
            });

            // MOBILE: Simple Vertical Stagger (Existing logic simplified)
            mm.add("(max-width: 767px)", () => {
                document.querySelectorAll(".image").forEach((_image) => {
                    // ... keep existing simple fade if needed or just let it scroll
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !rowsRef.current.includes(el)) {
            rowsRef.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="py-24 md:py-0 md:h-screen bg-[#f1f1f1] relative overflow-hidden flex items-center z-10">
            {/* Futuristic Background */}
            <CyberCircuit className="z-0 opacity-20" color="#000000" />

            <div className="relative z-10 w-full h-full md:flex md:items-center">
                {/* Mobile Header (Hidden on Desktop interaction or part of first slide?) 
                     Lets make the Header part of the first slide or stick it.
                     For horizontal scroll usually "Header" is first item or overlays.
                     Let's put Header absolute or part of the flow.
                 */}

                {/* TRACK */}
                <div ref={trackRef} className="flex flex-col md:flex-row w-full md:w-[500vw] h-full">
                    {/* SLIDE 1: HEADER */}
                    <div className="w-full md:w-screen h-full flex justify-center items-center shrink-0 p-10 border-b md:border-b-0 md:border-r border-black/10">
                        <h2 className="text-5xl md:text-8xl font-bold font-maus text-secondary uppercase tracking-tighter leading-none">
                            Industries <br /> We Focus Upon
                        </h2>
                    </div>

                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            ref={(el) => addToRefs(el, index)}
                            className="group flex flex-col md:flex-row border-b md:border-b-0 md:border-r border-black/10 py-12 md:py-0 px-5 md:px-20 w-full md:w-screen h-full justify-center items-center transition-colors duration-500 relative shrink-0"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = service.color}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {/* Desktop: Absolute Header for the first item? Or just repeat/hide? 
                                Let's keep the design simple: Content Left, Image Right. 
                            */}

                            <div className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
                                {/* Number */}
                                <div className="w-full md:w-auto mb-6 md:mb-0">
                                    <span className="text-2xl md:text-9xl font-maus text-neutral-400 font-bold group-hover:text-secondary opacity-30">({service.id})</span>
                                </div>

                                {/* Content */}
                                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                                    <h3 className="text-4xl md:text-7xl font-bold font-maus uppercase tracking-tighter leading-none mb-2 drop-shadow-lg">{service.title}</h3>
                                    <span className="text-xl font-coolvetica-condensed font-medium opacity-80 uppercase tracking-widest">{service.services[0]} & More</span>
                                </div>

                                {/* Image Area (Right) */}
                                <div className="w-full md:flex-1 flex justify-end items-center h-[50vh]">
                                    <div className="relative w-full h-full aspect-video md:aspect-auto overflow-hidden rounded-xl shadow-2xl image">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IndustriesWeFocusUpon1
