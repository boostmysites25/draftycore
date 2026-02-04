
import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// --- MARQUEE COMPONENTS (Unchanged) ---
const MarqueeItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-4 px-5 md:px-10">
        <span className="text-xl sm:text-2xl md:text-5xl flex font-maus items-center gap-2 font-bold tracking-widest uppercase whitespace-nowrap">
            {text}
        </span>
    </div>
);

const HorizontalSet = ({ text }: { text: string }) => (
    <div className="flex shrink-0 items-center">
        {Array(4).fill(null).map((_, i) => (
            <MarqueeItem key={i} text={text} />
        ))}
    </div>
);

const VerticalSet = ({ text }: { text: string }) => (
    <div className="flex flex-col shrink-0 items-center">
        {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-4 py-5 md:py-10" style={{ writingMode: 'vertical-rl' }}>
                <span className="text-xl sm:text-2xl md:text-5xl flex items-center gap-2 font-bold tracking-widest uppercase whitespace-nowrap rotate-180 font-maus">
                    {text}
                </span>
            </div>
        ))}
    </div>
);

// --- PROJECT CARD COMPONENT ---
interface ProjectProps {
    id: number;
    title: string;
    videoSrc: string;
}

const ProjectCard = forwardRef<HTMLDivElement, { project: ProjectProps }>(({ project }, ref) => {
    const topMarqueeRef = useRef<HTMLDivElement>(null);
    const bottomMarqueeRef = useRef<HTMLDivElement>(null);
    const leftMarqueeRef = useRef<HTMLDivElement>(null);
    const rightMarqueeRef = useRef<HTMLDivElement>(null);
    const internalRef = useRef<HTMLDivElement>(null);
    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);

    // Sync external ref
    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') {
            ref(internalRef.current);
        } else {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = internalRef.current;
        }
    }, [ref]);

    useEffect(() => {
        const duration = 20;
        const ease = "linear";

        const createMarquee = (element: HTMLDivElement | null, direction: 'left' | 'right' | 'up' | 'down') => {
            if (!element) return;
            const track = element.querySelector('.marquee-track');
            if (!track) return;

            if (direction === 'left') {
                gsap.to(track, { xPercent: -50, duration, ease, repeat: -1 });
            } else if (direction === 'right') {
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

            // MOUSE PARALLAX (Apply to both videos)
            const videoRefs = [videoRef1.current, videoRef2.current];
            const hasVideos = videoRefs.every(v => v);

            if (hasVideos && internalRef.current) {
                const xTo1 = gsap.quickTo(videoRef1.current, "x", { duration: 0.3, ease: "power3" });
                const yTo1 = gsap.quickTo(videoRef1.current, "y", { duration: 0.3, ease: "power3" });
                const xTo2 = gsap.quickTo(videoRef2.current, "x", { duration: 0.3, ease: "power3" });
                const yTo2 = gsap.quickTo(videoRef2.current, "y", { duration: 0.3, ease: "power3" });

                const onMouseMove = (e: MouseEvent) => {
                    if (!internalRef.current) return;
                    const { left, top, width, height } = internalRef.current.getBoundingClientRect();
                    const x = (e.clientX - left - width / 2) * 0.05;
                    const y = (e.clientY - top - height / 2) * 0.05;
                    xTo1(x); yTo1(y);
                    xTo2(x); yTo2(y);
                };

                internalRef.current.addEventListener("mousemove", onMouseMove);
                internalRef.current.addEventListener("mouseleave", () => {
                    xTo1(0); yTo1(0);
                    xTo2(0); yTo2(0);
                });
            }
        }, internalRef);

        return () => ctx.revert();
    }, []);

    const videoClass = "w-full h-full object-cover opacity-90 group-hover:opacity-100 scale-100 transition-opacity duration-700 ease-out grayscale group-hover:grayscale-0 will-change-transform";

    return (
        <div ref={internalRef} className="project-card relative w-[80vw] md:w-[60vw] aspect-[16/9] shrink-0 bg-transparent shadow-2xl flex flex-col justify-center items-center overflow-visible mx-4 md:mx-10 group will-change-[width,margin]">

            {/* MARQUEES (Note: These might need to be hidden/faded out during expansion if they overlay the split) */}
            {/* 1. TOP MARQUEE (Left) */}
            {/* <div ref={topMarqueeRef} className="absolute top-0 left-0 w-full h-[30px] sm:h-[40px] md:h-[60px] bg-white text-black z-20 overflow-hidden flex items-center transition-opacity duration-300 opacity-100 border border-white/10">
                <div className="marquee-track flex w-max will-change-transform">
                    <HorizontalSet text={project.title} />
                    <HorizontalSet text={project.title} />
                    <HorizontalSet text={project.title} />
                    <HorizontalSet text={project.title} />
                </div>
            </div> */}

            {/* 2. RIGHT MARQUEE (Down) */}
            {/* <div ref={rightMarqueeRef} className="absolute top-0 right-0 w-[30px] sm:w-[40px] md:w-[60px] h-full bg-white text-black z-20 overflow-hidden flex flex-col items-center transition-opacity duration-300 opacity-100 border border-white/10">
                <div className="marquee-track flex flex-col h-max will-change-transform">
                    <VerticalSet text={project.title} />
                    <VerticalSet text={project.title} />
                    <VerticalSet text={project.title} />
                    <VerticalSet text={project.title} />
                </div>
            </div> */}

            {/* 3. BOTTOM MARQUEE (Right) */}
            {/* <div ref={bottomMarqueeRef} className="absolute bottom-0 left-0 w-full h-[30px] sm:h-[40px] md:h-[60px] bg-white text-black z-20 overflow-hidden flex items-center transition-opacity duration-300 opacity-100 border border-white/10">
                <div className="marquee-track flex w-max will-change-transform">
                    <HorizontalSet text={project.title} />
                    <HorizontalSet text={project.title} />
                    <HorizontalSet text={project.title} />
                    <HorizontalSet text={project.title} />
                </div>
            </div> */}

            {/* 4. LEFT MARQUEE (Up) */}
            {/* <div ref={leftMarqueeRef} className="absolute top-0 left-0 w-[30px] sm:w-[40px] md:w-[60px] h-full bg-white text-black z-20 overflow-hidden flex flex-col items-center transition-opacity duration-300 opacity-100 border border-white/10">
                <div className="marquee-track flex flex-col h-max will-change-transform">
                    <VerticalSet text={project.title} />
                    <VerticalSet text={project.title} />
                    <VerticalSet text={project.title} />
                    <VerticalSet text={project.title} />
                </div>
            </div> */}

            {/* VIDEO CONTAINER (Split) */}
            <div className="shutter-wrapper absolute inset-0 z-10 flex w-full h-full overflow-hidden border-4 border-black">
                {/* LEFT HALF */}
                <div className="mask-left relative w-1/2 h-full overflow-hidden bg-neutral-900 border-black/50 will-change-transform">
                    <div className="absolute top-0 left-0 w-[200%] h-full">
                        <video
                            ref={videoRef1}
                            className={videoClass}
                            src={project.videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                    </div>
                </div>

                {/* RIGHT HALF */}
                <div className="mask-right relative w-1/2 h-full overflow-hidden bg-neutral-900 border-black/50 will-change-transform">
                    <div className="absolute top-0 left-[-100%] w-[200%] h-full">
                        <video
                            ref={videoRef2}
                            className={videoClass}
                            src={project.videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = "ProjectCard";

// --- DATA ---
const PROJECTS: ProjectProps[] = [
    { id: 1, title: "UNIFIED ECOSYSTEM", videoSrc: "/videos/showreel-1920.mp4" }
];

const FeaturedWork = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!triggerRef.current || !sectionRef.current || !headingRef.current || !cardRef.current) return;

        const mm = gsap.matchMedia();

        // DESKTOP ANIMATION (min-width: 768px)
        mm.add("(min-width: 768px)", () => {
            // 1. REVEAL ANIMATION (Initial)
            gsap.set(sectionRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1
            });

            const scrollDistance = "300%"; // 300vh total scroll

            // Pin FeaturedWork (Overlay)

            // Pin FeaturedWork (Overlay)
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    pinSpacing: false, // Allow Industries to slide up underneath
                    scrub: 1,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            const headingWidth = headingRef.current?.offsetWidth ? headingRef.current.offsetWidth + (window.innerWidth * 0.05) : 0;

            // PHASE 1: Scroll 0% - 33% (approx 0vh to 100vh scroll)
            timeline.to(triggerRef.current, {
                x: () => -headingWidth - 100, // Ensure it moves completely off-screen
                ease: "power1.inOut",
                duration: 1 // 1 unit of time
            })
                .to(cardRef.current, {
                    width: "150vw",
                    marginLeft: '-13%',
                    marginRight: 0,
                    borderWidth: 0,
                    ease: "power1.inOut",
                    duration: 1
                }, "<")

                // PHASE 2: Scroll 33% - 100% (next 200vh)
                // Fade out background slightly before split
                .to(bgRef.current, {
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: "none"
                }, ">")

                // Shutter Split
                .to(".mask-left", {
                    xPercent: -101,
                    ease: "power2.inOut",
                    duration: 2 // 2 units of time (2/3rds of timeline)
                }, "<")
                .to(".mask-right", {
                    xPercent: 101,
                    ease: "power2.inOut",
                    duration: 2
                }, "<")
                .to(".marquee-track", {
                    opacity: 0,
                    duration: 0.5
                }, "<")

                // Final Step: Pointer events
                .set(sectionRef.current, { pointerEvents: "none" });
        });

        // MOBILE ANIMATION (max-width: 767px)
        mm.add("(max-width: 767px)", () => {
            // 1. Ensure visibility (just in case)
            gsap.set(sectionRef.current, {
                opacity: 1
            });

            // No scroll animation for mobile - standard scrolling behavior
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full md:h-[100dvh] py-24 flex items-center relative overflow-hidden cursor-none z-40"
        >

            {/* Opaque Background Layer - fades out during split */}
            <div ref={bgRef} className="absolute inset-0 bg-[#f1f1f5] z-0">
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
                </div>
            </div>

            {/* Sticky Wrapper/Trigger Area */}
            <div className="w-full h-full flex items-start md:items-center relative z-10 md:justify-start justify-center pt-20 md:pt-0">
                <div
                    ref={triggerRef}
                    className="flex flex-col md:flex-row flex-nowrap items-center pl-[5vw] pr-[5vw] gap-10 md:gap-20 will-change-transform w-full md:w-auto"
                >
                    {/* Header Card */}
                    <div ref={headingRef} className="shrink-0 w-full md:w-[20vw] text-center md:text-left">
                        <h2 className="text-5xl md:text-[4.5rem] font-black font-maus leading-none text-black">
                            UNIFIED  <br /> ECOSYSTEM
                        </h2>
                        <div className="w-20 h-2 bg-brandturquoise mt-8 mx-auto md:mx-0"></div>
                    </div>

                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} ref={cardRef} project={project} />
                    ))}

                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;