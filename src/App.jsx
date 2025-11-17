import { Suspense, lazy } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";

const Benefits = lazy(() => import("./components/Benefits"));
const Collaboration = lazy(() => import("./components/Collaboration"));
const Services = lazy(() => import("./components/Services"));
const Pricing = lazy(() => import("./components/Pricing"));
const Roadmap = lazy(() => import("./components/Roadmap"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => (
  <div className="w-full min-h-[20rem] animate-pulse rounded-3xl bg-white/5" />
);

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Benefits />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Collaboration />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Roadmap />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
