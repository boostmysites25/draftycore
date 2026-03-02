import { lazy } from "react";
import SmoothScroll from "../components/common/SmoothScroll";

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
  return (
    <SmoothScroll>
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
    </SmoothScroll>
  );
};

export default Marketing;