import { lazy, useState, useEffect, Suspense } from "react";
import SmoothScroll from "../components/common/SmoothScroll";
import MarketingLogin from "../components/marketing/MarketingLogin";

const Hero = lazy(() => import("../components/marketing/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));
const Steps = lazy(() => import("../components/marketing/Steps"));
const ServicesReveal = lazy(() => import("../components/marketing/ServicesReveal"));
const UnifiedVision = lazy(() => import("../components/marketing/UnifiedVision"));
const Impact = lazy(() => import("../components/marketing/Impact"));
const RecentWorks = lazy(() => import("../components/marketing/RecentWorks"));
const OurProcess = lazy(() => import("../components/marketing/OurProcess"));
const Pricing = lazy(() => import("../components/marketing/Pricing"));
const SneakPeek = lazy(() => import("../components/marketing/SneakPeek"));
const NextStep = lazy(() => import("../components/home/NextStep"));

const Marketing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (e.g., from session storage)
    const storedLogin = sessionStorage.getItem("isMarketingLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isMarketingLoggedIn", "true");
  };

  if (!isLoggedIn) {
    return <MarketingLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <SmoothScroll>
      <Suspense fallback={<div className="h-screen w-full bg-white flex items-center justify-center">Loading...</div>}>
        <Hero delay={0} />
        <WhoWeAre />
        <Steps />
        <Impact />
        <ServicesReveal />
        <UnifiedVision />
        <RecentWorks />
        <SneakPeek />
        <OurProcess />
        <Pricing />
        <NextStep />
      </Suspense>
    </SmoothScroll>
  );
};

export default Marketing;