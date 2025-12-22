import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Home = () => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        // GSAP animation on component mount
        const tl = gsap.timeline()

        tl.from(titleRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out'
        })
            .from(subtitleRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
    }, [])

    return (
        // <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        //     <div className="text-center px-4">
        //         <h1
        //             ref={titleRef}
        //             className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
        //         >
        //             Welcome to <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">DraftyCore</span>
        //         </h1>
        //         <p
        //             ref={subtitleRef}
        //             className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
        //         >
        //             A modern Vite + React + TypeScript application with Tailwind CSS, GSAP animations, and React Router
        //         </p>
        //         <div className="mt-12 flex gap-4 justify-center">
        //             <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg">
        //                 Get Started
        //             </button>
        //             <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200 border border-white/20">
        //                 Learn More
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div className='bg-[#2f71ff] min-h-screen'>Home</div>
    )
}

export default Home
