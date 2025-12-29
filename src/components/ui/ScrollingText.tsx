import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextProps {
    text: string;
    scrollSpeed?: number;
    className?: string;
    strip1Colors?: string;
    strip2Colors?: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
    text = "Ready to level up",
    scrollSpeed = 50,
    className = "",
    strip1Colors = "bg-white text-black",
    strip2Colors = "bg-black text-white"
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const strip1Ref = useRef<HTMLDivElement>(null);
    const strip2Ref = useRef<HTMLDivElement>(null);

    // Separator Icon
    const Separator = () => (
        <span className="scrt-separator mx-[3vw] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[calc(20px+2.5vw)] w-auto fill-current">
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
            </svg>
        </span>
    );

    useEffect(() => {
        const strips = [
            { ref: strip1Ref, dir: 1, rotate: 8 },
            { ref: strip2Ref, dir: -1, rotate: -8 }
        ];

        const ctx = gsap.context(() => {
            strips.forEach(({ ref, dir }) => {
                if (!ref.current) return;

                const content = ref.current.querySelector('.scrt-content');
                if (!content) return;

                // GSAP Animation
                // For valid infinite loop:
                // Left move (dir=1): start at 0, move to -50% (show right half), reset to 0.
                // Right move (dir=-1): start at -50% (show right half), move to 0 (show left half), reset to -50%.
                const tween = gsap.fromTo(content,
                    { xPercent: dir === 1 ? 0 : -50 },
                    {
                        xPercent: dir === 1 ? -50 : 0,
                        duration: scrollSpeed,
                        ease: "none",
                        repeat: -1
                    }
                ).totalProgress(0.5);

                let lastDirection = 0;

                // Scroll Direction Change
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        if (self.direction !== lastDirection) {
                            lastDirection = self.direction;
                            const isScrollingDown = self.direction === 1;

                            gsap.to(tween, {
                                timeScale: isScrollingDown ? 1 : -1,
                                duration: 0.5,
                                overwrite: true
                            });

                            // Rotate Separators
                            const separators = ref.current?.querySelectorAll('.scrt-separator');
                            if (separators) {
                                gsap.to(separators, {
                                    scaleX: isScrollingDown ? 1 : -1,
                                    duration: 0.3,
                                    overwrite: true
                                });
                            }
                        }
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [scrollSpeed]);

    // Helper to render text multiple times
    const renderContent = (count = 30) => (
        <div className="scrt-content flex items-center whitespace-nowrap will-change-transform">
            {Array.from({ length: count }).map((_, i) => (
                <React.Fragment key={i}>
                    <span className="flex items-center px-[2vw] md:px-[1vw]">
                        {text} <Separator />
                    </span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div ref={containerRef} className={`tt-scrolling-text-crossed py-[calc(30px+3vw)] overflow-hidden bg-transparent ${className}`}>
            <div className="tt-scrolling-text-crossed-inner -mx-[50px] relative">

                {/* Strip 1 */}
                <div
                    ref={strip1Ref}
                    className={`tt-scrolling-text py-5 ${strip1Colors} flex overflow-hidden lg:rotate-[8deg] lg:translate-y-[50%] rotate-[12deg] translate-y-[50%] origin-center font-octin-college text-[calc(21px+3.5vw)] font-bold leading-none uppercase`}
                >
                    <div className="tt-scrt-inner flex flex-auto w-fit">
                        {renderContent()}
                    </div>
                </div>

                {/* Strip 2 */}
                <div
                    ref={strip2Ref}
                    className={`tt-scrolling-text py-5 ${strip2Colors} flex overflow-hidden lg:rotate-[-8deg] lg:-translate-y-[50%] rotate-[-12deg] -translate-y-[50%] origin-center font-octin-college text-[calc(21px+3.5vw)] font-bold leading-none uppercase`}
                >
                    <div className="tt-scrt-inner flex flex-auto w-fit">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollingText;
