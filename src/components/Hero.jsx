// Hero.jsx — Ultra-Optimized Version (GSAP Entrance, No Draggable Components)
import { useRef, useEffect } from "react";
import mockup from "../assets/hero/mockup.webp";
import Button from "./Button";
import Section from "./Sections";
import { BackgroundCircles } from "./design/Hero";
import CompanyLogos from "./CompanyLogos";
import OptimizedImage from "./OptimizedImage";
import { loadGsap } from "../utils/gsapLoader";
const Hero = () => {
  const containerRef = useRef(null);
  const mockupRef = useRef(null);
  const sidebarRef = useRef(null);
  const dividerRef = useRef(null);

  const showSidebar = true;

  // -----------------------------
  //      GSAP ENTRANCE EFFECTS
  // -----------------------------
  useEffect(() => {
    let ctx;
    let cancelled = false;

    const animate = async () => {
      const gsap = await loadGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.set(
          [mockupRef.current, sidebarRef.current, dividerRef.current],
          {
            opacity: 0,
            y: 20,
          }
        );

        const tl = gsap.timeline({ delay: 0.2, ease: "power3.out" });

        tl.to(".hero-title", { opacity: 1, y: 0, duration: 0.6 })
          .to(".hero-sub", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
          .to(dividerRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to(
            mockupRef.current,
            { opacity: 1, y: 0, scale: 1, duration: 0.9 },
            "-=0.5"
          )
          .to(
            sidebarRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.7"
          );
      });
    };

    animate();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Section className="pt-[12rem] relative overflow-hidden" id="hero">
      <BackgroundCircles />

      {/* Neon layered background */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-b from-[#0a0a1f] via-[#1a0a2e] to-[#0a0a1f]" />
      <div className="absolute inset-0 -z-40 bg-[radial-gradient(circle_at_50%_40%,rgba(138,43,226,0.22),transparent_55%)]" />
      <div
        className="absolute inset-0 -z-30 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(147,51,234,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(147,51,234,0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative" ref={containerRef}>
        {/* ---------- TITLE ---------- */}
        <div className="relative z-30 max-w-[62rem] mx-auto text-center mb-16">
          <div className="hero-title text-xs text-purple-300/80 tracking-wider uppercase mb-4">
            Build Faster — Launch Sooner
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Launch Your{" "}
            <span className="hero-sub text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              Rapid MVP
            </span>{" "}
            in Days
          </h1>

          <p className="max-w-3xl mx-auto text-white/60 text-lg mb-8">
            Convert your idea into a fully functional MVP with premium UI,
            scalable architecture and modern engineering.
          </p>

          <div className="flex justify-center gap-4">
            <Button href="#pricing" white>
              Start Building
            </Button>

            <Button
              href="#services"
              className="!bg-white/10 !text-white hover:!bg-white/20"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Slim Divider */}
        <div className="flex justify-center mb-12">
          <div
            ref={dividerRef}
            className="opacity-0 translate-y-4 w-[68%] h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full shadow-[0_0_12px_rgba(147,51,234,0.8)]"
          />
        </div>

        {/* Builder Mockup */}
        <div className="relative flex justify-center pb-20">
          <div className="relative w-full max-w-[90rem] px-4">
            {/* Sidebar */}
            {showSidebar && (
              <div
                ref={sidebarRef}
                className="opacity-0 translate-y-4 absolute top-8 left-8 z-20 w-44 h-[70%] bg-[#0f0520]/95 backdrop-blur-xl rounded-2xl border border-purple-500/40 p-4 shadow-[0_0_40px_rgba(147,51,234,0.4)]"
              >
                <div className="text-sm font-bold mb-5 text-purple-300">
                  Pages
                </div>
                <ul className="space-y-3 text-purple-200">
                  <li className="py-3 px-3 bg-purple-600/30 rounded-lg border border-purple-400/30">
                    🏠 Home
                  </li>
                  <li className="py-3 px-3 bg-purple-900/20 rounded-lg hover:border-purple-500/20 border border-transparent cursor-pointer transition">
                    📊 Dashboard
                  </li>
                  <li className="py-3 px-3 bg-purple-900/20 rounded-lg hover:border-purple-500/20 border border-transparent cursor-pointer transition">
                    ⚙️ Settings
                  </li>
                </ul>
              </div>
            )}

            {/* MOCKUP FRAME */}
            <div
              ref={mockupRef}
              className="opacity-0 translate-y-4 scale-[0.96] relative mx-auto bg-gradient-to-br from-[#0a0318] to-[#150628] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(147,51,234,0.4)] border border-purple-500/40"
              style={{
                width: 1100,
                height: 600,
              }}
            >
              {/* Browser bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#1a0a2e] to-[#0f0520] flex items-center px-4 gap-3 text-sm text-purple-200 border-b border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>

                <div className="ml-4 font-bold text-purple-100 flex items-center gap-2">
                  <span className="text-purple-400">⚡</span> Rapid MVP Builder
                </div>
              </div>

              {/* Mockup image */}
              <OptimizedImage
                src={mockup}
                alt="MVP Builder Interface"
                className="w-full h-full object-cover pointer-events-none"
                priority
                decoding="async"
              />
            </div>
          </div>
        </div>
        <CompanyLogos className="hidden relative z-10 mt-5 lg:block" />
      </div>
      {/* Company Logos */}
    </Section>
  );
};

export default Hero;
