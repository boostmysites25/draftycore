import { useRef, useLayoutEffect } from 'react'
import heroImg from '../../assets/images/hero.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroReverse = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

    const word = "DRAFTY"

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Initial setup: hide drop letters from above
            gsap.set(lettersRef.current, { y: -window.innerHeight * 1.5, opacity: 0 });

            // Setup Constants
            const chaosY = [15, -40, 20, -30, 25, -20];
            const chaosRot = [-15, 12, -18, 15, -10, 18];
            const dropDist = window.innerHeight * 0.35 - 50; // Drop to bottom amount

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%", // Increased for the extra step
                    scrub: 1,
                    pin: true,
                }
            })

            // Phase 1: Drop in MISALIGNED (Chaos at Center)
            tl.to(lettersRef.current, {
                y: (i) => chaosY[i] * (window.innerWidth < 768 ? 0.6 : 1),
                rotation: (i) => chaosRot[i],
                x: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power2.out",
                duration: 1
            })

                // Phase 2: Drop to BOTTOM (Still Chaotic)
                .to(lettersRef.current, {
                    y: (i) => (chaosY[i] * (window.innerWidth < 768 ? 0.6 : 1)) + dropDist,
                    duration: 1,
                    ease: "power1.inOut"
                })

                // Phase 3: Snap to ALIGNMENT (At Bottom)
                .to(lettersRef.current, {
                    y: dropDist, // Everyone aligns at the bottom level
                    rotation: 0,
                    x: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.4)",
                })

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
                        className="font-octin-college font-bold text-secondary drop-shadow-2xl inline-block leading-none opacity-0"
                        style={{
                            fontSize: `clamp(5rem, ${15 + (i * 2)}vw, 35rem)`
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default HeroReverse
