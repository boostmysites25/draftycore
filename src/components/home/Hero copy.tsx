import { useRef, useLayoutEffect } from 'react'
import heroImg from '../../assets/images/hero.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

    const word = "DRAFTY"

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Initial setup: hide letters and move them up immediately
            gsap.set(lettersRef.current, { y: -window.innerHeight * 1.5, opacity: 0 });

            // ScrollTrigger 1: ENTER & PIN
            // Letters drop from sky to center. Hero is pinned.
            const tlEnter = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=100%", // Pin for 1 screen height
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            tlEnter.to(lettersRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power2.out",
                duration: 1
            });


            // ScrollTrigger 2: EXIT & SCATTER
            // Used absolute scroll values to avoid pinning conflicts.
            // Pin ends at 1.0 viewport height.
            // We trigger this drop at 1.25 (25% scrolled out).
            // ScrollTrigger 2: EXIT & SCATTER
            // Triggered using callbacks for custom "Reverse" behavior (Smooth instead of Jerky Elastic)
            ScrollTrigger.create({
                trigger: document.body,
                start: () => window.innerHeight * 1.10,
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
            className='h-screen flex items-center justify-center overflow-hidden relative'
            style={{
                backgroundImage: `url(${heroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-white/70"></div>

            <div className="relative z-10 flex items-baseline gap-1 sm:gap-2 flex-wrap justify-center px-4">
                {word.split("").map((char, i) => (
                    <span
                        key={i}
                        ref={el => lettersRef.current[i] = el}
                        className="font-octin-college font-bold text-secondary drop-shadow-2xl inline-block leading-none opacity-0" // Added opacity-0 class for fallback
                        style={{
                            fontSize: `clamp(5rem, ${15 + (i * 2)}vw, 35rem)` // Adjusted scaling: Starts big, grows steadily but not insanely
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Hero 