// Pricing.jsx — PERFORMANCE SUPER-OPTIMIZED
import Section from "./Sections";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { smallSphere, stars } from "../assets";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";

const Pricing = () => {
  const tiltRef = useRef(null);
  const particlesRef = useRef(null);

  const [billing, setBilling] = useState("one-time");

  /* -------------------------------------------
      LIGHT FLOAT ANIMATION (Reduced Motion)
  -------------------------------------------- */
  const floatVal = useMotionValue(0);
  const floatY = useTransform(floatVal, [0, 1], ["0%", "4%"]); // ⬅ reduced from 9%

  useEffect(() => {
    const interval = setInterval(() => floatVal.set(Math.random()), 4200);
    return () => clearInterval(interval);
  }, [floatVal]);

  /* -------------------------------------------
      ULTRA-OPTIMIZED GPU 3D TILT
  -------------------------------------------- */
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    let raf = null;
    let tX = 0;
    let tY = 0;

    const applyTilt = () => {
      el.style.transform = `perspective(1200px) rotateY(${tX}deg) rotateX(${tY}deg)`;
      raf = null;
    };

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const my = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

      tX = mx * 8;
      tY = -my * 6;

      if (!raf) {
        raf = requestAnimationFrame(applyTilt);
      }
    };

    const reset = () => {
      tX = 0;
      tY = 0;
      if (!raf) {
        raf = requestAnimationFrame(applyTilt);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", reset);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
      el.style.transform = "";
    };
  }, []);

  /* -------------------------------------------
      PARTICLES — SUPER THROTTLED VERSION
  -------------------------------------------- */
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const rand = (a, b) => Math.random() * (b - a) + a;

    // 25 sparks only (reduced)
    const sparks = Array.from({ length: 25 }).map(() => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.1, 0.1),
      vy: rand(-0.1, -0.35),
      size: rand(0.3, 1),
      hue: rand(250, 295),
      alpha: rand(0.15, 0.4),
      life: rand(60, 130),
    }));

    // 3 blobs only (reduced)
    const blobs = Array.from({ length: 3 }).map(() => ({
      x: rand(w * 0.2, w * 0.8),
      y: rand(h * 0.2, h * 0.8),
      r: rand(75, 130),
      vx: rand(-0.015, 0.015),
      vy: rand(-0.015, 0.015),
      hue: rand(240, 300),
      alpha: rand(0.02, 0.06),
    }));

    let last = 0;

    const draw = (ts) => {
      if (ts - last < 22) {
        requestAnimationFrame(draw);
        return;
      }
      last = ts;

      ctx.clearRect(0, 0, w, h);

      // glow blobs
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `hsla(${b.hue},80%,60%,${b.alpha})`);
        grad.addColorStop(1, `transparent`);
        ctx.fillStyle = grad;
        ctx.fillRect(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      }

      // sparks
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.life--;

        if (s.life <= 0 || s.y < -20) {
          s.x = rand(0, w);
          s.y = h + rand(0, 40);
          s.life = rand(60, 120);
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue},80%,60%,${s.alpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  /* -------------------------------------------
      RETURN (UI UNCHANGED)
  -------------------------------------------- */

  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative">
        {/* Stars Background */}
        <motion.div
          className="absolute inset-0 w-full opacity-[0.15] -z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1.1 }}
        >
          <OptimizedImage
            src={stars}
            alt="stars"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Heading + Billing */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <Heading
            tag="Rapid MVP Creator"
            title="Choose the Right Plan and Build Your MVP Faster"
            text="Transparent one-time pricing. Designed for founders and teams who want production-ready MVPs without complexity."
          />

          {/* Toggle */}
          <div className="mt-3 lg:mt-0">
            <div className="flex bg-black/30 border border-white/10 rounded-full p-1">
              {["one-time", "monthly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    billing === type
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_6px_18px_rgba(150,60,255,0.25)]"
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

          {/* Sphere */}
          <div className="relative w-full lg:w-[38%] h-[38rem]">
            <canvas
              ref={particlesRef}
              className="absolute inset-0 w-full h-full rounded-3xl -z-10"
            />

            <motion.div
              style={{ y: floatY }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div
                ref={tiltRef}
                className="w-[20rem] h-[20rem] lg:w-[26rem] lg:h-[26rem] flex items-center justify-center transform-gpu"
              >
                <OptimizedImage
                  src={smallSphere}
                  alt="Premium sphere"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>

              <div className="absolute w-[28rem] h-[28rem] rounded-full -z-10 pointer-events-none">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/18 via-indigo-400/10 to-transparent blur-2xl mix-blend-screen" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#contact"
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
