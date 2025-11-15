import { useEffect, useRef } from "react";
import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Sections";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Collaboration = () => {
  const circleRef = useRef(null);
  const iconsRef = useRef([]);
  const glowRingRef = useRef(null);
  const scanRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const glowRing = glowRingRef.current;
    const scan = scanRef.current;
    const center = centerRef.current;

    // 🌀 1. Main Circle alternating-speed rotation
    gsap.to(circle, {
      rotate: 360,
      duration: 24,
      ease: "linear",
      repeat: -1,
    });

    // 🌟 2. Glow ring breathing animation
    gsap.fromTo(
      glowRing,
      { opacity: 0.2, scale: 0.98 },
      {
        opacity: 0.6,
        scale: 1.04,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    // ⚡ 3. Electric hologram scan sweep
    gsap.to(scan, {
      opacity: 0.3,
      rotate: 360,
      duration: 6,
      ease: "power2.inOut",
      repeat: -1,
    });

    // 🔆 4. Center icon pulse
    gsap.fromTo(
      center,
      { scale: 0.95 },
      {
        scale: 1.05,
        duration: 2.5,
        ease: "expo.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    // 🟣 5. Parallax + scroll outward effect for icons
    iconsRef.current.forEach((icon, i) => {
      // Scroll pop-out
      gsap.fromTo(
        icon,
        { y: 0, scale: 1 },
        {
          y: -25,
          scale: 1.22,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: circle,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      // Micro orbit shaking
      gsap.to(icon, {
        x: gsap.utils.random(-4, 4),
        y: gsap.utils.random(-4, 4),
        duration: gsap.utils.random(2.5, 4),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Neon glow pulse
      gsap.fromTo(
        icon,
        { boxShadow: "0 0 0px rgba(150,60,255,0)" },
        {
          boxShadow: "0 0 18px rgba(150,60,255,0.65)",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    });

    // 🖱 Circle tilt on mouse move
    const handleMouseMove = (e) => {
      const rect = circle.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(circle, {
        rotateX: y * -0.03,
        rotateY: x * 0.03,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Section crosses>
      <div className="container lg:flex" id="why-us">
        {/* LEFT CONTENT */}
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">Why Us?</h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
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

        {/* RIGHT — PREMIUM ANIMATED CIRCLE */}
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p>

          <div
            ref={circleRef}
            className="relative left-1/2 flex w-[22rem] aspect-square -translate-x-1/2"
          >
            {/* BREATHING GLOW RING */}
            <div
              ref={glowRingRef}
              className="absolute inset-0 w-full h-full rounded-full bg-purple-500/20 blur-3xl"
            />

            {/* HOLOGRAM SCAN */}
            <div
              ref={scanRef}
              className="absolute inset-0 w-full h-full rounded-full border border-purple-400/40 opacity-0"
            />

            {/* INNER CORE RINGS */}
            <div className="flex w-60 aspect-square m-auto border border-purple-500/30 rounded-full">
              <div
                ref={centerRef}
                className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full"
              >
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            {/* ORBITING ICONS */}
            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    ref={(el) => (iconsRef.current[index] = el)}
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-purple-400/20 rounded-xl -rotate-${
                      index * 45
                    }`}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
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
