import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NextStep = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const cursorX = useRef(0);
    const cursorY = useRef(0);

    // Track active index for image swap
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const steps = [
        {
            text: "Free Consultation",
            sub: "Let's talk about your needs",
            image: "/consultation_collage.png",
        },
        {
            text: "Pilot Project",
            sub: "Test our capabilities risk-free",
            image: "/pilot_project_collage.png",
        },
        {
            text: "Full Partnership",
            sub: "Scale your drafting capacity",
            image: "/support_firm_collage.png",
        }
    ];

    useEffect(() => {
        // QuickTo for performant mouse following
        const xTo = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const bounds = sectionRef.current.getBoundingClientRect();

            // Calculate position relative to the section
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            xTo(x);
            yTo(y);

            // Store for velocity/tilt calculations if needed later
            cursorX.current = x;
            cursorY.current = y;
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener("mousemove", onMouseMove);
        }

        return () => {
            if (section) {
                section.removeEventListener("mousemove", onMouseMove);
            }
        };
    }, []);

    // Hover Animations
    const handleMouseEnter = (image: string) => {
        setActiveImage(image);
        gsap.to(followerRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(followerRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
    };

    return (
        <section
            ref={sectionRef}
            className="py-32 bg-[#f1f1f1] relative overflow-hidden cursor-none"
        >
            {/* FLOATING CURSOR FOLLOWER */}
            <div
                ref={followerRef}
                className="absolute top-0 left-0 w-80 h-80 rounded-full overflow-hidden pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 shadow-2xl scale-0 opacity-0 border-4 border-white"
            >
                {activeImage && (
                    <img
                        src={activeImage}
                        alt="Preview"
                        className="w-full h-full object-cover animate-pulse-slow"
                    />
                )}
            </div>

            <div className="wrapper relative z-10 flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-8xl font-black font-octin-college text-secondary uppercase tracking-tighter mb-4 opacity-100 transition-opacity duration-500">
                        What's Next?
                    </h2>
                </div>

                {/* Interactive Menu List */}
                <div className="flex flex-col gap-8 w-full max-w-5xl">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-12 border-b border-black/10 transition-all duration-500 hover:border-black/50"
                            onMouseEnter={() => handleMouseEnter(step.image)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Step Number */}
                            <div className="col-span-1 md:col-span-1">
                                <span className="text-xl font-bold font-mono text-neutral-300 group-hover:text-black transition-colors duration-300">
                                    0{index + 1}
                                </span>
                            </div>

                            {/* Main Text & Sub Text */}
                            <div className="col-span-1 md:col-span-11 flex flex-col justify-center">
                                <div className="relative overflow-hidden">
                                    <h3
                                        className="text-4xl md:text-8xl font-black font-octin-college uppercase tracking-tighter transition-all duration-500 z-30 relative"
                                        style={{
                                            WebkitTextStroke: "1px black",
                                            color: "transparent",
                                        }}
                                    >
                                        {/* Filled Version Overlay */}
                                        <span className="absolute top-0 left-0 w-full h-full text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-full group-hover:translate-y-0 block">
                                            {step.text}
                                        </span>
                                        {/* Outline Version */}
                                        <span className="block group-hover:translate-y-full transition-transform duration-500">
                                            {step.text}
                                        </span>
                                    </h3>
                                </div>
                                <p className="text-lg font-medium text-neutral-400 group-hover:text-black transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ease-out mt-2">
                                    {step.sub}
                                </p>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NextStep;
