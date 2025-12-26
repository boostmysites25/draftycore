import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const IndustriesWeFocusUpon = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            document.querySelectorAll(".image").forEach((image, index) => {
                if (!image) return;

                // Animate borders or simple fade up
                gsap.fromTo(image,
                    { width: "50%" },
                    {
                        width: "100%",
                        duration: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: image,
                            start: "top 60%",
                            toggleActions: "play none none reverse",
                        }
                    }

                );
            });
        }, containerRef);

        return () => ctx.revert();


    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !rowsRef.current.includes(el)) {
            rowsRef.current[index] = el;
        }
    };

    return (
        <section ref={containerRef} className="py-24 bg-[#F5F5F0]">
            <div className="wrapper">
                {/* Header */}
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none font-octin-college uppercase">
                        Industries <br /> We Focus Upon
                    </h2>
                </div>

                {/* List */}
                <div className="flex flex-col gap-4">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            ref={(el) => addToRefs(el, index)}
                            className="group flex flex-col md:flex-row border-t border-black/10 py-12 md:py-16 transition-colors duration-500 px-5 -mx-5 rounded-3xl wrapper"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = service.color}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {/* Number */}
                            <div className="w-full md:w-1/4 mb-6 md:mb-0">
                                <span className="text-2xl font-octin-college text-neutral-400 font-bold group-hover:text-secondary">({service.id})</span>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/3 mb-8 md:mb-0">
                                <h3 className="text-3xl font-bold mb-6 font-octin-college uppercase tracking-wider">{service.title}</h3>
                                <ul className="flex flex-col gap-2">
                                    {service.services.map((item, i) => (
                                        <li key={i} className="text-neutral-500 font-medium text-lg leading-relaxed group-hover:text-secondary">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Image Area (Right) */}
                            <div className="w-full md:w-4/12 flex justify-end items-center">
                                <div className="relative w-full h-full aspect-video md:aspect-[16/9] overflow-hidden rounded-xl shadow-2xl image">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full aspect-video object-cover transition-all duration-700 scale-110 group-hover:scale-100 flex-1"

                                    />
                                    {/* Overlay logo/icon placeholder - mimic the white square in user image */}
                                    {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Final Border */}
                    <div className="border-t border-black/10"></div>
                </div>
            </div>
        </section>
    );
};

export default IndustriesWeFocusUpon;
