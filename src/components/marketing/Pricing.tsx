import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hourlyRates = [
    { title: "Basic CAD Drafting", rate: "$40 - $50" },
    { title: "3D Modeling & Rendering", rate: "$50 - $70" },
    { title: "BIM Modeling & Structural Drafting", rate: "$60 - $90" }
];

const retainerPackages = [
    { title: "Starter (40 hrs)", subtitle: "($40 - $50/hr)", rate: "$1,600 - $2,000" },
    { title: "Standard (80 hrs)", subtitle: "($37 - $47/hr)", rate: "$3,000 - $3,800" },
    { title: "Premium (160+ hrs)", subtitle: "($34 - $45/hr)", rate: "$5,500 - $7,200" }
];

const Pricing = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const characterRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
            });

            // Character animate from bottom left
            if (characterRef.current) {
                tl.from(characterRef.current, {
                    x: -150,
                    y: 100,
                    rotation: -15,
                    opacity: 0,
                    duration: 1.2,
                    ease: "back.out(1.5)",
                }, 0);
            }

            // Title animate down
            if (titleRef.current) {
                tl.from(titleRef.current, {
                    y: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                }, 0.2);
            }

            // Cards animate up with stagger
            tl.from([card1Ref.current, card2Ref.current], {
                y: 100,
                opacity: 0,
                stagger: 0.3,
                duration: 1,
                ease: "power4.out",
            }, 0.4);

            // Continuous subtle floating for character
            if (characterRef.current) {
                gsap.to(characterRef.current, {
                    y: "-=15",
                    rotation: "+=2",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Card Hover animations
    const handleCardHover = (cardRef: React.RefObject<HTMLDivElement>) => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1.05,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.5)",
                y: -15,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    const handleCardLeave = (cardRef: React.RefObject<HTMLDivElement>) => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1,
                boxShadow: "none",
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 overflow-hidden border-t-4 border-brandlimegreen"
        >
            {/* Decorative blurred blobs for background ambiance */}
            {/* <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-brandturquoise/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] bg-brandpink/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-brandyellow/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" /> */}

            {/* Title */}
            <div className="flex flex-col items-center justify-center mb-16 z-10">
                <h2
                    ref={titleRef}
                    className="text-4xl md:text-5xl lg:text-[5rem] font-maus tracking-wider text-center"
                >
                    <span className="bg-gradient-to-br from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent">PRICING</span> & <span className="bg-gradient-to-r from-brandpink to-brandorange bg-clip-text text-transparent">ENGAGEMENT</span> MODELS
                </h2>
            </div>

            {/* Cards Container */}
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-stretch z-10 px-4">

                {/* Hourly Rate Model Card */}
                <div
                    ref={card1Ref}
                    onMouseEnter={() => handleCardHover(card1Ref)}
                    onMouseLeave={() => handleCardLeave(card1Ref)}
                    className="relative w-full lg:w-1/2 rounded-[2rem] border-[3px] border-brandturquoise/30 bg-white/80 cursor-pointer shadow-lg hover:shadow-2xl hover:border-brandturquoise/80 transition-shadow duration-300"
                >
                    <div className="w-full h-full p-8 md:p-10 flex flex-col justify-between">
                        <h3 className="text-3xl md:text-4xl font-maus font-bold text-slate-800 mb-12 text-center tracking-wide">
                            Hourly Rate Model
                        </h3>

                        <div className="space-y-8 flex-1">
                            {hourlyRates.map((item, idx) => (
                                <div key={idx} className={`flex flex-col gap-1 group ${idx !== hourlyRates.length - 1 ? 'pb-8' : 'pb-2'}`}>
                                    <span className="text-slate-600 text-[1.1rem] font-medium group-hover:text-brandturquoise transition-colors">{item.title}</span>
                                    <div className="flex justify-between items-center text-lg mt-1">
                                        <span className="text-slate-400 font-medium text-base">Per Hour</span>
                                        <span className="text-slate-900 font-black text-2xl">{item.rate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Retainer Packages Card */}
                <div
                    ref={card2Ref}
                    onMouseEnter={() => handleCardHover(card2Ref)}
                    onMouseLeave={() => handleCardLeave(card2Ref)}
                    className="relative w-full lg:w-1/2 rounded-[2rem] border-[3px] border-brandpink/30 bg-white/80 cursor-pointer shadow-lg hover:shadow-2xl hover:border-brandpink/80 transition-shadow duration-300"
                >
                    <div className="w-full h-full p-8 md:p-10 flex flex-col justify-between">
                        <h3 className="text-3xl md:text-4xl font-maus font-bold text-slate-800 mb-12 text-center tracking-wide relative">
                            Retainer Packages
                            <span className="absolute -top-6 -right-4 bg-brandorange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md transform rotate-6 tracking-wider font-coolvetica">POPULAR</span>
                        </h3>

                        <div className="space-y-8 flex-1">
                            {retainerPackages.map((item, idx) => (
                                <div key={idx} className={`flex flex-col gap-1 group ${idx !== retainerPackages.length - 1 ? 'pb-8' : 'pb-2'}`}>
                                    <span className="text-slate-600 text-[1.1rem] font-medium group-hover:text-brandpink transition-colors">{item.title}</span>
                                    <div className="flex justify-between items-center text-lg mt-1">
                                        <span className="text-slate-400 font-medium tracking-wide text-base">{item.subtitle}</span>
                                        <span className="text-slate-900 font-black text-2xl">{item.rate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* 3D Character Illustration (Placeholder visually if image is missing, placed bottom left) */}
            <img
                ref={characterRef}
                src="/images/marketing/pricing-character.png" // User can replace with the exact image from figma
                alt="Pricing Character"
                className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-[450px] object-contain object-bottom pointer-events-none z-20 mix-blend-multiply drop-shadow-2xl"
                onError={(e) => {
                    // Hide instead of showing broken image if file doesn't exist yet
                    e.currentTarget.style.display = 'none';
                }}
            />
        </section>
    );
};

export default Pricing;
