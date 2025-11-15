import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

/* ----------------------------------
   🚀 RAPID BUILDING BLOCKS
---------------------------------- */
const BuildingBlocks = () => {
  const blocks = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {blocks.map((_, i) => (
        <div
          key={i}
          className="
            absolute w-20 h-20 
            border-2 border-purple-500/20
            rounded-lg
            animate-build-float
          "
          style={{
            top: `${20 + i * 6}%`,
            left: `${10 + i * 7}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + (i % 3)}s`,
            transform: `rotate(${i * 30}deg)`,
          }}
        />
      ))}
    </div>
  );
};

/* ----------------------------------
   ⚡ CODE PARTICLES (MOVING FAST)
---------------------------------- */
const CodeParticles = () => {
  const symbols = [
    "</",
    "/>",
    "{}",
    "[]",
    "()",
    "==",
    "=>",
    "!=",
    "fn",
    "if",
    "const",
    "let",
  ];
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <div
          key={i}
          className="
            absolute text-purple-300 font-mono text-base font-bold
            animate-code-stream
            drop-shadow-[0_0_8px_rgba(200,100,255,0.8)]
          "
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {symbols[i % symbols.length]}
        </div>
      ))}
    </div>
  );
};

/* ----------------------------------
   🎯 TARGET RINGS (MVP FOCUS)
---------------------------------- */
const FocusRings = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Expanding ring 1 */}
      <div
        className="
        absolute w-[40rem] h-[40rem] rounded-full 
        border-2 border-purple-500/30 
        animate-expand-ring
        shadow-[0_0_60px_10px_rgba(150,60,255,0.2)]
      "
        style={{ animationDelay: "0s" }}
      />

      {/* Expanding ring 2 */}
      <div
        className="
        absolute w-[40rem] h-[40rem] rounded-full 
        border-2 border-purple-400/20 
        animate-expand-ring
      "
        style={{ animationDelay: "1.5s" }}
      />

      {/* Expanding ring 3 */}
      <div
        className="
        absolute w-[40rem] h-[40rem] rounded-full 
        border-2 border-indigo-400/15 
        animate-expand-ring
      "
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
};

/* ----------------------------------
   🌟 SPARKLE BURSTS
---------------------------------- */
const SparkleBursts = () => {
  const sparkles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((_, i) => (
        <div
          key={i}
          className="
            absolute w-1 h-1 rounded-full 
            bg-purple-300/60 
            animate-sparkle-burst
            shadow-[0_0_8px_2px_rgba(200,100,255,0.6)]
          "
          style={{
            top: "50%",
            left: "50%",
            animationDelay: `${i * 0.3}s`,
            transform: `rotate(${i * 18}deg) translateX(0)`,
          }}
        />
      ))}
    </div>
  );
};

/* ----------------------------------
   💫 RAPID VELOCITY LINES
---------------------------------- */
const VelocityLines = () => {
  const lines = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {lines.map((_, i) => (
        <div
          key={i}
          className="
            absolute h-[2px] w-40
            bg-gradient-to-r from-transparent via-purple-400/40 to-transparent
            animate-velocity-line
          "
          style={{
            top: `${15 + i * 10}%`,
            left: "-10rem",
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${1.5 + (i % 3) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ----------------------------------
   🔷 GEOMETRIC GRID PATTERN
---------------------------------- */
const GeometricGrid = () => {
  return (
    <div
      className="
      absolute inset-0 opacity-[0.12]
      bg-[linear-gradient(90deg,rgba(120,60,255,0.15)_1px,transparent_1px),linear-gradient(rgba(120,60,255,0.15)_1px,transparent_1px)]
      bg-[size:40px_40px]
      [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]
    "
    />
  );
};

/* ----------------------------------
   🌑 CENTRAL ENERGY CORE (MVP HUB)
---------------------------------- */
const MVPCore = () => {
  return (
    <>
      {/* Main glow */}
      <div
        className="
        absolute top-1/2 left-1/2 
        w-[35rem] h-[35rem] 
        -translate-x-1/2 -translate-y-1/2
        rounded-full 
        bg-[radial-gradient(circle,rgba(150,60,255,0.6),rgba(50,0,80,0.1))]
        blur-[120px]
        animate-pulse-gentle
      "
      />

      {/* Inner bright core */}
      <div
        className="
        absolute top-1/2 left-1/2 
        w-[15rem] h-[15rem] 
        -translate-x-1/2 -translate-y-1/2
        rounded-full 
        bg-[radial-gradient(circle,rgba(200,100,255,0.8),transparent)]
        blur-[60px]
        animate-pulse-fast
      "
      />
    </>
  );
};

/* ----------------------------------
   🎨 FLOATING FEATURE ORBS
---------------------------------- */
const FeatureOrbs = ({ mounted, parallaxRef }) => {
  const orbClasses = `
    rounded-full transition-all duration-[1200ms] ease-out 
    shadow-[0_0_40px_12px_rgba(150,60,255,0.4)]
    animate-bounce-slow
  `;

  return (
    <MouseParallax strength={0.15} parallaxContainerRef={parallaxRef}>
      {/* Orb 1 - Speed */}
      <div className="absolute bottom-1/2 left-1/2 rotate-[30deg] w-1 h-1 overflow-visible">
        <div
          className={`
            w-12 h-12 -ml-6 -mt-56 bg-gradient-to-br from-purple-300 to-fuchsia-600 
            ${orbClasses}
            ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        />
      </div>

      {/* Orb 2 - Efficiency */}
      <div className="absolute bottom-1/2 left-1/2 -rotate-[35deg] w-1 h-1 overflow-visible">
        <div
          className={`
            w-10 h-10 -ml-5 -mt-[20rem] bg-gradient-to-br from-indigo-300 to-purple-700 
            ${orbClasses}
            ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        />
      </div>

      {/* Orb 3 - Innovation */}
      <div className="absolute bottom-1/2 left-1/2 rotate-[65deg] w-1 h-1 overflow-visible">
        <div
          className={`
            w-14 h-14 -ml-7 -mt-[16rem] bg-gradient-to-br from-cyan-300 to-blue-700 
            ${orbClasses}
            ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        />
      </div>

      {/* Orb 4 - Scalability */}
      <div className="absolute bottom-1/2 left-1/2 rotate-[150deg] w-1 h-1 overflow-visible">
        <div
          className={`
            w-9 h-9 -ml-4 -mt-64 bg-gradient-to-br from-violet-300 to-purple-600 
            ${orbClasses}
            ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        />
      </div>
    </MouseParallax>
  );
};

/* ----------------------------------
   🌌 PREMIUM MVP CREATION BACKGROUND
---------------------------------- */
export const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="
      absolute -top-[42rem] left-1/2 w-[95rem] aspect-square 
      -translate-x-1/2 overflow-visible 
      md:-top-[38rem] xl:-top-[32rem]
      pointer-events-none
    "
    >
      {/* ⭐ Layer 1: Central MVP Hub */}
      <MVPCore />

      {/* ⭐ Layer 2: Focus Rings (expanding targets) */}
      <FocusRings />

      {/* ⭐ Layer 3: Velocity Lines (speed) */}
      <VelocityLines />

      {/* ⭐ Layer 4: Code Particles */}
      <CodeParticles />

      {/* ⭐ Layer 5: Building Blocks */}
      <BuildingBlocks />

      {/* ⭐ Layer 6: Sparkle Bursts */}
      <SparkleBursts />

      {/* ⭐ Layer 7: Geometric Grid */}
      <GeometricGrid />

      {/* ⭐ Layer 8: Feature Orbs */}
      <FeatureOrbs mounted={mounted} parallaxRef={parallaxRef} />
    </div>
  );
};
