import FeaturedWork from '../components/home/FeaturedWork'
import Hero from '../components/home/Hero'
import WhoAreWe from '../components/home/WhoAreWe'
import Preloader from '../components/Preloader'
import IndustriesWeFocusUpon from '../components/home/IndustriesWeFocusUpon'
import WhatWeStandFor from '../components/home/WhatWeStandFor'
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
            <NextStep />
            <Testimonials />
        </>
    )
}

export default Home
