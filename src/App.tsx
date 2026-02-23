import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SmoothScroll from "./components/common/SmoothScroll";
import { Toaster } from "react-hot-toast";
import { lazy } from "react";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Login = lazy(() => import("./pages/Login"));
const Marketing = lazy(() => import("./pages/Marketing"));

function App() {
  return (
    // <SmoothScroll>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    // </SmoothScroll>
  );
}

export default App;
