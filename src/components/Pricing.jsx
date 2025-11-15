// Pricing.jsx
import Section from "./Sections";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { smallSphere, stars } from "../assets";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sphereWrapperRef = useRef(null);
  const tiltLayerRef = useRef(null);
  const particlesRef = useRef(null);

  const [billing, setBilling] = useState("one-time");

  /* ---------------------------------------------- */
  /* FLOAT ANIMATION (Framer Motion)                */
  /* ---------------------------------------------- */
  const floatMotion = useMotionValue(0);
  const floatY = useTransform(floatMotion, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    const interval = setInterval(() => floatMotion.set(Math.random()), 3000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------------------------------------- */
  /* FIXED 3D TILT LOGIC (NO MORE TILT BUG)         */
  /* ---------------------------------------------- */
  useEffect(() => {
    const tiltEl = tiltLayerRef.current;
    if (!tiltEl) return;

    tiltEl.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";

    const handleMove = (e) => {
      const rect = tiltEl.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const rotateY = (x / rect.width) * 20;
      const rotateX = -(y / rect.height) * 14;

      gsap.to(tiltEl, {
        rotateX,
        rotateY,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(tiltEl, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  /* ---------------------------------------------- */
  /* PARTICLES CANVAS (Nebula + Sparks)             */
  /* ---------------------------------------------- */
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const rand = (a, b) => Math.random() * (b - a) + a;

    const sparks = Array.from({ length: 50 }).map(() => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.2, 0.2),
      vy: rand(-0.2, -0.6),
      size: rand(0.4, 1.5),
      life: rand(70, 150),
      hue: rand(250, 290),
      alpha: rand(0.2, 0.6),
    }));

    const blobs = Array.from({ length: 5 }).map(() => ({
      x: rand(w * 0.2, w * 0.8),
      y: rand(h * 0.2, h * 0.8),
      r: rand(90, 160),
      vx: rand(-0.03, 0.03),
      vy: rand(-0.02, 0.02),
      alpha: rand(0.04, 0.1),
      hue: rand(250, 290),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        ctx.beginPath();
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue},80%,60%,${b.alpha})`);
        g.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      });

      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life--;
        if (s.life <= 0 || s.y < -20) {
          s.x = rand(0, w);
          s.y = h + rand(0, 50);
          s.life = rand(70, 150);
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue},80%,60%,${s.alpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------------------------------------- */
  /* RETURN JSX                                     */
  /* ---------------------------------------------- */

  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        {/* 🌌 Background Stars */}
        <motion.img
          src={stars}
          className="absolute inset-0 w-full opacity-[0.15] pointer-events-none -z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1.2 }}
        />

        {/* Heading + Billing Toggle */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <Heading
            tag="Rapid MVP Creator"
            title="Choose the Right Plan and Build Your MVP Faster"
            text="Transparent one-time pricing. Designed for founders and teams who want production-ready MVPs without complexity."
          />

          <div className="mt-3 lg:mt-0">
            <div className="flex bg-black/30 border border-white/10 rounded-full p-1">
              {["one-time", "monthly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={`px-5 py-2 rounded-full text-sm transition font-semibold ${
                    billing === type
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_6px_18px_rgba(150,60,255,0.28)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {type === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing + Sphere */}
        <div className="mt-14 flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <PricingList billing={billing} />
          </div>

          {/* Right Side Sphere */}
          <div className="relative w-full lg:w-[38%] h-[38rem]">
            <canvas
              ref={particlesRef}
              className="absolute inset-0 w-full h-full rounded-3xl -z-10"
            />

            {/* Floating hologram shapes */}
            <motion.div
              className="absolute inset-3 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <div className="absolute top-6 left-6 w-40 h-28 bg-gradient-to-br from-purple-600/18 to-indigo-600/10 border border-white/6 rounded-xl blur-[8px] rotate-3" />
              <div className="absolute top-36 right-6 w-44 h-32 bg-gradient-to-br from-indigo-600/12 to-purple-600/08 border border-white/6 rounded-xl blur-[8px] -rotate-2" />
              <div className="absolute bottom-10 left-10 w-48 h-36 bg-gradient-to-br from-purple-500/14 to-indigo-500/06 border border-white/6 rounded-xl blur-[8px] rotate-1" />
            </motion.div>

            {/* Sphere with FIXED tilt */}
            <motion.div
              ref={sphereWrapperRef}
              style={{ y: floatY }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div
                ref={tiltLayerRef}
                className="w-[22rem] h-[22rem] lg:w-[28rem] lg:h-[28rem] flex items-center justify-center transform-gpu"
              >
                <img
                  src={smallSphere}
                  alt="sphere"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                />
              </div>

              <div className="absolute w-[30rem] h-[30rem] rounded-full pointer-events-none -z-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-400/12 to-transparent blur-3xl mix-blend-screen" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="/pricing"
            className="text-xs font-code font-bold uppercase border-b tracking-wider hover:text-purple-300 transition"
          >
            See full details
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
