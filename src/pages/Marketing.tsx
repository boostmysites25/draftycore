import { lazy } from "react";
import SmoothScroll from "../components/common/SmoothScroll";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));
const Steps = lazy(() => import("../components/marketing/Steps"));
const Impact = lazy(() => import("../components/marketing/Impact"));

const Marketing = () => {
  return (
    <SmoothScroll>
      <Hero delay={0} />
      <WhoWeAre />
      <Steps />
      <Impact />
    </SmoothScroll>
  );
};

export default Marketing;