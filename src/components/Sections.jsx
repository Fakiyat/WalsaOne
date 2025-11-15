import { useEffect, useRef } from "react";
import SectionSvg from "../assets/svg/SectionSvg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Fade + slight rise when entering screen
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`
        relative overflow-hidden
        ${
          customPaddings ||
          `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`
        }
        ${className || ""}
      `}
    >
      {/* PREMIUM BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#0f0a1d] via-[#0b0716] to-[#05030d] opacity-90" />

      {/* Soft neon border light */}
      <div className="absolute inset-0 -z-10 border border-white/5 rounded-3xl pointer-events-none shadow-[0_0_40px_rgba(125,80,255,0.15)]" />

      {/* CORNER GLOWS */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl -z-10" />

      {/* FLOATING PARTICLES */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-500/40 blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${
                5 + Math.random() * 3
              }s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Particle animation */}
      <style>
        {`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-18px); opacity: 0.8; }
        }
    `}
      </style>

      {/* ORIGINAL CONTENT */}
      {children}

      {/* Vertical borders */}
      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-white/10 pointer-events-none md:block lg:left-7.5 xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-white/10 pointer-events-none md:block lg:right-7.5 xl:right-10" />

      {/* TOP cross line */}
      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-white/10 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
};

export default Section;
