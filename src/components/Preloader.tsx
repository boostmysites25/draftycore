
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressContainerRef = useRef<HTMLDivElement>(null);
    const progressTrackRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const tl = gsap.timeline();

        if (!textRef.current) return;
        const words = textRef.current.children;

        // Initial State
        tl.set(progressBarRef.current, { width: '0%' });

        // 0. Text Entrance (Falling from Top)
        tl.fromTo(words,
            { y: -window.innerHeight + 50, opacity: 1 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'bounce.out', stagger: 0.9 }
        );

        // 1. Loading Animation
        tl.to(progressBarRef.current, {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut',
        }, "-=0.5");

        // 2. Text & Bar Exit (Fall Down One by One)
        tl.to([...words, progressContainerRef.current, progressTrackRef.current], {
            y: window.innerHeight + 100, // Fall down off screen
            // y: window.innerHeight / 2, // Fall down off screen
            // opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            stagger: 0.2
        }, "-=0.4");

        // 3. Shutter Reveal (Slide Up)
        tl.to(containerRef.current, {
            yPercent: -100, // Slide the whole container UP
            duration: 1.3,
            ease: 'power4.inOut',
        }, "-=0.4");

        // 4. Cleanup (optional, display: none handled by sliding out of view)
        tl.set(containerRef.current, { display: 'none' });

    }, []);



    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-white border-b-4 border-brandlimegreen" // White Background
        >
            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center w-full h-full justify-center">
                {/* Text */}
                <h1
                    ref={textRef}
                    className="text-5xl sm:text-6xl md:text-9xl font-black tracking-widest uppercase mb-8 flex gap-4 sm:gap-6"
                    style={{ fontFamily: "'Octin College', sans-serif", perspective: '1000px' }}
                >
                    <span className="text-brandlimegreen" style={{ display: 'inline-block', opacity: 0 }}>LETS</span> {/* Parrot Green - Visible on White */}
                    <span className="text-brandyellow" style={{ display: 'inline-block', opacity: 0 }}>SET</span>  {/* Mustard */}
                    <span className="text-brandturquoise" style={{ display: 'inline-block', opacity: 0 }}>GO</span>   {/* Blue */}
                </h1>

                {/* Loading Bar Container - Positioned at Bottom like Reference */}
                <div ref={progressContainerRef} className="absolute bottom-10 left-0 w-full px-0">
                    {/* Thin Track Line */}
                    <div
                        ref={progressTrackRef}
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#ADFF2F] opacity-30"
                    ></div>

                    {/* Fill Bar */}
                    <div
                        ref={progressBarRef}
                        className="h-[5px] bg-[#ADFF2F] rounded-r-full" // 5px height, Parrot Green
                        style={{ borderRadius: '0 30px 30px 0' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
