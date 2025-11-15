import { useEffect, useRef } from "react";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Sections";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, benefits.length);

    cardsRef.current.forEach((card, i) => {
      const direction = i % 2 === 0 ? -100 : 100;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: direction,
          y: 40,
          rotate: direction > 0 ? 1 : -1,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // hover tilt effect
  const handleCardHover = (e, intensity = 15) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * intensity;
    const rotateX = (y / rect.height - 0.5) * -intensity;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.03,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const resetTilt = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <Section id="services">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-3xl"
          title="Everything You Need to Build a Production-Ready MVP"
          text="Design, development, deployment, architecture, AI features — all crafted with a premium UI foundation."
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseMove={handleCardHover}
              onMouseLeave={resetTilt}
              className="
                relative group p-[3px] md:max-w-[24rem] w-full
                rounded-2xl overflow-hidden
                bg-gradient-to-br from-purple-500/10 to-indigo-500/10
                backdrop-blur-xl border border-white/10
                shadow-[0_0_40px_rgba(120,40,255,0.25)]
                transform-gpu transition-all duration-300
              "
            >
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 blur-xl -z-10" />

              {/* Gloss Highlight */}
              <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 to-transparent opacity-20 pointer-events-none" />

              {/* Inner Content Box */}
              <div
                className="
                relative z-10 flex flex-col min-h-[22rem] p-[2.4rem]
                rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10
              "
              >
                <h5 className="h5 mb-5 text-white">{item.title}</h5>

                <p className="body-2 mb-6 text-n-3 leading-relaxed">
                  {item.text}
                </p>

                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold uppercase text-n-1 tracking-wider">
                    View details
                  </p>
                  <Arrow />
                </div>
              </div>

              {/* Hover reveal image */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{ clipPath: "url(#benefits)" }}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
