import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Preloader from './components/Preloader'
import Layout from './components/Layout'

function App() {
    return (
        <>
            {/* <Preloader /> */}
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
