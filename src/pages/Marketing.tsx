import { lazy } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));
const Steps = lazy(() => import("../components/marketing/Steps"));

const Marketing = () => {
  return (
    <>
      <Hero delay={0} />
      <WhoWeAre />
      <Steps />
    </>
  );
};

export default Marketing;