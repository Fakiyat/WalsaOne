import { useEffect, useRef } from "react";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Sections";
import Tagline from "./Tagline";

import { roadmap } from "../constants";
import { check2, loading1, grid } from "../assets";
import { Gradient } from "./design/Roadmap";
import OptimizedImage from "./OptimizedImage";

import { motion } from "framer-motion";
import { loadScrollTrigger } from "../utils/gsapLoader";

const Roadmap = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await loadScrollTrigger();
      if (cancelled) return;

      ctx = gsap.context(() => {
        cardsRef.current.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              rotateX: 8,
              scale: 0.92,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: i * 0.15,
            }
          );
        });
      });
    };

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Section className="overflow-hidden" id="how">
      <div className="container md:pb-16">
        {/* Heading */}
        <Heading
          tag="Our MVP Journey"
          title="How Your MVP Comes to Life"
          text="A structured, transparent, step-by-step approach. Designed for speed, clarity and results."
        />

        <div className="relative grid gap-12 md:grid-cols-2 md:gap-10 md:pb-[7rem]">
          {/* Glowing vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/30 via-indigo-400/25 to-transparent blur-[2px]" />

          {roadmap.map((item, i) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <motion.div
                key={item.id}
                ref={(el) => (cardsRef.current[i] = el)}
                whileHover={{
                  scale: 1.03,
                  rotateX: 1,
                  boxShadow: "0 20px 60px rgba(140,60,255,0.25)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`
                  relative backdrop-blur-xl transform-gpu
                  p-0.5 rounded-[2.5rem]
                  ${i % 2 === 0 ? "md:translate-y-[3rem]" : ""}
                `}
                style={{
                  background: item.colorful
                    ? "conic-gradient(from 10deg, rgba(130,50,255,0.5), rgba(40,10,75,0.3), rgba(130,50,255,0.5))"
                    : "rgba(255,255,255,0.04)",
                }}
              >
                {/* Inner card */}
                <div className="relative p-10 bg-n-8 rounded-[2.3rem] overflow-hidden shadow-xl border border-white/10">
                  {/* Neon grid background */}
                  <OptimizedImage
                    src={grid}
                    alt="Grid"
                    className="absolute top-0 left-0 w-full opacity-[0.18] pointer-events-none"
                  />

                  {/* Glow orbs */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/20 blur-3xl rounded-full"></div>
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/20 blur-[90px] rounded-full"></div>

                  {/* Status Bar */}
                  <div className="relative z-10 flex items-center justify-between mb-10">
                    <Tagline>{item.date}</Tagline>

                    <div className="flex items-center px-4 py-1 bg-white rounded-full text-black shadow-md">
                      <OptimizedImage
                        src={item.status === "done" ? check2 : loading1}
                        width={18}
                        height={18}
                        alt={status}
                        className="mr-2"
                      />
                      <span className="tagline font-semibold">{status}</span>
                    </div>
                  </div>

                  {/* Image Preview */}
                  <motion.div
                    className="relative mb-8 rounded-2xl overflow-hidden"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1, scale: 1.02 }}
                  >
                    <OptimizedImage
                      src={item.imageUrl}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-full object-cover"
                    />

                    {/* Floating dots */}
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full"
                      animate={{ y: [-4, 4, -4], opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                  </motion.div>

                  {/* Text */}
                  <h4 className="h4 mb-4 text-white">{item.title}</h4>
                  <p className="body-2 text-white/60 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}

          <Gradient />
        </div>

        <div className="flex justify-center mt-12 md:mt-20">
          <Button href="#contact">Explore Full Roadmap</Button>
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;
