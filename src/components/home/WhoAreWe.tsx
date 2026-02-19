import { useEffect, useRef, useState } from 'react';
import { CircleCursor } from '../ui/Cursors';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

const JellyLetter = ({ char }: { char: string }) => {
    const letterRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        if (!letterRef.current) return;
        gsap.to(letterRef.current, {
            scaleY: 1.4,
            scaleX: 0.7,
            y: -15,
            color: "#ffffff",
            duration: 0.1,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
                gsap.to(letterRef.current, {
                    scaleY: 1,
                    scaleX: 1,
                    y: 0,
                    color: "inherit",
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


const WhoAreWe = () => {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const decoration1Ref = useRef<HTMLDivElement>(null);
    const decoration2Ref = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleCardHover = () => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
            scale: 4,
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleCardLeave = () => {
        if (!cursorRef.current) return;
        gsap.to(cursorRef.current, {
            scale: 1,
            backgroundColor: "transparent",
            border: "1px solid rgba(0,0,0,0.5)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const cards = [
        {
            header: "Your studio’s secret tool",
            description: "The behind-the-scenes boost for your office. A quiet, capable drafting partner for design-led studios. We are the quiet force behind your bold ideas.",
            bgClass: "bg-brandlimegreen text-black",
            borderClass: "border-white/10"
        },
        {
            header: "The Smooth Operator",
            description: "Our custom designed platform brings projects, finance, chat, and screenshare meetings into one clean workflow, with AI quietly doing the heavy lifting.",
            bgClass: "bg-brandturquoise text-black",
            borderClass: "border-black/10"
        },
        {
            header: "Start Small, Grow Big",
            description: "From light support to dedicated capacity, our plans let you commit comfortably and expand when you’re ready.",
            bgClass: "bg-brandpink text-black",
            borderClass: "border-black/10"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !bgRef.current) return;

            const isMobile = window.innerWidth < 768;

            // --- STICKY STACKING LOGIC ---
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const isLast = index === cards.length - 1;

                // Text Reveal Logic
                const words = card.querySelectorAll('.word');

                const cardDef = cards[index];
                const isDarkCard = cardDef.bgClass.includes('text-white');

                const activeColor = isDarkCard ? "#ffffff" : "#000000";
                const dimColor = isDarkCard ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

                gsap.set(words, {
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    webkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundImage: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} 100%), linear-gradient(to right, ${dimColor} 0%, ${dimColor} 100%)`,
                    backgroundSize: "0% 100%, 100% 100%",
                    scale: 0.9,
                    y: 10,
                    opacity: 1,
                    transformOrigin: "top center"
                });

                const revealTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "center center",
                        scrub: 1,
                    }
                });

                revealTl.to(words, {
                    backgroundSize: "100% 100%, 100% 100%",
                    scale: 1,
                    y: 0,
                    stagger: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });


                if (!isLast) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top+=140",
                        end: "bottom top+=40",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                        animation: gsap.to(card, {
                            scale: 0.7,
                            opacity: 0,
                            ease: "none"
                        })
                    });
                }
            });


            // --- BACKGROUND REVEAL ---
            const centerPos = isMobile ? "50% 50%" : "25% 20%";
            gsap.set(bgRef.current, { clipPath: `circle(0% at ${centerPos})` });

            gsap.to(bgRef.current, {
                clipPath: `circle(150% at ${centerPos})`,
                ease: "power2.inOut",
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "center center",
                    scrub: 0.5,
                }
            });

            // --- MOUSE PARALLAX ---
            if (!isMobile) {
                const xTo1 = gsap.quickTo(decoration1Ref.current, "x", { duration: 0.8, ease: "power3" });
                const yTo1 = gsap.quickTo(decoration1Ref.current, "y", { duration: 0.8, ease: "power3" });
                const xTo2 = gsap.quickTo(decoration2Ref.current, "x", { duration: 1.2, ease: "power3" });
                const yTo2 = gsap.quickTo(decoration2Ref.current, "y", { duration: 1.2, ease: "power3" });

                const onMouseMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    const xPos = (clientX / innerWidth - 0.5) * 150;
                    const yPos = (clientY / innerHeight - 0.5) * 150;

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

    const renderTitle = (text: string) => (
        <div className="flex justify-center">
            {text.split("").map((char, i) => (
                <JellyLetter key={i} char={char} />
            ))}
        </div>
    );

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex items-stretch py-24 relative bg-[#FAFAFA] cursor-none border-t-2 border-brandyellow"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Background Container for Overflow Management */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Background Layer (Yellow Reveal) */}
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-brandyellow"
                >
                </div>

                {/* Decoration 1 */}
                {/* <div ref={decoration1Ref} className="absolute top-10 left-1/3 opacity-20 hidden lg:block">
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_20s_linear_infinite]">
                        <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
                        <circle cx="100" cy="100" r="40" stroke="black" strokeWidth="1" />
                        <line x1="100" y1="10" x2="100" y2="190" stroke="black" strokeWidth="1" />
                        <line x1="10" y1="100" x2="190" y2="100" stroke="black" strokeWidth="1" />
                    </svg>
                </div> */}

                {/* Decoration 2 */}
                <div ref={decoration2Ref} className="absolute bottom-10 left-5 block animate-bounce">
                    <svg width="288" height="288" viewBox="0 0 288 288" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 h-56 opacity-30">
                        {/* Outer rotating square */}
                        <rect x="24" y="24" width="240" height="240" stroke="black" strokeWidth="2" fill="none" className="origin-center" />

                        {/* Middle rotating square (opposite direction) */}
                        <rect x="64" y="64" width="160" height="160" stroke="black" strokeWidth="2" fill="none" className="origin-center animate-[spin_15s_linear_infinite_reverse]" />

                        {/* Inner pulsing square */}
                        <rect x="104" y="104" width="80" height="80" stroke="black" strokeWidth="2" fill="rgba(0,0,0,0.1)" className="origin-center animate-[pulse_3s_ease-in-out_infinite]" />

                        {/* Corner accent squares */}
                        {/* <rect x="24" y="24" width="40" height="40" fill="black" className="animate-[pulse_2s_ease-in-out_infinite]" />
                        <rect x="224" y="24" width="40" height="40" fill="black" className="animate-[pulse_2s_ease-in-out_infinite_0.5s]" style={{ animationDelay: '0.5s' }} />
                        <rect x="24" y="224" width="40" height="40" fill="black" className="animate-[pulse_2s_ease-in-out_infinite_1s]" style={{ animationDelay: '1s' }} />
                        <rect x="224" y="224" width="40" height="40" fill="black" className="animate-[pulse_2s_ease-in-out_infinite_1.5s]" style={{ animationDelay: '1.5s' }} /> */}

                        {/* Diagonal lines */}
                        <line x1="24" y1="24" x2="264" y2="264" stroke="black" strokeWidth="1" strokeDasharray="5 5" className="animate-[pulse_4s_ease-in-out_infinite]" />
                        <line x1="264" y1="24" x2="24" y2="264" stroke="black" strokeWidth="1" strokeDasharray="5 5" className="animate-[pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
                    </svg>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full z-0"></div>
            </div>

            {/* Custom Cursor */}
            <CircleCursor ref={cursorRef} isActive={isHovering} />

            <div className="flex flex-col md:flex-row wrapper gap-6 md:gap-12 w-full relative z-10">

                <div className="absolute top-0 h-screen left-1/3 w-full">
                    {/* Decoration 1 */}
                    <div ref={decoration1Ref} className="sticky top-20 opacity-20 block z-0">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_20s_linear_infinite]">
                            <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
                            <circle cx="100" cy="100" r="40" stroke="black" strokeWidth="1" />
                            <line x1="100" y1="10" x2="100" y2="190" stroke="black" strokeWidth="1" />
                            <line x1="10" y1="100" x2="190" y2="100" stroke="black" strokeWidth="1" />
                        </svg>
                    </div>
                </div>

                {/* Left Column: Title (Sticky) */}
                <div className="md:w-1/3 flex flex-col items-center mx-auto relative z-20">
                    <div className="sticky top-32">

                        <div className="mb-4 text-lg tracking-widest font-coolvetica font-bold text-black/40 hidden md:block">
                            // SECTION 01: IDENTITY
                        </div>
                        <h2 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-maus font-bold text-secondary uppercase tracking-tighter leading-none text-center cursor-pointer select-none">
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

                {/* Right Column: Card Stack */}
                <div className="md:w-2/3 pl-0 md:pl-12 flex flex-col gap-24 md:gap-6 pb-24">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            onMouseEnter={handleCardHover}
                            onMouseLeave={handleCardLeave}
                            className={`
                                relative p-8 md:p-12 rounded-3xl shadow-2xl 
                                ${card.bgClass} 
                                border ${card.borderClass}
                                flex flex-col justify-center min-h-[50vh]
                                cursor-none
                            `}
                        >
                            <span className="text-lg font-coolvetica opacity-50 mb-6 block">0{index + 1}</span>
                            <h3 className="text-4xl md:text-[3.75rem] font-maus font-black uppercase tracking-tighter mb-4 leading-none bg-white rounded-xl w-fit p-2">
                                {card.header.split(" ").map((word, wIndex) => (
                                    <span key={`h-${wIndex}`} className="word inline-block mr-2">
                                        {word}
                                    </span>
                                ))}
                            </h3>
                            <p className="text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight font-coolvetica">
                                {card.description.split(" ").map((word, wIndex) => (
                                    <span key={`d-${wIndex}`} className="word inline-block mr-2 leading-snug tracking-wide">
                                        {word}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoAreWe;
