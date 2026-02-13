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
            <div id="about"><WhoAreWe /></div>
            <div id="work"><FeaturedWork /></div>
            <div id="services"><IndustriesWeFocusUpon /></div>
            <WhatWeStandFor />
            <ScrollingText className="" buttonLink="https://forms.zohopublic.in/drafty1/form/Complaints/formperma/6zDGITOYehhdgPUJSAsth00PEcIaect4hiwr7E8o3jc" buttonText="Signup" />
            <NextStep />
            <Testimonials />
        </div>
    )
}

export default Home
