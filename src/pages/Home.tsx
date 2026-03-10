import { lazy, useEffect, useState } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoAreWe = lazy(() => import("../components/home/WhoAreWe"));
const Preloader = lazy(() => import("../components/Preloader"));
const IndustriesWeFocusUpon = lazy(
  () => import("../components/home/IndustriesWeFocusUpon"),
);
const WhatWeStandFor = lazy(() => import("../components/home/WhatWeStandFor"));
const ScrollingText = lazy(() => import("../components/ui/ScrollingText"));
const NextStep = lazy(() => import("../components/home/NextStep"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const SneakPeek = lazy(() => import("../components/marketing/SneakPeek"));

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (!hasSeenPreloader) {
      setShowPreloader(true);
      sessionStorage.setItem("hasSeenPreloader", "true");
    }
  }, []);

  return (
    <div className="">
      {showPreloader && <Preloader />}
      <Hero delay={showPreloader ? 6 : 0} />
      <div id="about">
        <WhoAreWe />
      </div>
      {/* <div id="work"><FeaturedWork /></div> */}
      <div className="pt-6 pb-10">
        <SneakPeek heading="The Workflow Engine" />
      </div>
      <div id="services">
        <IndustriesWeFocusUpon />
      </div>
      <WhatWeStandFor />
      <ScrollingText className="" buttonLink="/contact" buttonText="Signup" />
      <NextStep />
      <Testimonials />
    </div>
  );
};

export default Home;
