import { lazy } from "react"

const FeaturedWork = lazy(() => import('../components/home/FeaturedWork'))
const Hero = lazy(() => import('../components/home/Hero'))
const WhoAreWe = lazy(() => import('../components/home/WhoAreWe'))
const Preloader = lazy(() => import('../components/Preloader'))
const IndustriesWeFocusUpon = lazy(() => import('../components/home/IndustriesWeFocusUpon'))
const WhatWeStandFor = lazy(() => import('../components/home/WhatWeStandFor'))
const ScrollingText = lazy(() => import('../components/ui/ScrollingText'))
const NextStep = lazy(() => import('../components/home/NextStep'))
const Testimonials = lazy(() => import('../components/home/Testimonials'))

const Home = () => {
    return (
        <div className="">
            <Preloader />
            <Hero />
            <WhoAreWe />
            <FeaturedWork />
            <IndustriesWeFocusUpon />
            <WhatWeStandFor />
            <ScrollingText className="" buttonLink="/" buttonText="Signup" />
            <NextStep />
            <Testimonials />
        </div>
    )
}

export default Home
