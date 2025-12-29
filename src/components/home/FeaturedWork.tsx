
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import Particles from "../ui/Particles";

const MarqueeItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-4 px-5 md:px-10">
        <span className="text-xl sm:text-2xl md:text-5xl flex font-octin-college items-center gap-2 font-bold tracking-widest uppercase whitespace-nowrap">
            {text}
        </span>
        {/* <div className="w-1.5 h-1.5 bg-current rounded-full"></div> */}
    </div>
);

const FeaturedWork = () => {
    const topMarqueeRef = useRef<HTMLDivElement>(null);
    const bottomMarqueeRef = useRef<HTMLDivElement>(null);
    const leftMarqueeRef = useRef<HTMLDivElement>(null);
    const rightMarqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const duration = 60;
        const ease = "linear";

        const createMarquee = (element: HTMLDivElement | null, direction: 'left' | 'right' | 'up' | 'down') => {
            if (!element) return;
            const track = element.querySelector('.marquee-track');
            if (!track) return;

            // Seamless loop logic:
            // The track contains two identical sets of items.
            // We animate the track by -50% of its size (which equals exactly 1 set).
            // When it reaches -50%, it looks identical to 0%, so we reset (or loop).

            if (direction === 'left') {
                gsap.to(track, { xPercent: -50, duration, ease, repeat: -1 });
            } else if (direction === 'right') {
                // For right: start at -50% and move to 0%
                gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration, ease, repeat: -1 });
            } else if (direction === 'up') {
                gsap.to(track, { yPercent: -50, duration, ease, repeat: -1 });
            } else if (direction === 'down') {
                gsap.fromTo(track, { yPercent: -50 }, { yPercent: 0, duration, ease, repeat: -1 });
            }
        };

        const ctx = gsap.context(() => {
            createMarquee(topMarqueeRef.current, 'left');
            createMarquee(bottomMarqueeRef.current, 'right');
            createMarquee(leftMarqueeRef.current, 'up');
            createMarquee(rightMarqueeRef.current, 'down');
        });

        return () => ctx.revert();
    }, []);

    // Increased count significantly to ensure one set is ALWAYS larger than any screen dimension
    const REPEAT_COUNT = 12;
    const WORD = "FEATURED WORK";

    const HorizontalSet = () => (
        <div className="flex shrink-0 items-center">
            {Array(REPEAT_COUNT).fill(null).map((_, i) => (
                <MarqueeItem key={i} text={WORD} />
            ))}
        </div>
    );

    const VerticalSet = () => (
        <div className="flex flex-col shrink-0 items-center">
            {Array(REPEAT_COUNT).fill(null).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-4 py-5 md:py-10" style={{ writingMode: 'vertical-rl' }}>
                    <span className="text-xl sm:text-2xl md:text-5xl flex items-center gap-2 font-bold tracking-widest uppercase whitespace-nowrap rotate-180 font-octin-college">
                        {WORD}
                        {/* <div className="w-1.5 h-1.5 bg-current rounded-full"></div> */}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <section className="md:min-h-screen bg-white/5 py-24 flex items-center justify-center relative overflow-hidden">

            {/* Background Context */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
            </div>

            {/* Background Particles */}
            {/* <div className="absolute inset-0 z-0">
                <Particles
                    className="absolute inset-0"
                    particleCount={500}
                    particleSpread={10}
                    speed={0.3}
                    particleColors={["#FF7A00", "#FF2D95", "#B8F135", "#2ED9C3"]}
                    moveParticlesOnHover={true}
                    particleHoverFactor={2}
                    alphaParticles={false}
                    particleBaseSize={100}
                    sizeRandomness={1}
                    cameraDistance={25}
                />
            </div> */}

            <div className="wrapper w-full relative z-10">
                {/* Main Card Container */}
                <div className="relative w-full wrapper aspect-[4/3] md:aspect-video bg-black shadow-2xl border border-white/10 flex flex-col justify-center items-center">

                    {/* 1. TOP MARQUEE (Left) */}
                    <div ref={topMarqueeRef} className="absolute top-0 left-0 w-full h-[35px] sm:h-[50px] md:h-[80px] bg-white text-black z-20 overflow-hidden flex items-center">
                        <div className="marquee-track flex w-max will-change-transform">
                            <HorizontalSet />
                            <HorizontalSet />
                        </div>
                    </div>

                    {/* 2. RIGHT MARQUEE (Down) */}
                    <div ref={rightMarqueeRef} className="absolute top-0 right-0 w-[35px] sm:w-[50px] md:w-[80px] h-full bg-white text-black z-20 overflow-hidden flex flex-col items-center">
                        <div className="marquee-track flex flex-col h-max will-change-transform">
                            <VerticalSet />
                            <VerticalSet />
                        </div>
                    </div>

                    {/* 3. BOTTOM MARQUEE (Right) */}
                    <div ref={bottomMarqueeRef} className="absolute bottom-0 left-0 w-full h-[35px] sm:h-[50px] md:h-[80px] bg-white text-black z-20 overflow-hidden flex items-center">
                        <div className="marquee-track flex w-max will-change-transform">
                            <HorizontalSet />
                            <HorizontalSet />
                        </div>
                    </div>

                    {/* 4. LEFT MARQUEE (Up) */}
                    <div ref={leftMarqueeRef} className="absolute top-0 left-0 w-[35px] sm:w-[50px] md:w-[80px] h-full bg-white text-black z-20 overflow-hidden flex flex-col items-center">
                        <div className="marquee-track flex flex-col h-max will-change-transform">
                            <VerticalSet />
                            <VerticalSet />
                        </div>
                    </div>

                    {/* VIDEO CONTAINER (Inset) */}
                    <div className="absolute inset-[35px] sm:inset-[50px] md:inset-[80px] bg-neutral-900 overflow-hidden group">
                        <video
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                            src="https://rrdevs.net/project-video/group-meeting.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;