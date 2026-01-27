import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextProps {
    text: string;
    className?: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
    text = "Ready to level up",
    className = "",
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const plane1 = useRef<HTMLDivElement>(null);
    const plane2 = useRef<HTMLDivElement>(null);
    const plane3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let requestAnimationFrameId = 0;
        let xPercent = 0;

        const ctx = gsap.context(() => {
            const planes = [plane1.current, plane2.current, plane3.current];
            if (!planes[0]) return;

            // ANIMATION LOOP
            const animate = () => {
                if (xPercent <= -100) {
                    xPercent = 0;
                }
                if (xPercent > 0) {
                    xPercent = -100;
                }

                // Base speed + Scroll Acceleration
                gsap.set(planes, { xPercent: xPercent });

                // Track 1 & 3 move Left (-), Track 2 moves Right (+)
                gsap.set(plane1.current, { xPercent: xPercent });
                gsap.set(plane2.current, { xPercent: -100 - xPercent }); // Reverse direction
                gsap.set(plane3.current, { xPercent: xPercent });

                // Constant movement
                xPercent -= 0.05;

                requestAnimationFrameId = requestAnimationFrame(animate);
            };
            requestAnimationFrameId = requestAnimationFrame(animate);


            // SCROLL VELOCITY SKEW
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const velocity = self.getVelocity();
                    const skewAmount = velocity / 300;
                    const clampedSkew = gsap.utils.clamp(-20, 20, skewAmount);

                    // Apply Skew: Only skew when scrolling
                    gsap.to(planes, {
                        skewX: clampedSkew,
                        overwrite: true,
                        duration: 0.1,
                        ease: "power3.out"
                    });

                    // Return to 0 skew when stopped
                    gsap.to(planes, {
                        skewX: 0,
                        delay: 0.1, // Wait briefly before resetting
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: "auto"
                    });

                    // Add scroll speed boost
                    xPercent += velocity * 0.0005;
                }
            });

        }, sectionRef);

        return () => {
            cancelAnimationFrame(requestAnimationFrameId);
            ctx.revert();
        };
    }, []);

    // Helper: Separator Icon
    const Separator = () => (
        <span className="mx-6 md:mx-12 opacity-50">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-10 md:h-10">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
        </span>
    );

    // Render a single track content (Needs duplication for loop)
    const TrackContent = ({ outline = false }) => (
        <div className="flex items-center whitespace-nowrap will-change-transform">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex items-center">
                    <span
                        className={`text-[6rem] md:text-[10rem] font-black font-octin-college uppercase leading-none px-4 ${outline ? 'text-transparent stroke-text' : 'text-black'}`}
                        style={outline ? { WebkitTextStroke: "2px black" } : {}}
                    >
                        {text}
                    </span>
                    <Separator />
                </div>
            ))}
        </div>
    );

    return (
        <section ref={sectionRef} className={`relative py-32 overflow-hidden bg-white/50 backdrop-blur-sm ${className}`}>
            {/* TRACK 1 (Solid) */}
            <div ref={plane1} className="relative flex w-[200%] border-t border-b border-black/10 py-6 bg-white/50">
                <TrackContent outline={false} />
            </div>

            {/* TRACK 2 (Outline - Reverse) */}
            <div ref={plane2} className="relative flex w-[200%] border-b border-black/10 py-6 bg-neutral-100">
                <TrackContent outline={true} />
            </div>

            {/* TRACK 3 (Solid) */}
            <div ref={plane3} className="relative flex w-[200%] border-b border-black/10 py-6 bg-white/50">
                <TrackContent outline={false} />
            </div>
        </section>
    );
};

export default ScrollingText;
