import FeaturedWork from '../components/home/FeaturedWork'
import Hero from '../components/home/Hero'
import WhoAreWe from '../components/home/WhoAreWe'
import Preloader from '../components/Preloader'
import IndustriesWeFocusUpon from '../components/home/IndustriesWeFocusUpon'
import WhatWeStandFor from '../components/home/WhatWeStandFor'
import ScrollingText from '../components/ui/ScrollingText'
import NextStep from '../components/home/NextStep'
import Testimonials from '../components/home/Testimonials'

const Home = () => {
    return (
        <>
            <Preloader />
            <Hero />
            <WhoAreWe />
            <FeaturedWork />
            <IndustriesWeFocusUpon />
            <WhatWeStandFor />
            <ScrollingText
                text="READY TO LEVEL UP"
                strip1Colors="bg-brandlimegreen text-black"
                strip2Colors="bg-brandyellow text-black"
                className='!bg-[#F5F5F0]'
            />
            <NextStep />
            <Testimonials />
        </>
    )
}

export default Home
