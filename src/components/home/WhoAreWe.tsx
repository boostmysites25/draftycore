import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JellyLetter = ({ char }: { char: string }) => {
    const letterRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        if (!letterRef.current) return;
        gsap.to(letterRef.current, {
            scaleY: 1.4, // More exaggerated
            scaleX: 0.7,
            y: -15, // Higher jump
            color: "#ffffff",
            duration: 0.1,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
                gsap.to(letterRef.current, {
                    scaleY: 1,
                    scaleX: 1,
                    y: 0,
                    color: "inherit", // Return to inherit
                    duration: 0.8,
                    ease: "elastic.out(1.2, 0.2)"
                });
            }
        });
    };

    return (
        <span
            ref={letterRef}
            onMouseEnter={handleMouseEnter}
            className="inline-block cursor-pointer transition-colors duration-200"
        >
            {char === " " ? "\u00A0" : char}
        </span>
    );
};

const BubbleWord = ({ word }: { word: string }) => {
    const wordRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        if (!wordRef.current) return;
        gsap.to(wordRef.current, {
            scaleX: 1.3,
            scaleY: 0.8,
            color: "#000",
            duration: 0.1,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
                gsap.to(wordRef.current, {
                    scaleX: 1,
                    scaleY: 1,
                    color: "transparent", // Back to gradient clip
                    duration: 1.2,
                    ease: "elastic.out(1.2, 0.2)"
                });
            }
        });
    };

    return (
        <span
            ref={wordRef}
            onMouseEnter={handleMouseEnter}
            className="word inline-block mr-2 leading-snug cursor-pointer"
        >
            {word}
        </span>
    );
};

const WhoAreWe = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textWrapperRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const decoration1Ref = useRef<HTMLDivElement>(null);
    const decoration2Ref = useRef<HTMLDivElement>(null);

    const paragraphs = [
        "We’re your behind-the-scenes drafting engine, quietly powering your studio with precision, pace, and production muscle.",
        "We plug into your workflow seamlessly as a quiet extension of your team, helping you deliver more without stretching internal bandwidth.",
        "Our custom-built platform makes it ridiculously easy to brief, review, and deliver drawings, no email chains, no chaos. Just smooth, scalable drafting support that fits right into your workflow while using your existing tools like AutoCAD, Revit, ArchiCAD, SketchUp + Tekla."
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !textWrapperRef.current || !bgRef.current) return;

            // --- 1. POP-UP TEXT REVEAL ---
            const words = textWrapperRef.current.querySelectorAll('.word');

            // Initial State: Slightly scaled down, transparent text
            gsap.set(words, {
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                webkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient(to right, #111 0%, #111 100%), linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)",
                backgroundSize: "0% 100%, 100% 100%",
                scale: 0.9, // Start smaller for "pop" effect
                y: 10,     // Start slightly lower
                transformOrigin: "center center"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom bottom",
                    scrub: 0.5,
                },
            });

            // "Pop Up" and fill
            tl.to(words, {
                backgroundSize: "100% 100%, 100% 100%",
                scale: 1,      // Pop to full size
                y: 0,          // Move to natural position
                stagger: 1,    // Sequential
                ease: "elastic.out(1, 0.5)",
                duration: 1,
            });

            // --- 2. SPOTLIGHT BACKGROUND REVEAL ---
            const isMobile = window.innerWidth < 768;
            const centerPos = isMobile ? "50% 50%" : "25% 40%";

            gsap.set(bgRef.current, {
                clipPath: `circle(0% at ${centerPos})`
            });

            const bgTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "center center",
                    scrub: 0.5,
                },
            });

            bgTl.to(bgRef.current, {
                clipPath: `circle(150% at ${centerPos})`,
                ease: "power2.inOut",
                duration: 1
            });

            // --- 3. MOUSE PARALLAX & PHYSICS ---
            if (!isMobile) {
                const xTo1 = gsap.quickTo(decoration1Ref.current, "x", { duration: 0.8, ease: "power3" });
                const yTo1 = gsap.quickTo(decoration1Ref.current, "y", { duration: 0.8, ease: "power3" });
                const xTo2 = gsap.quickTo(decoration2Ref.current, "x", { duration: 1.2, ease: "power3" });
                const yTo2 = gsap.quickTo(decoration2Ref.current, "y", { duration: 1.2, ease: "power3" });

                const onMouseMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    const xPos = (clientX / innerWidth - 0.5) * 50;
                    const yPos = (clientY / innerHeight - 0.5) * 50;

                    xTo1(xPos);
                    yTo1(yPos);
                    xTo2(xPos * -1.5);
                    yTo2(yPos * -1.5);
                };

                window.addEventListener("mousemove", onMouseMove);
                return () => window.removeEventListener("mousemove", onMouseMove);
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to render title with JellyLetters
    const renderTitle = (text: string) => (
        <div className="flex justify-center">
            {text.split("").map((char, i) => (
                <JellyLetter key={i} char={char} />
            ))}
        </div>
    );

    return (
        <section ref={containerRef} className="min-h-screen flex items-center py-24 relative overflow-hidden bg-brandorange">
            {/* Background Layer (Yellow Reveal) */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-brandyellow z-0 pointer-events-none"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
            >
            </div>

            {/* Decorative Architectural Elements (Parallax Targets) */}
            <div ref={decoration1Ref} className="absolute top-10 left-1/3 pointer-events-none opacity-20 hidden lg:block z-0">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_20s_linear_infinite]">
                    <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
                    <circle cx="100" cy="100" r="40" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="10" x2="100" y2="190" stroke="black" strokeWidth="1" />
                    <line x1="10" y1="100" x2="190" y2="100" stroke="black" strokeWidth="1" />
                </svg>
            </div>

            <div ref={decoration2Ref} className="absolute -bottom-10 -left-10 pointer-events-none opacity-20 hidden md:block animate-bounce z-0">
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="50" width="200" height="200" stroke="black" strokeWidth="2" />
                    <line x1="50" y1="50" x2="250" y2="250" stroke="black" strokeWidth="1" />
                    <line x1="250" y1="50" x2="50" y2="250" stroke="black" strokeWidth="1" />
                    <circle cx="150" cy="150" r="20" stroke="black" strokeWidth="2" />
                </svg>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full pointer-events-none z-0"></div>

            <div className="flex flex-col md:flex-row wrapper gap-1 md:gap-12 w-full relative z-10 transition-colors duration-500">
                {/* Left Column: Title */}
                <div className="md:w-1/3 flex flex-col items-center mx-auto">
                    <div className="sticky top-32">
                        {/* Decorative marker for title */}
                        <div className="mb-4 text-xs font-mono font-bold tracking-widest text-black/40 uppercase hidden md:block">
                            // SECTION 01: IDENTITY
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-octin-college font-bold text-secondary uppercase tracking-tighter leading-none text-center cursor-pointer select-none">
                            {renderTitle("Who")}
                            <div className="flex justify-center md:hidden">Are</div>
                            <div className="hidden md:flex justify-center">
                                {renderTitle("Are")}
                            </div>
                            <div className="flex justify-center md:hidden">We</div>
                            <div className="hidden md:flex justify-center">
                                {renderTitle("We")}
                            </div>
                        </h2>
                        <div className="mt-6 flex items-center gap-4 justify-center">
                            <span className="w-16 h-1 bg-black"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Reveal Text */}
                <div className="md:w-2/3 flex items-center pl-0 md:pl-12 border-l border-black/10">
                    <div ref={textWrapperRef} className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-medium leading-tight tracking-tight space-y-10 text-start py-8">
                        {paragraphs.map((paragraph, pIndex) => (
                            <div key={pIndex} className="relative">
                                {/* Small decorative number for each paragraph */}
                                <span className="absolute -left-8 top-1 text-xs text-black/30 hidden md:block">
                                    0{pIndex + 1}
                                </span>
                                <p>
                                    {paragraph.split(" ").map((word, wIndex) => (
                                        <BubbleWord key={wIndex} word={word} />
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoAreWe;
