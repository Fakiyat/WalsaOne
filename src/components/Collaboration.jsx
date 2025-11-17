import { useEffect, useRef, useState } from "react";
import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Sections";
import OptimizedImage from "./OptimizedImage";
import { loadScrollTrigger } from "../utils/gsapLoader";

const Collaboration = () => {
  const circleRef = useRef(null);
  const iconsRef = useRef([]);
  const glowRingRef = useRef(null);
  const scanRef = useRef(null);
  const centerRef = useRef(null);
  const gsapRef = useRef(null);

  const [enableMotion, setEnableMotion] = useState(true);

  /* -------------------------------
     PREFERS REDUCED MOTION CHECK
  -------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const isLargeScreen = window.matchMedia("(min-width: 1024px)");

    const updateMotion = () =>
      setEnableMotion(!prefersReducedMotion.matches && isLargeScreen.matches);

    updateMotion();

    prefersReducedMotion.addEventListener("change", updateMotion);
    isLargeScreen.addEventListener("change", updateMotion);

    return () => {
      prefersReducedMotion.removeEventListener("change", updateMotion);
      isLargeScreen.removeEventListener("change", updateMotion);
    };
  }, []);

  /* -------------------------------
     MAIN ANIMATIONS (Optimized)
  -------------------------------- */
  useEffect(() => {
    if (!enableMotion) return;

    const circle = circleRef.current;
    const glowRing = glowRingRef.current;
    const scan = scanRef.current;
    const center = centerRef.current;
    if (!circle || !glowRing || !scan || !center) return;

    let ctx;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await loadScrollTrigger();
      if (cancelled) return;

      gsapRef.current = gsap;

      ctx = gsap.context(() => {
        /* --- SMOOTH ROTATION --- */
        gsap.to(circle, {
          rotate: 360,
          duration: 28,
          ease: "none",
          repeat: -1,
        });

        /* --- GLOW PULSE (CSS-like) --- */
        gsap.fromTo(
          glowRing,
          { opacity: 0.25, scale: 0.97 },
          {
            opacity: 0.55,
            scale: 1.04,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );

        /* --- SCAN ROTATION --- */
        gsap.to(scan, {
          rotate: 360,
          opacity: 0.35,
          duration: 10,
          ease: "none",
          repeat: -1,
        });

        /* --- CENTER BREATHING --- */
        gsap.fromTo(
          center,
          { scale: 0.94 },
          {
            scale: 1.06,
            duration: 4,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          }
        );

        /* --- ICON FLOAT --- */
        iconsRef.current.forEach((icon, i) => {
          if (!icon) return;

          gsap.to(icon, {
            y: i % 2 === 0 ? -22 : -16,
            scale: 1.15,
            duration: 1.6,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });

          gsap.to(icon, {
            x: i % 2 === 0 ? -4 : 4,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          gsap.from(icon, {
            y: 0,
            scrollTrigger: {
              trigger: circle,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          });
        });
      });
    };

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [enableMotion]);

  /* -------------------------------
     MOUSEMOVE PARALLAX (50% LESS WORK)
  -------------------------------- */
  useEffect(() => {
    if (!enableMotion) return;
    const circle = circleRef.current;
    if (!circle) return;

    let rafId;
    let targetX = 0;
    let targetY = 0;

    let cleanup = () => {};
    let cancelled = false;

    const init = async () => {
      const { gsap } = await loadScrollTrigger();
      if (cancelled) return;
      gsapRef.current = gsap;

      const handleMouseMove = (e) => {
        const rect = circle.getBoundingClientRect();
        targetX = e.clientX - (rect.left + rect.width / 2);
        targetY = e.clientY - (rect.top + rect.height / 2);

        if (rafId) return;

        rafId = requestAnimationFrame(() => {
          gsap.to(circle, {
            rotateX: -targetY * 0.03,
            rotateY: targetX * 0.03,
            duration: 0.6,
            ease: "power2.out",
          });
          rafId = null;
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      cleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    };

    init();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enableMotion]);

  /* -------------------------------
     RENDER
  -------------------------------- */
  return (
    <Section crosses id="why-us">
      <div className="container lg:flex" id="why-us">
        {/* LEFT SIDE */}
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">Why Us?</h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li key={item.id} className="mb-3 py-3">
                <div className="flex items-center">
                  <OptimizedImage
                    src={check}
                    width={24}
                    height={24}
                    alt="check"
                  />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button>Try it now</Button>
        </div>

        {/* RIGHT — OPTIMIZED ORBIT ANIMATION */}
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p>

          <div
            ref={circleRef}
            className="relative left-1/2 flex w-[22rem] aspect-square -translate-x-1/2"
          >
            {/* Glow ring */}
            <div
              ref={glowRingRef}
              className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl"
            />

            {/* Hologram border */}
            <div
              ref={scanRef}
              className="absolute inset-0 rounded-full border border-purple-400/40 opacity-0"
            />

            {/* Inner rings */}
            <div className="flex w-60 aspect-square m-auto border border-purple-500/30 rounded-full">
              <div
                ref={centerRef}
                className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full"
              >
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <OptimizedImage
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            {/* Orbiting apps */}
            <ul>
              {collabApps.map((app, i) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    i * 45
                  }`}
                >
                  <div
                    ref={(el) => (iconsRef.current[i] = el)}
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-purple-400/20 rounded-xl -rotate-${
                      i * 45
                    }`}
                  >
                    <OptimizedImage
                      src={app.icon}
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      className="m-auto"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
