import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

const CircleCursor = forwardRef<HTMLDivElement, { isActive: boolean }>(({ isActive }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile || !internalRef.current) return;

        gsap.to(internalRef.current, {
            autoAlpha: isActive ? 1 : 0,
            duration: 0.3,
            overwrite: 'auto'
        });
    }, [isActive]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile || !internalRef.current) return;

        const xToCursor = gsap.quickTo(internalRef.current, "x", { duration: 0.2, ease: "power3" });
        const yToCursor = gsap.quickTo(internalRef.current, "y", { duration: 0.2, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div
            ref={internalRef}
            className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-black/50 pointer-events-none z-50 hidden md:block -translate-x-1/2 -translate-y-1/2 opacity-0 visibility-hidden"
        ></div>
    );
});

CircleCursor.displayName = "CircleCursor";
export { CircleCursor };

const FeaturedCursor = forwardRef<HTMLDivElement, { isActive: boolean }>(({ isActive }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile || !internalRef.current) return;

        gsap.to(internalRef.current, {
            autoAlpha: isActive ? 1 : 0,
            duration: 0.3,
            overwrite: 'auto'
        });
    }, [isActive]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile || !internalRef.current) return;

        const xToCursor = gsap.quickTo(internalRef.current, "x", { duration: 0.2, ease: "power3" });
        const yToCursor = gsap.quickTo(internalRef.current, "y", { duration: 0.2, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div
            ref={internalRef}
            className="fixed top-0 left-0 w-20 h-20 bg-white text-black rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center font-bold text-xs tracking-widest -translate-x-1/2 -translate-y-1/2 mix-blend-difference opacity-0 visibility-hidden"
        >

        </div>
    );
});

FeaturedCursor.displayName = "FeaturedCursor";
export { FeaturedCursor };
