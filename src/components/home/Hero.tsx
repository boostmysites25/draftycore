import { useRef, useLayoutEffect } from 'react'
// import heroImg from '../../assets/images/hero.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplashCursor from '../ui/SplashCursor'
// import Aurora from '../ui/Aurora'
// import Antigravity from '../ui/Antigravity'
import PulseGrid from '../ui/PulseGrid'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

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
                delay: 0.2
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
                                const yOffsets = [10, -50, 15, -40, 15, -30];
                                return baseDrop + (yOffsets[i] * (window.innerWidth < 768 ? 0.6 : 1));
                            },
                            rotation: (i) => {
                                const rots = [-15, 12, -18, 15, -10, 18];
                                return rots[i];
                            },
                            duration: 1.2,
                            ease: "elastic.out(1, 0.3)"
                        });
                },
                onLeaveBack: () => {
                    // Smooth Return to Alignment (Overwrites the elastic bounce)
                    gsap.to(lettersRef.current, {
                        y: 0,
                        rotation: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    });
                }
            });

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={containerRef}
            className='h-screen w-full flex items-center justify-center overflow-hidden relative bg-white'
        >
            {/* Background Animation: Pulse Grid */}
            <div className="absolute inset-0 z-0">
                <PulseGrid
                    gridColor="rgba(200, 200, 200, 0.4)"
                    beamColors={['#FF7A00', '#FFC300', '#FF2D95', '#B8F135', '#2ED9C3']}
                    beamSpeed={2}
                    beamLength={150}
                    gridSize={60}
                    pulseFrequency={0.04}
                />
            </div>

            {/* Splash Cursor for interactivity */}
            <SplashCursor />

            {/* HUD / Floating Elements */}
            {/* <div className="absolute top-8 left-8 z-20 hidden md:flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/50 shadow-sm animate-fade-in-up">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-mono text-slate-600 font-semibold tracking-wider">SYSTEM ONLINE</span>
            </div>

            <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-2 px-4 py-3 bg-white/40 backdrop-blur-md rounded-lg border border-white/50 shadow-lg transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <div>
                    <p className="text-xs font-mono text-slate-500 mb-1">CURRENT VERSION</p>
                    <p className="text-sm font-bold text-slate-800 tracking-wide">v2.5.0-beta</p>
                </div>
            </div> */}

            {/* Main Text Container */}
            <div className="relative z-10 flex items-baseline gap-1 sm:gap-2 flex-wrap justify-center px-4">
                {word.split("").map((char, i) => {
                    // Using Slate-900 for high contrast corporate look
                    const colorClass = "text-slate-900";

                    return (
                        <span
                            key={i}
                            ref={el => lettersRef.current[i] = el}
                            className={`font-octin-college font-bold drop-shadow-2xl inline-block leading-none opacity-0 ${colorClass}`}
                            style={{
                                fontSize: `clamp(5rem, ${15 + (i * 2.25)}vw, 35rem)`
                            }}
                        >
                            {char}
                        </span>
                    )
                })}
            </div>

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40 pointer-events-none z-[5]"></div>
        </div>
    )
}

export default Hero