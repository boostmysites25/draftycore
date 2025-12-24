import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhoAreWe = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textWrapperRef = useRef<HTMLDivElement>(null);

    const paragraphs = [
        "We’re your behind-the-scenes drafting engine, quietly powering your studio with precision, pace, and production muscle.",
        "We plug into your workflow seamlessly as a quiet extension of your team, helping you deliver more without stretching internal bandwidth.",
        "Our custom-built platform makes it ridiculously easy to brief, review, and deliver drawings, no email chains, no chaos. Just smooth, scalable drafting support that fits right into your workflow while using your existing tools like AutoCAD, Revit, ArchiCAD, SketchUp + Tekla."
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !textWrapperRef.current) return;

            const words = textWrapperRef.current.querySelectorAll('.word');

            // Set initial state for background reveal
            gsap.set(words, {
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                webkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient(to right, #111 0%, #111 100%), linear-gradient(to right, #979797 0%, #979797 100%)",
                backgroundSize: "0% 100%, 100% 100%"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: () => `+=${containerRef.current!.offsetHeight * 1.2}`, // Scroll distance = 2x section height for smoother/slower feel
                    scrub: 0.5,
                },
            });

            tl.to(words, {
                backgroundSize: "100% 100%, 100% 100%",
                stagger: 1, // Strict sequential (one by one)
                ease: "none",
                duration: 1
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen bg-brandyellow flex items-center py-24 relative overflow-hidden">
           

            {/* Decorative Architectural Elements */}
            <div className="absolute top-10 left-1/3 pointer-events-none opacity-20 hidden lg:block">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_20s_linear_infinite]">
                    <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
                    <circle cx="100" cy="100" r="40" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="10" x2="100" y2="190" stroke="black" strokeWidth="1" />
                    <line x1="10" y1="100" x2="190" y2="100" stroke="black" strokeWidth="1" />
                </svg>
            </div>

            <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-20 hidden md:block animate-bounce">
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="50" width="200" height="200" stroke="black" strokeWidth="2" />
                    <line x1="50" y1="50" x2="250" y2="250" stroke="black" strokeWidth="1" />
                    <line x1="250" y1="50" x2="50" y2="250" stroke="black" strokeWidth="1" />
                    <circle cx="150" cy="150" r="20" stroke="black" strokeWidth="2" />
                </svg>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full pointer-events-none z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 rounded-full pointer-events-none z-0"></div>

            <div className="flex flex-wrap wrapper gap-1 md:gap-12 w-full relative z-10">
                {/* Left Column: Title */}
                <div className="md:w-1/3 flex flex-col justify-center mx-auto">
                    <div className="sticky top-32">
                        {/* Decorative marker for title */}
                        <div className="mb-4 text-xs font-mono font-bold tracking-widest text-black/40 uppercase hidden md:block">
                            // SECTION 01: IDENTITY
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-octin-college font-bold text-secondary uppercase tracking-tighter leading-none text-center md:text-left">
                            Who <br className='md:block hidden'/>Are <br className='md:block hidden'/>We
                        </h2>
                        <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
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
                                <span className="absolute -left-8 top-1 text-xs font-mono text-black/30 hidden md:block">
                                    0{pIndex + 1}
                                </span>
                                <p>
                                    {paragraph.split(" ").map((word, wIndex) => (
                                        <span key={wIndex} className="word inline-block mr-2 leading-snug">
                                            {word}
                                        </span>
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
