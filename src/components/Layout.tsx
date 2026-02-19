import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen w-screen max-w-[100vw] overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout