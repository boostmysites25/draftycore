import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    company: string;
    stamp: string;
    bgColor: string;
    textColor: string;
}

const testimonialsData: Testimonial[] = [
    {
        id: 1,
        quote: "DraftyCore allowed us to take on two massive projects simultaneously without worrying about staffing. The drawing quality was indistinguishable from our in-house team.",
        author: "Sarah Jenkins",
        role: "Principal Architect",
        company: "Jenkins & Co",
        stamp: "APPROVED",
        bgColor: "bg-brandorange",
        textColor: "text-white"
    },
    {
        id: 2,
        quote: "The turnaround time on our construction documents was incredible. They followed our standards perfectly, and the redlines were minimal. A true game-changer for our firm.",
        author: "David Ross",
        role: "Structural Engineer",
        company: "Ross Structures",
        stamp: "EXCELLENT",
        bgColor: "bg-brandpink",
        textColor: "text-white"
    },
    {
        id: 3,
        quote: "We were skeptical about outsourcing, but DraftyCore's pilot project convinced us. They integrated seamlessly with our workflow and handled the BIM modeling expertly.",
        author: "Elena Rodriguez",
        role: "Design Director",
        company: "Studio Rodriguez",
        stamp: "PARTNER",
        bgColor: "bg-brandlimegreen",
        textColor: "text-black"
    },
    {
        id: 4,
        quote: "Their ability to scale up during our busy season saved us. Efficient, professional, and highly skilled in Revit. Effectively extended our studio's capabilities.",
        author: "James Chen",
        role: "Project Manager",
        company: "Urban Plan",
        stamp: "VERIFIED",
        bgColor: "bg-brandturquoise",
        textColor: "text-black"
    },
    {
        id: 5,
        quote: "DraftyCore is not just a service, it's a strategic partner. They understand the nuances of architectural drafting better than anyone else we've worked with.",
        author: "Olivia Wright",
        role: "Firm Owner",
        company: "Wright Architects",
        stamp: "RETAINER",
        bgColor: "bg-black",
        textColor: "text-white"
    }
];

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!wrapperRef.current || !containerRef.current) return;

            const cards = cardsRef.current;
            const totalCards = cards.length;

            // Set initial random rotation for a "messy stack" look
            cards.forEach((card, i) => {
                if (card) {
                    gsap.set(card, {
                        rotation: gsap.utils.random(-5, 5),
                        z: i
                    });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${totalCards * 100}%`, // Scroll distance based on card count
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // Animate each card "flying away"
            cards.forEach((card, i) => {
                // Don't animate the last card away, it stays as the final conclusion (or we can animate it too)
                if (i === totalCards - 1) return;

                tl.to(card, {
                    xPercent: gsap.utils.random(150, 300) * (Math.random() > 0.5 ? 1 : -1), // Random direction
                    yPercent: gsap.utils.random(-50, 50),
                    rotation: gsap.utils.random(-45, 45),
                    opacity: 0,
                    scale: 0.8,
                    duration: 1,
                    ease: "power2.in"
                }, i * 1); // Stagger is effectively controlled by timeline position
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) cardsRef.current[index] = el;
    };

    return (
        <section ref={containerRef} className="h-screen bg-[#f0f0f0] relative overflow-hidden flex flex-col items-center justify-center text-black">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative z-10 text-center mb-8 md:mb-12">
                <h2 className="text-4xl md:text-6xl font-black font-maus uppercase tracking-tighter text-secondary">
                    Approved By
                </h2>
                <p className="text-neutral-500 text-lg mt-2 font-coolvetica-condensed">SCROLL TO REVIEW DOCUMENTS</p>
            </div>

            {/* STACK WRAPPER */}
            <div ref={wrapperRef} className="relative w-full max-w-2xl h-[50vh] md:h-[60vh] flex items-center justify-center perspective-1000">
                {testimonialsData.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => addToRefs(el, index)}
                        className={`absolute w-[90%] md:w-full p-8 md:p-12 shadow-2xl rounded-sm border-2 border-black origin-center ${item.bgColor} ${item.textColor}`}
                        style={{
                            maxWidth: "600px",
                            zIndex: testimonialsData.length - index, // Inverse stacking
                            transformStyle: "preserve-3d" // For better rotation
                        }}
                    >
                        {/* Stamp */}
                        <div className={`absolute top-8 right-8 border-4 border-current opacity-30 px-4 py-2 text-xl md:text-2xl font-black transform rotate-[-15deg] font-maus tracking-widest pointer-events-none`}>
                            {item.stamp}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col h-full gap-6">
                            <div className="border-b border-current opacity-30 pb-4 flex justify-between items-center">
                                <span className="text-xs opacity-70">DOC_ID: {item.id.toString().padStart(4, '0')}</span>
                                <span className="text-xs opacity-70">CLASSIFIED: PUBLIC</span>
                            </div>

                            <p className="text-xl md:text-3xl font-medium leading-tight opacity-95 tracking-widest font-coolvetica-condensed">
                                "{item.quote}"
                            </p>

                            <div className="mt-auto pt-6 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${item.textColor === 'text-white' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg leading-none font-coolvetica">{item.author}</h4>
                                    <p className="text-sm opacity-80 mt-1">{item.role}, {item.company}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 text-neutral-400 text-xs animate-pulse">
                ▼ KEEP SCROLLING TO DISMISS
            </div>
        </section>
    );
};

export default Testimonials;
