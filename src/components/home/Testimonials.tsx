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
        quote: "They took the time to understand my brand and developed a marketing strategy that perfectly captured our essence. Their creative campaigns led to a significant increase in sales.",
        author: "Michael Mahanay",
        role: "Designer",
        bgColor: "bg-[#1a1a1a]",
        textColor: "text-white",
        rotation: -4,
        offsetY: 100
    },
    {
        id: 2,
        quote: "Their mission is to empower the brands we believe in with tailor-made approaches that ignite creativity and growth without limits. We discovered truly quality work.",
        author: "Daryl Mitchell",
        role: "Lead Developer",
        bgColor: "bg-[#F5F5F0]",
        textColor: "text-[#1a1a1a]",
        rotation: 3,
        offsetY: -40
    },
    {
        id: 3,
        quote: "Redox acts as a partner for forward-thinking organizations, using design and technology to tackle today's challenges. I offer creative solutions that connect, engage, and drive results.",
        author: "Tom Banton",
        role: "Digital Marketer",
        bgColor: "bg-[#1a1a1a]",
        textColor: "text-white",
        rotation: -2,
        offsetY: 80
    },
    {
        id: 4,
        quote: "Design is a team effort, and I believe in a true partnership. By working closely with you and understanding your vision, we can create something that truly resonates.",
        author: "Lance Petter",
        role: "Web Designer",
        bgColor: "bg-[#F5F5F0]",
        textColor: "text-[#1a1a1a]",
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
                    start: "top 30%",
                    toggleActions: "play reverse play reverse"
                },
                y: 500,
                opacity: 0,
                rotation: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power4.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };

    return (
        <section ref={containerRef} className="py-20 bg-white overflow-hidden relative">
            <div className="wrapper relative z-10">
                <div className="mb-32 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold font-octin-college text-secondary uppercase tracking-tighter">
                        Our Service.
                    </h2>
                </div>

                <div className="flex flex-col lg:grid grid-cols-4 justify-center items-start gap-6 lg:gap-10">
                    {testimonialsData.map((item, index) => (
                        <div
                            key={item.id}
                            ref={(el) => addToRefs(el, index)}
                            className={`p-8 md:p-10 w-full flex-shrink-0 relative group transition-transform duration-500 hover:z-20 hover:scale-[1.02] shadow-xl ${item.bgColor} ${item.textColor} lg:rotate-[var(--rot)] lg:translate-y-[var(--y)]`}
                            style={{
                                '--rot': `${item.rotation}deg`,
                                '--y': `${item.offsetY}px`,
                            } as React.CSSProperties}
                        >
                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full justify-between">
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
