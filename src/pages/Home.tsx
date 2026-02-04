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
            {/* <Preloader /> */}
            <Hero />
            <WhoAreWe />
            <FeaturedWork />
            <IndustriesWeFocusUpon />
            <Testimonials />
            <WhatWeStandFor />
            <ScrollingText
                text="READY TO LEVEL UP"
                className="my-2"
            />
            <NextStep />
        </div>
    )
}

export default Home
