import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { useLocation } from "react-router-dom"
import logo from '../assets/images/logo.gif'
import gsap from "gsap"

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
]

const Navbar = () => {
    const { pathname } = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // GSAP Refs
    const menuRef = useRef<HTMLDivElement>(null)
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const bgLineRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const [isHovering, setIsHovering] = useState(false);
    const [staticLogo, setStaticLogo] = useState<string | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = logo;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                setStaticLogo(canvas.toDataURL());
            }
        };
    }, []);

    // Initial Setup
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(menuRef.current, { xPercent: 100, autoAlpha: 0 });
        });
        return () => ctx.revert();
    }, []);

    // Menu Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isMenuOpen) {
                // Document body scroll lock
                document.body.style.overflow = 'hidden';

                const tl = gsap.timeline();

                tl.to(menuRef.current, {
                    xPercent: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power4.inOut"
                })
                    .fromTo(bgLineRefs.current,
                        { scaleY: 0, transformOrigin: "top" },
                        { scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power3.inOut" },
                        "-=0.4"
                    )
                    .fromTo(linkRefs.current,
                        { y: 100, opacity: 0, rotate: 5 },
                        { y: 0, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
                        "-=0.4"
                    );

            } else {
                document.body.style.overflow = '';

                const tl = gsap.timeline();

                tl.to(linkRefs.current, {
                    y: -50,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power2.in"
                })
                    .to(menuRef.current, {
                        xPercent: 100,
                        autoAlpha: 0,
                        duration: 0.6,
                        ease: "power4.inOut"
                    }, "-=0.2");
            }
        });
        return () => ctx.revert();
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-white/5" : ""}`}>
                <div className="wrapper py-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 items-center">
                        {/* Logo Section */}
                        <div
                            className="relative z-50 w-fit"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* Static/Gif Logo Logic */}
                            <img src={isHovering || !staticLogo ? logo : staticLogo} alt="Logo" className="w-[6rem] sm:w-[8rem] h-auto object-contain cursor-pointer" />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex justify-center w-full">
                            <ul className="flex gap-10">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className={`font-big-shoulders font-extrabold uppercase relative flex items-center gap-2 text-primary hover:text-brandorange transition-colors ${pathname === link.href ? "border-b-2 border-brandorange" : ""}`}>
                                            <span className="w-1 h-1 bg-brandorange rotate-45" />
                                            {link.name}
                                            <span className="w-1 h-1 bg-brandorange rotate-45" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex justify-end md:hidden z-50 relative">
                            <button onClick={toggleMenu} className="group flex flex-col items-end gap-1.5 p-2 cursor-pointer">
                                <span className={`h-[3px] bg-brandorange transition-all duration-300 ${isMenuOpen ? "w-8 rotate-45 translate-y-2.5" : "w-8"}`}></span>
                                <span className={`h-[3px] bg-brandorange transition-all duration-300 ${isMenuOpen ? "w-8 opacity-0" : "w-6 group-hover:w-8"}`}></span>
                                <span className={`h-[3px] bg-brandorange transition-all duration-300 ${isMenuOpen ? "w-8 -rotate-45 -translate-y-2" : "w-4 group-hover:w-8"}`}></span>
                            </button>
                        </div>

                        {/* Empty div for grid balance on desktop if needed, or actions */}
                        <div className="hidden md:block"></div>
                    </div>
                </div>
            </nav>

            {/* Futuristic Offcanvas Menu - Portaled to Body to avoid stacking context issues */}
            {createPortal(
                <div
                    ref={menuRef}
                    className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center overflow-hidden invisible"
                >
                    {/* Close Button */}
                    <div className="absolute top-6 right-6 z-50">
                        <button onClick={() => setIsMenuOpen(false)} className="group p-2 cursor-pointer">
                            <span className="block w-8 h-[3px] bg-secondary rotate-45 translate-y-[1.5px] transition-transform duration-300 group-hover:rotate-180"></span>
                            <span className="block w-8 h-[3px] bg-secondary -rotate-45 -translate-y-[1.5px] transition-transform duration-300 group-hover:-rotate-180"></span>
                        </button>
                    </div>

                    {/* Background Tech Lines */}
                    <div className="absolute inset-0 pointer-events-none flex justify-around opacity-10">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div
                                key={i}
                                ref={el => bgLineRefs.current[i] = el}
                                className="w-[1px] h-full bg-secondary"
                            ></div>
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col gap-8 text-center">
                        {links.map((link, i) => (
                            <a
                                key={link.name}
                                href={link.href}
                                ref={el => linkRefs.current[i] = el}
                                onClick={() => setIsMenuOpen(false)}
                                className="font-octin-college text-5xl sm:text-7xl font-bold text-secondary hover:text-brandorange transition-all duration-300 uppercase tracking-wider relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-brandorange transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Decorative Footer Info */}
                    <div className="absolute bottom-10 text-secondary/50 font-big-shoulders tracking-[0.2em] text-sm">
                        FUTURE READY • SYSTEM ONLINE
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}

export default Navbar