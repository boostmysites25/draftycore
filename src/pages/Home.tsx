import Hero from '../components/home/Hero'
// import HeroReverse from '../components/home/HeroReverse'
import WhoAreWe from '../components/home/WhoAreWe'
import Preloader from '../components/Preloader'

const Home = () => {
    return (
        <>
            <Preloader />
            <Hero />
            <WhoAreWe />
            <div className="h-screen"></div>
        </>
    )
}

export default Home
