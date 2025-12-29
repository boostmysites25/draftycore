import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    bgColor: string;
    textColor: string;
    rotation: number;
    offsetY: number;
}

const testimonialsData: Testimonial[] = [
    {
        id: 1,
        quote: "DraftyCore allowed us to take on two massive projects simultaneously without worrying about staffing. The drawing quality was indistinguishable from our in-house team.",
        author: "Sarah Jenkins",
        role: "Principal Architect",
        bgColor: "bg-brandorange", // #FF7A00
        textColor: "text-white",
        rotation: -4,
        offsetY: 100
    },
    {
        id: 2,
        quote: "The turnaround time on our construction documents was incredible. They followed our standards perfectly, and the redlines were minimal. A true game-changer for our firm.",
        author: "David Ross",
        role: "Structural Engineer",
        bgColor: "bg-brandpink", // #FF2D95
        textColor: "text-white",
        rotation: 3,
        offsetY: -40
    },
    {
        id: 3,
        quote: "We were skeptical about outsourcing, but DraftyCore's pilot project convinced us. They integrated seamlessly with our workflow and handled the BIM modeling expertely.",
        author: "Elena Rodriguez",
        role: "Design Director",
        bgColor: "bg-brandlimegreen", // #B8F135
        textColor: "text-black",
        rotation: -2,
        offsetY: 80
    },
    {
        id: 4,
        quote: "Their ability to scale up during our busy season saved us. Efficient, professional, and highly skilled in Revit. effectively extended our studio's capabilities.",
        author: "James Chen",
        role: "Project Manager",
        bgColor: "bg-brandturquoise", // #2ED9C3
        textColor: "text-black",
        rotation: 4,
        offsetY: -20
    }
];

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 20%", // Trigger almost immediately when section enters
                    toggleActions: "play none none reverse" // Play on enter, reverse only when scrolling back up past it
                },
                y: 250, // Reduced distance for reliability
                opacity: 0,
                rotation: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) cardsRef.current[index] = el;
    };

    return (
        <section ref={containerRef} className="pt-16 pb-40 bg-white relative">
            <div className="wrapper relative z-10">
                <div className="mb-32 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold font-octin-college text-secondary uppercase tracking-tighter">
                        Testimonials
                    </h2>
                </div>

                <div className="flex flex-col lg:grid grid-cols-4 justify-center items-start gap-6 lg:gap-10">
                    {testimonialsData.map((item, index) => (
                        <div
                            key={item.id}
                            className="w-full relative z-10 hover:z-20 transition-all duration-300 lg:rotate-[var(--rot)] lg:translate-y-[var(--y)]"
                            style={{
                                '--rot': `${item.rotation}deg`,
                                '--y': `${item.offsetY}px`,
                            } as React.CSSProperties}
                        >
                            {/* GSAP Animation Wrapper */}
                            <div ref={(el) => addToRefs(el, index)} className="h-full w-full">
                                {/* Card Content (Hover Scale + Styling) */}
                                <div className={`p-8 md:p-10 h-full w-full rounded-sm shadow-xl transition-transform duration-500 hover:scale-[1.02] ${item.bgColor} ${item.textColor}`}>
                                    <div className="flex flex-col h-full justify-between min-h-[350px]">
                                        <p className="text-lg md:text-xl font-medium leading-relaxed mb-auto">
                                            {item.quote}
                                        </p>

                                        <div className="mt-8 flex justify-between items-end">
                                            <div>
                                                <h4 className="text-xl font-bold">{item.author}</h4>
                                                <p className={`text-sm opacity-70 uppercase tracking-wider mt-1 font-bold`}>{item.role}</p>
                                            </div>

                                            {/* Quote Icon Background */}
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.textColor === 'text-white' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                                                </svg>
                                            </div>
                                        </div>
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

export default Testimonials;
