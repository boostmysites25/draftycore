import { useRef, useLayoutEffect, useState } from 'react'
// import heroImg from '../../assets/images/hero.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import SplashCursor from '../ui/SplashCursor'
// import Aurora from '../ui/Aurora'
// import Antigravity from '../ui/Antigravity'
import PulseGrid from '../ui/PulseGrid'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
    const [isAligned, setIsAligned] = useState(false)

    const word = "DRAFTY"

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial setup: hide letters and move them up immediately
            gsap.set(lettersRef.current, { y: -window.innerHeight * 1.5, opacity: 1 });

            // ScrollTrigger 1: ENTER & PIN
            // Letters drop from sky to center. Hero is pinned.
            // Animation 1: ENTER (Auto-play)
            // Letters drop one-by-one with bounce
            gsap.to(lettersRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "bounce.out",
                duration: 1.5,
                delay: 6
            });

            // ScrollTrigger 2: EXIT & SCATTER
            // Triggered using callbacks for custom "Reverse" behavior (Smooth instead of Jerky Elastic)
            ScrollTrigger.create({
                trigger: document.body,
                start: () => window.innerHeight * 0.20, // Trigger at 10% scroll
                invalidateOnRefresh: true,
                onEnter: () => {
                    const baseDrop = window.innerHeight * 0.20;

                    // Play Drop & Bounce
                    const tl = gsap.timeline();
                    tl.to(lettersRef.current, {
                        y: baseDrop,
                        rotation: 0,
                        duration: 0.5,
                        ease: "power2.in"
                    })
                        .to(lettersRef.current, {
                            y: (i) => {
                                setIsAligned(false);
                                const yOffsets = [10, -50, 15, -40, 25, 40];
                                return baseDrop + (yOffsets[i] * (window.innerWidth < 768 ? 0.6 : 1));
                            },
                            rotation: (i) => {
                                const rots = [-15, 12, -18, 15, -10, 18];
                                return rots[i];
                            },
                            duration: 1.2,
                            ease: "elastic.out(1, 0.3)"
                        })
                },
                onLeaveBack: () => {
                    setIsAligned(true);
                    // Smooth Return to Alignment (Overwrites the elastic bounce)
                    gsap.to(lettersRef.current, {
                        y: 0,
                        rotation: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    })
                }
            });

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={containerRef}
            className='h-screen w-full flex items-center justify-center overflow-hidden relative bg-[#F5F5F0]'
        >
            {/* Background Animation: Pulse Grid with lower opacity for subtlety */}
            <div className="absolute inset-0 z-0 opacity-40">
                <PulseGrid
                    gridColor="rgba(0, 0, 0, 0.08)"
                    beamColors={['#FF7A00', '#FFC300', "#FF2D95", '#B8F135', '#2ED9C3']}
                    beamSpeed={1.5}
                    beamLength={100}
                    gridSize={80}
                    pulseFrequency={0.10}
                />
            </div>

            {/* Splash Cursor for interactivity */}
            {/* <SplashCursor /> */}

            {/* Architectural HUD Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 mix-blend-multiply">
                {/* Top Left Status Box */}
                <div className="absolute top-20 left-8 border-l-2 border-black pl-3 animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brandorange animate-pulse"></div>
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black/60 uppercase">System Status</span>
                    </div>
                    <div className="text-sm font-bold tracking-widest text-black/90">ONLINE // READY</div>
                </div>

                {/* Top Right Coordinates */}
                <div className="absolute top-8 right-8 text-right hidden md:block animate-fade-in-up animation-delay-200">
                    <p className="text-[10px] font-mono text-black/40 mb-1">GRID REFERENCE</p>
                    <p className="text-sm font-mono font-bold text-black/70">X: 04.92.11 <br />Y: 08.22.90</p>
                </div>

                {/* Bottom Left Technical Marker */}
                <div className="absolute bottom-12 left-12 hidden md:flex items-center gap-4 opacity-60">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-[spin_10s_linear_infinite]">
                        <circle cx="20" cy="20" r="18" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="20" y1="0" x2="20" y2="40" stroke="black" strokeWidth="1" />
                        <line x1="0" y1="20" x2="40" y2="20" stroke="black" strokeWidth="1" />
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono tracking-widest font-bold">SCALE 1:1</span>
                        <span className="text-[10px] font-mono text-black/50">DRAFTING ENGINE</span>
                    </div>
                </div>

                {/* Bottom Right Box */}
                <div className="absolute bottom-12 right-12 hidden md:block border border-black/10 bg-white/50 backdrop-blur-sm p-4">
                    <div className="flex justify-between items-center w-32 border-b border-black/10 pb-2 mb-2">
                        <span className="text-[9px] font-mono text-black/40">CPU</span>
                        <span className="text-[9px] font-mono font-bold">12%</span>
                    </div>
                    <div className="flex justify-between items-center w-32">
                        <span className="text-[9px] font-mono text-black/40">MEM</span>
                        <span className="text-[9px] font-mono font-bold">OPTIMIZED</span>
                    </div>
                </div>

                {/* Decorative Lines */}
                <div className="absolute top-1/2 left-8 w-1 h-24 bg-black/5 -translate-y-1/2 hidden lg:block"></div>
                <div className="absolute top-1/2 right-8 w-1 h-24 bg-black/5 -translate-y-1/2 hidden lg:block"></div>

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] border border-black/5 rounded-full z-0 pointer-events-none"></div>
            </div>

            {/* Main Text Container */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap justify-center px-4 relative">
                    {/* Measurement Line Above Text */}
                    <div className="absolute -top-12 left-0 w-full hidden md:flex justify-between items-end border-b border-black/20 pb-2 px-10">
                        <span className="h-2 w-[1px] bg-black/30"></span>
                        <span className="text-[10px] font-mono text-black/40 tracking-widest">1200mm</span>
                        <span className="h-2 w-[1px] bg-black/30"></span>
                    </div>

                    {word.split("").map((char, i) => {
                        // High contrast slate-900 for that bold architectural feel
                        const colorClass = "text-slate-900";

                        return (
                            <span
                                key={i}
                                ref={el => lettersRef.current[i] = el}
                                className={`font-octin-college font-bold drop-shadow-sm inline-block leading-none opacity-0 ${colorClass}`}
                                style={{
                                    fontSize: `clamp(5rem, ${15 + (i * 2.10)}vw, 35rem)`
                                }}
                            >
                                {char}
                            </span>
                        )
                    })}
                </div>

                {/* Sub-headline */}
                <div className={isAligned ? "mt-8 md:mt-2 overflow-hidden duration-500" : "mt-8 md:mt-2 overflow-hidden opacity-0 duration-500"}>
                    <p className="text-sm md:text-lg font-mono text-black/60 tracking-widest uppercase animate-fade-in-up animation-delay-500">
                        The Drafting Engine
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero