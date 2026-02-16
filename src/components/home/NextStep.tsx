import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from '../ui/Magnet';

gsap.registerPlugin(ScrollTrigger);

const NextStep = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const steps = [
        {
            text: "Free Consultation",
            sub: "Let's talk about your needs",
            image: "/free_consultation.jpeg",
        },
        {
            text: "Pilot Project",
            sub: "Test our capabilities risk-free",
            image: "/pilot_project.jpeg",
        },
        {
            text: "Full Partnership",
            sub: "Scale your drafting capacity",
            image: "/full_partnership.jpeg",
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            timeline
                .from(titleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                })
                .from(subTitleRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(itemsRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.4");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="py-24 bg-[#F5F5F0] relative overflow-hidden">
            {/* Background Decoration (Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl z-[1]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl z-[1]"></div>
            </div>

            <div className="wrapper relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 ref={titleRef} className="text-5xl md:text-8xl font-black font-maus text-secondary uppercase tracking-tighter mb-4">
                        Next Step
                    </h2>
                    {/* <p ref={subTitleRef} className="text-xl md:text-2xl text-neutral-500 font-medium max-w-3xl mx-auto font-coolvetica tracking-widest">
                        Ready to Scale Your Drafting Capacity Without Overhead?
                    </p> */}
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} ref={(el) => addToRefs(el, index)} className="flex flex-col items-center text-center group"
                        >
                            {/* Circular Image Container */}
                            <Magnet padding={30} disabled={false} magnetStrength={30}>
                                <div className="relative mb-8 w-64 h-64 md:w-72 md:h-72">
                                    {/* <div className="absolute inset-0 rounded-full border-2 border-black/5 group-hover:border-secondary/30 transition-colors duration-500"></div> */}
                                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-100 shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                                        <img
                                            src={step.image}
                                            alt={index.toString()}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </Magnet>
                            {/* Text */}
                            <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 max-w-xs group-hover:text-secondary transition-colors duration-300 font-maus mb-2">
                                {step.text}
                            </h3>
                            <p className="text-xl text-neutral-500 max-w-xs group-hover:text-secondary transition-colors duration-300 font-coolvetica tracking-wide">
                                {step.sub}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Star Icon */}
                <div className="mt-20 flex justify-end opacity-20">
                    <div className="animate-[spin_4s_linear_infinite]"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg></div>
                </div>
                <div className="absolute z-[2] top-0 left-6 opacity-20 animate-[spin_4s_linear_infinite]">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default NextStep;
