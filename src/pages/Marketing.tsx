import { lazy } from "react";
import SmoothScroll from "../components/common/SmoothScroll";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));
const Steps = lazy(() => import("../components/marketing/Steps"));
const ServicesReveal = lazy(() => import("../components/marketing/ServicesReveal"));
const Impact = lazy(() => import("../components/marketing/Impact"));
// const RecentWorks = lazy(() => import("../components/marketing/RecentWorks"));

const Marketing = () => {
  return (
    <SmoothScroll>
      <Hero delay={0} />
      <WhoWeAre />
      <Steps />
      <Impact />
      <ServicesReveal />
      {/* <RecentWorks /> */}
    </SmoothScroll>
  );
};

export default Marketing;