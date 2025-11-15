import robot from "../assets/hero/robot.jpg";
import Button from "./Button";
import Section from "./Sections";
import { BackgroundCircles } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);
  const { scrollY } = useScroll();

  // Smooth framer scroll transforms
  const tilt = useTransform(scrollY, [0, 400], [0, -22]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.85]);
  const lift = useTransform(scrollY, [0, 300], [0, -20]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.35]);

  // ---------- MOUSE MOTION (for hover tilt + inner parallax) ----------
  // normalized 0..1 motion values updated on mouse move inside the mockup area
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // derive hover tilt from mouse (centered -0.5..0.5 → degrees)
  const hoverTiltRaw = useTransform(mouseY, [0, 1], [18, -18]); // vertical -> rotateX component
  const hoverYawRaw = useTransform(mouseX, [0, 1], [-18, 18]); // horizontal -> rotateY

  // smooth springs to avoid jitter at high mouse speed
  const hoverTilt = useSpring(hoverTiltRaw, { stiffness: 220, damping: 26 });
  const hoverYaw = useSpring(hoverYawRaw, { stiffness: 220, damping: 26 });

  // combine scroll tilt + hover tilt for final rotateX
  // useTransform accepts arrays to create derived value
  const rotateX = useTransform([tilt, hoverTilt], ([t, h]) => t + h);
  const rotateY = useSpring(hoverYaw, { stiffness: 180, damping: 22 });

  // ---------- Inner layer transforms (parallax inside screen) ----------
  // different multipliers create depth (foreground moves more)
  const layer1X = useTransform(mouseX, [0, 1], [-6, 6]); // subtle
  const layer1Y = useTransform(mouseY, [0, 1], [-4, 4]);

  const layer2X = useTransform(mouseX, [0, 1], [-12, 12]);
  const layer2Y = useTransform(mouseY, [0, 1], [-8, 8]);

  const layer3X = useTransform(mouseX, [0, 1], [-20, 20]);
  const layer3Y = useTransform(mouseY, [0, 1], [-14, 14]);

  const layer4X = useTransform(mouseX, [0, 1], [-26, 26]);
  const layer4Y = useTransform(mouseY, [0, 1], [-18, 18]);

  // small smoothing for layers
  const sLayer1X = useSpring(layer1X, { stiffness: 160, damping: 22 });
  const sLayer1Y = useSpring(layer1Y, { stiffness: 160, damping: 22 });
  const sLayer2X = useSpring(layer2X, { stiffness: 160, damping: 22 });
  const sLayer2Y = useSpring(layer2Y, { stiffness: 160, damping: 22 });
  const sLayer3X = useSpring(layer3X, { stiffness: 160, damping: 22 });
  const sLayer3Y = useSpring(layer3Y, { stiffness: 160, damping: 22 });
  const sLayer4X = useSpring(layer4X, { stiffness: 160, damping: 22 });
  const sLayer4Y = useSpring(layer4Y, { stiffness: 160, damping: 22 });

  // mouse move handler attached to the mockup wrapper (so entire area is active)
  const handleMouseMoveMockup = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  const handleMouseLeaveMockup = () => {
    // gracefully return to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <Section
      className="pt-[12rem] relative overflow-hidden"
      id="hero"
      customPaddings
    >
      {/* Background Animation Layers */}
      <BackgroundCircles parallaxRef={parallaxRef} />

      {/* Dark neon gradient */}
      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-[#0a0517] to-[#05030d]" />

      <div className="container relative" ref={parallaxRef}>
        {/* ---------- TITLE ---------- */}
        <div className="relative z-30 max-w-[62rem] mx-auto text-center mb-16">
          <div className="text-xs text-purple-300/80 tracking-wider uppercase mb-4">
            Build Faster — Launch Sooner
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Launch Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              Rapid MVP
            </span>{" "}
            in Days
          </h1>

          <p className="max-w-3xl mx-auto text-white/60 text-lg mb-8">
            Convert your idea into a fully functional MVP with premium UI,
            scalable architecture and modern engineering.
          </p>

          <div className="flex justify-center gap-4">
            <Button href="/pricing" white>
              Start Building
            </Button>

            <Button
              href="/contact"
              className="!bg-white/10 !text-white hover:!bg-white/20"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* ---------- PREMIUM MOCKUP ---------- */}
        <div className="relative flex justify-center items-center w-full">
          <motion.div
            className="relative w-full max-w-[75rem] px-4"
            style={{ opacity, y: lift }}
          >
            {/* Light sweep overlay */}
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none"
              initial={{ x: "-140%" }}
              animate={{ x: "160%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              }}
            />

            {/* Purple overlay fade */}
            <motion.div
              className="absolute inset-0 -z-20 blur-[70px] bg-purple-700/30"
              style={{ opacity: overlayOpacity }}
            />

            {/* Hover + mouse parallax wrapper (attach mouse handlers here) */}
            <div
              className="perspective-[2400px] mx-auto max-w-[95%]"
              onMouseMove={handleMouseMoveMockup}
              onMouseLeave={handleMouseLeaveMockup}
            >
              {/* Outer 3D frame - driven by motion values */}
              <motion.div
                className="relative p-[5px] rounded-3xl bg-gradient-to-r from-purple-500/40 to-indigo-500/40 backdrop-blur-xl shadow-[0_0_80px_rgba(150,60,255,0.4)] transform-gpu"
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformOrigin: "top center",
                  scale: useTransform(mouseY, [0, 1], [1.01, 1.0]), // tiny scale effect based on vertical mouse
                }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
              >
                {/* Inner Screen Frame */}
                <div className="bg-black/40 rounded-[1.3rem] border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl">
                  {/* Browser bar */}
                  <div className="h-[1rem] bg-black/60 border-b border-white/10 rounded-t-[1rem]" />

                  {/* Main Screen */}
                  <motion.div className="relative aspect-[15/9] overflow-hidden transform-gpu ">
                    {/* Background main mockup image (static) */}
                    <img
                      src={robot}
                      alt="MVP Engine"
                      className="w-full h-full object-cover opacity-[0.90]"
                    />

                    {/* ---------- PARALLAX UI LAYERS INSIDE SCREEN ---------- */}
                    {/* LAYER 1 — Top MVP Builder Navigation */}
                    <motion.div
                      className="absolute top-6 left-1/2 -translate-x-1/2 w-[78%] h-12 
  bg-white/10 rounded-xl backdrop-blur-xl border border-white/20 
  flex items-center justify-between px-4 text-xs text-white/70 font-medium"
                      style={{ x: sLayer1X, y: sLayer1Y }}
                    >
                      <span className="text-white/90 font-semibold">
                        🚀 MVP Builder
                      </span>
                    </motion.div>

                    {/* LAYER 2 — Feature Cards */}
                    <motion.div
                      className="absolute top-[32%] left-[10%] w-[23%] h-[30%]
  bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 
  p-4 flex flex-col justify-between text-white/80"
                      style={{ x: sLayer2X, y: sLayer2Y }}
                    >
                      <h3 className="text-sm font-semibold text-white">
                        🔐 Authentication
                      </h3>
                      <p className="text-xs">Email, OAuth, Role-based access</p>
                      <span className="text-[10px] opacity-70 mt-auto">
                        Included
                      </span>
                    </motion.div>

                    <motion.div
                      className="absolute top-[30%] left-[36%] w-[32%] h-[38%]
  bg-white/10 rounded-xl backdrop-blur-xl border border-white/20 
  p-4 flex flex-col text-white/80"
                      style={{ x: sLayer3X, y: sLayer3Y }}
                    >
                      <h3 className="text-sm font-semibold text-white">
                        📊 Dashboard UI
                      </h3>

                      <div className="mt-3 space-y-2 text-xs">
                        <div className="h-2 bg-purple-500/40 rounded-full w-[85%]" />
                        <div className="h-2 bg-indigo-500/40 rounded-full w-[60%]" />
                        <div className="h-2 bg-purple-400/40 rounded-full w-[40%]" />
                      </div>

                      <p className="text-[11px] opacity-70 mt-auto">
                        Fully responsive components
                      </p>
                    </motion.div>

                    {/* LAYER 3 — CTA Badge (foreground) */}
                    <motion.div
                      className="absolute top-[60%] right-[10%] w-[20%] h-[20%]
  bg-purple-600/40 backdrop-blur-xl rounded-xl border border-white/30 
  shadow-[0_0_25px_rgba(150,60,255,0.7)] p-4 flex flex-col text-white"
                      style={{
                        x: sLayer4X,
                        y: sLayer4Y,
                        scale: useTransform(scrollY, [0, 300], [1, 0.92]),
                      }}
                    >
                      <h3 className="text-sm font-bold">⚡ Fast Build</h3>
                      <p className="text-xs text-white/80 mt-1">
                        Est. Delivery: 12–20 Days
                      </p>

                      <div className="mt-auto">
                        <div className="h-2 bg-white/30 rounded-full w-full overflow-hidden">
                          <div className="h-full w-[72%] bg-white/90 rounded-full" />
                        </div>
                        <span className="text-[10px] opacity-80 mt-1 block">
                          Progress: 72%
                        </span>
                      </div>
                    </motion.div>

                    {/* LAYER 4 — Floating micro icon */}
                    <motion.div
                      className="absolute top-[20%] right-[18%] w-7 h-7 rounded-full 
  bg-gradient-to-br from-purple-400 to-indigo-400 shadow-lg 
  flex items-center justify-center text-white text-lg"
                      style={{
                        x: sLayer2X,
                        y: sLayer2Y,
                      }}
                    >
                      ⚡
                    </motion.div>
                    {/* ---------- EXISTING GENERATING + NOTIFICATION ---------- */}
                    <Generating className="absolute left-4 right-4 bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[34rem] md:bottom-10 z-20" />

                    <ScrollParallax isAbsolutelyPositioned>
                      <Notification
                        className="hidden xl:flex absolute -right-[1rem] bottom-[18rem] w-[20rem] z-30"
                        title="MVP Delivery: 5–20 Days"
                      />
                    </ScrollParallax>
                  </motion.div>
                </div>
              </motion.div>

              {/* Hinge shadow */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-[80%] h-16 rounded-full blur-2xl bg-black/50 z-0"
                style={{
                  opacity: useTransform(scrollY, [0, 400], [0.3, 0.8]),
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Company Logos */}
        <CompanyLogos className="hidden relative z-30 mt-20 lg:block" />
      </div>
    </Section>
  );
};

export default Hero;
