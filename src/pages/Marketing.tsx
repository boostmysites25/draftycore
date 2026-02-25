import { lazy } from "react";
import SmoothScroll from "../components/common/SmoothScroll";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));
const Steps = lazy(() => import("../components/marketing/Steps"));
const ServicesReveal = lazy(() => import("../components/marketing/ServicesReveal"));
const UnifiedVision = lazy(() => import("../components/marketing/UnifiedVision"));
const Impact = lazy(() => import("../components/marketing/Impact"));
const RecentWorks = lazy(() => import("../components/marketing/RecentWorks"));
const OurProcess = lazy(() => import("../components/marketing/OurProcess"));
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
      <OurProcess />
      <SneakPeek />
      <NextStep />
    </SmoothScroll>
  );
};

export default Marketing;