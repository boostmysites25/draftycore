import FeaturedWork from '../components/home/FeaturedWork'
import Hero from '../components/home/Hero'
// import HeroReverse from '../components/home/HeroReverse'
import WhoAreWe from '../components/home/WhoAreWe'
import Preloader from '../components/Preloader'
import IndustriesWeFocusUpon from '../components/home/IndustriesWeFocusUpon'

const Home = () => {
    return (
        <>
            <Preloader />
            <Hero />
            <WhoAreWe />
            <FeaturedWork />
            <IndustriesWeFocusUpon />
        </>
    )
}

export default Home
