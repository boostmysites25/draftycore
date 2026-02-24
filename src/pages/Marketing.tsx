import { lazy } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));
const Steps = lazy(() => import("../components/marketing/Steps"));
const ServicesReveal = lazy(() => import("../components/marketing/ServicesReveal"));
const Impact = lazy(() => import("../components/marketing/Impact"));

const Marketing = () => {
  return (
    <>
      <Hero delay={0} />
      <WhoWeAre />
      <Steps />
      <Impact />
      <ServicesReveal />
    </>
  );
};

export default Marketing;