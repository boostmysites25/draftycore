import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NextStep = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

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

        // Background Spotlight
        const bgXTo = gsap.quickTo(bgRef.current, "x", { duration: 1, ease: "power2" });
        const bgYTo = gsap.quickTo(bgRef.current, "y", { duration: 1, ease: "power2" });

        const onMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const bounds = sectionRef.current.getBoundingClientRect();

            // Calculate position relative to the section
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            xTo(x);
            yTo(y);
            bgXTo(x);
            bgYTo(y);
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener("mousemove", onMouseMove);
        }

        // ENTRANCE ANIMATIONS
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });

            // Header Fade In
            tl.from(".ns-header", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" });

            // Lines Expansion
            tl.from(".ns-border", { scaleX: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, "-=0.5");

            // Items Slide Up
            tl.from(".ns-item-content", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=1");

        }, sectionRef);

        return () => {
            if (section) {
                section.removeEventListener("mousemove", onMouseMove);
            }
            ctx.revert();
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
            {/* AMBIENT SPOTLIGHT */}
            <div
                ref={bgRef}
                className="absolute top-0 left-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
            />

            {/* FLOATING CURSOR FOLLOWER */}
            <div
                ref={followerRef}
                className="absolute top-0 left-0 w-96 h-96 rounded-full overflow-hidden pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 shadow-2xl scale-0 opacity-0 border border-white/20 backdrop-blur-sm bg-white/5"
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
                <div className="text-center mb-24 ns-header">
                    <h2 className="text-5xl md:text-8xl font-black font-maus text-secondary uppercase tracking-tighter mb-4 opacity-100 transition-opacity duration-500">
                        What's Next?
                    </h2>
                </div>

                {/* Interactive Menu List */}
                <div className="flex flex-col w-full max-w-6xl">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-12 transition-all duration-500 hover:bg-black/5 px-4 md:px-10 rounded-xl"
                            onMouseEnter={() => handleMouseEnter(step.image)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Animated Border */}
                            <div className="ns-border absolute bottom-0 left-0 w-full h-[1px] bg-black/10 origin-left" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                            {/* Step Number */}
                            <div className="col-span-1 md:col-span-1 ns-item-content">
                                <span className="text-xl font-bold font-coolvetica-condensed text-neutral-300 group-hover:text-black transition-colors duration-300">
                                    0{index + 1}
                                </span>
                            </div>

                            {/* Main Text & Sub Text */}
                            <div className="col-span-1 md:col-span-11 flex flex-col justify-center ns-item-content">
                                <div className="relative overflow-hidden w-fit">
                                    <h3
                                        className="text-4xl md:text-[7rem] font-black font-maus uppercase tracking-tighter transition-all duration-500 z-30 relative leading-[0.9]"
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
                                <p className="text-lg font-medium text-neutral-400 group-hover:text-black transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ease-out mt-4 pl-1 font-coolvetica-condensed">
                                    {step.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Final Border */}
                    <div className="ns-border w-full h-[1px] bg-black/10 origin-left" />
                </div>
            </div>
        </section>
    );
};

export default NextStep;
