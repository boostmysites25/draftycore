import { lazy } from "react";

const Hero = lazy(() => import("../components/home/Hero"));
const WhoWeAre = lazy(() => import("../components/marketing/WhoWeAre"));

const Marketing = () => {
  return (
    <>
      <Hero delay={0} />
      <WhoWeAre />
    </>
  );
};

export default Marketing;
