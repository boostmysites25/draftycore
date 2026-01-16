import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import SmoothScroll from './components/common/SmoothScroll'

function App() {
    return (
        <SmoothScroll>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </Router>
        </SmoothScroll>
    )
}

export default App
