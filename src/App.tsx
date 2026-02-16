import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import SmoothScroll from './components/common/SmoothScroll'
import Contact from './pages/Contact'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <SmoothScroll>
            <Router>
                <Toaster position="top-center" reverseOrder={false} />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </SmoothScroll>
    )
}

export default App
