import { useRef, useLayoutEffect } from 'react'
import heroImg from '../../assets/images/hero.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroCopy = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

    const word = "DRAFTY"

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Initial setup: hide letters and move them up immediately
            gsap.set(lettersRef.current, { y: -window.innerHeight * 1.5, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // Start when top of hero hits top of viewport
                    end: "+=300%", // Increased scroll distance to accommodate second phase
                    scrub: 1, // Smooth scrubbing
                    pin: true, // Pin the hero section during animation
                }
            })

            // Phase 1: Drop in straight and CENTER
            tl.to(lettersRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power2.out",
                duration: 1
            })

                // Phase 2: Move DOWN together + Jump/Scatter
                // This happens as the user scrolls further down
                .to(lettersRef.current, {
                    y: (i) => {
                        // Base move down (e.g., 20vh) + the scatter offsets
                        const baseDrop = window.innerHeight * 0.2; // Move down by 20% of screen
                        const yOffsets = [15, -40, 20, -30, 25, -20];
                        return baseDrop + (yOffsets[i] * (window.innerWidth < 768 ? 0.6 : 1));
                    },
                    rotation: (i) => {
                        const rots = [-15, 12, -18, 15, -10, 18];
                        return rots[i];
                    },
                    x: 0,
                    scale: 1,
                    duration: 0.5, // Faster jump
                    ease: "elastic.out(1, 0.4)",
                }, "+=0.5") // Wait a bit (pin duration) before dropping/scattering
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
            <div className="absolute inset-0 bg-brandlimegreen/40"></div>

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

export default HeroCopy 