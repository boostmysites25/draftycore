import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
    {
        title: "Weekly Plan",
        price: "$1,399",
        period: " / week",
        hours: "Approx. 40 hours drafting support",
        includes: [
            "Dedicated drafting support",
            "Software cost",
            "Timesheet tracking & communication hub",
            "Revisions & markups",
            "Local Australian coordination"
        ],
        effectiveRate: "~$35/hr",
        savings: null,
        mainColor: "border-brandturquoise/30",
        hoverColor: "hover:border-brandturquoise/80",
        textColor: "group-hover:text-brandturquoise",
        iconColor: "text-brandturquoise",
    },
    {
        title: "Monthly Plan",
        price: "$5,399",
        period: " / month",
        hours: "Approx. 160 hours drafting support",
        includes: [
            "Dedicated drafting capacity",
            "Software cost",
            "Project dashboard & financial visibility",
            "Workflow integration with your studio",
            "Priority turnaround support",
            "Local Australian coordination"
        ],
        effectiveRate: "~$33/hr",
        savings: "Savings: ~6–8% vs weekly plan",
        mainColor: "border-brandpink/30",
        hoverColor: "hover:border-brandpink/80",
        textColor: "group-hover:text-brandpink",
        iconColor: "text-brandpink",
        popular: true,
    },
    {
        title: "Annual Partnership",
        price: "$5,099",
        period: " / month*",
        subTitle: "*billed annually ($61,188 / year)",
        hours: "Approx. 160 hours per month",
        includes: [
            "Long-term dedicated drafting support",
            "Software cost",
            "Priority production capacity",
            "Studio workflow alignment",
            "Ongoing coordination and reporting",
            "Local Australian coordination"
        ],
        effectiveRate: "~$31.8/hr",
        savings: "Savings: ~5–7% vs monthly | ~12–15% vs weekly",
        mainColor: "border-brandorange/30",
        hoverColor: "hover:border-brandorange/80",
        textColor: "group-hover:text-brandorange",
        iconColor: "text-brandorange",
    }
];

const Pricing = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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
            const validCards = cardRefs.current.filter(Boolean);
            if (validCards.length > 0) {
                tl.from(validCards, {
                    y: 100,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power4.out",
                }, 0.4);
            }

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
    const handleCardHover = (cardRef: HTMLDivElement | null) => {
        if (cardRef) {
            gsap.to(cardRef, {
                scale: 1.05,
                boxShadow: "0rem 1.25rem 2.5rem rgba(0, 0, 0, 0.5)",
                y: -15,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    const handleCardLeave = (cardRef: HTMLDivElement | null) => {
        if (cardRef) {
            gsap.to(cardRef, {
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
            className="relative w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center py-24 px-4 md:px-8 overflow-hidden border-t-4 border-brandlimegreen"
        >
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brandlimegreen via-brandturquoise to-brandpink"></div>
            {/* Title */}
            <div className="flex flex-col items-center justify-center mb-16 z-10 w-full max-w-6xl">
                <h2
                    ref={titleRef}
                    className="text-5xl xl:text-7xl font-maus tracking-wider text-center leading-tight"
                >
                    <span className="bg-gradient-to-br from-brandturquoise via-brandpink to-brandorange bg-clip-text text-transparent">PRICING & ENGAGEMENT MODELS
                    </span>
                </h2>
            </div>

            {/* Cards Container */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center items-stretch z-10">
                {pricingPlans.map((plan, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (cardRefs.current[idx] = el)}
                        onMouseEnter={() => handleCardHover(cardRefs.current[idx])}
                        onMouseLeave={() => handleCardLeave(cardRefs.current[idx])}
                        className={`group relative w-full rounded-[2rem] border-[0.1875rem] ${plan.mainColor} bg-white/80 cursor-pointer shadow-lg hover:shadow-2xl ${plan.hoverColor} transition-shadow duration-300 flex flex-col`}
                    >
                        <div className="w-full h-full p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-maus font-bold text-slate-800 mb-2 text-center tracking-wide relative">
                                    {plan.title}
                                    {plan.popular && (
                                        <span className="absolute -top-10 -right-2 md:-right-6 bg-brandorange text-white text-[0.65rem] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-md transform rotate-6 tracking-wider font-coolvetica z-10">POPULAR</span>
                                    )}
                                </h3>

                                <div className="text-center mb-6">
                                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                                    <span className="text-xl text-slate-500 font-medium">{plan.period}</span>
                                    {plan.subTitle && (
                                        <div className="text-xs text-slate-400 font-medium mt-2">{plan.subTitle}</div>
                                    )}
                                </div>

                                <div className="text-center text-slate-700 font-medium bg-slate-100 py-3 px-4 rounded-xl mb-6 flex-shrink-0">
                                    {plan.hours}
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Includes:</div>
                                    {plan.includes.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <svg className={`w-5 h-5 mt-0.5 shrink-0 ${plan.iconColor} transition-colors`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="text-slate-600 font-medium leading-snug text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-200/60">
                                <div className="text-center font-bold text-lg text-slate-800 mb-1">
                                    Effective rate: <span className={plan.iconColor}>{plan.effectiveRate}</span>
                                </div>
                                {plan.savings && (
                                    <div className="text-center text-xs font-medium text-brandorange mt-2 bg-brandorange/10 py-1.5 px-2 rounded-lg leading-tight">
                                        {plan.savings}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3D Character Illustration (Placeholder visually if image is missing, placed bottom left) */}
            <img
                ref={characterRef}
                src="/images/marketing/pricing-character.png" // User can replace with the exact image from figma
                alt="Pricing Character"
                className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-[28.125rem] object-contain object-bottom pointer-events-none z-20 mix-blend-multiply drop-shadow-2xl"
                onError={(e) => {
                    // Hide instead of showing broken image if file doesn't exist yet
                    e.currentTarget.style.display = 'none';
                }}
            />
        </section>
    );
};

export default Pricing;
