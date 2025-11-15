// PricingList.jsx
import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PricingList = ({ billing = "one-time" }) => {
  const cardsRef = useRef([]);
  cardsRef.current = [];

  useEffect(() => {
    // GSAP Reveal: staggered entry from bottom with slight rotation
    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        }
      );
    });
  }, []);

  const addRef = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  const computePrice = (p) => {
    if (!p || isNaN(Number(p))) return null;
    const num = Number(p);
    if (billing === "monthly") {
      // show monthly price (rounded)
      return Math.round((num / 12) * 100) / 100;
    }
    return num;
  };

  return (
    <div className="grid md:grid-cols-3 gap-7">
      {pricing.map((item, index) => {
        const priceVal = computePrice(item.price);
        return (
          <motion.div
            key={item.id}
            ref={addRef}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 40px rgba(140,60,255,0.18)",
            }}
            className="relative backdrop-blur-xl bg-white/5 border border-white/8 rounded-3xl p-8 transition-all"
          >
            {/* hologram top line */}
            <div className="absolute left-6 right-6 top-4 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30" />

            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-white/60 mb-6">{item.description}</p>

            <div className="h-24 flex items-end mb-6">
              {priceVal ? (
                <div className="flex items-end gap-2">
                  <span className="text-3xl text-white/70">
                    ${billing === "monthly" ? "" : ""}
                  </span>
                  <span className="text-5xl font-extrabold">
                    {billing === "monthly" ? priceVal : priceVal}
                  </span>
                  {billing === "monthly" && (
                    <span className="ml-2 text-sm text-white/60">/month</span>
                  )}
                </div>
              ) : (
                <div className="text-white/60 text-lg">Custom Pricing</div>
              )}
            </div>

            <Button
              href={item.price ? "/pricing" : ""}
              white={!!item.price}
              className="w-full mb-6"
            >
              {item.price
                ? billing === "monthly"
                  ? "Start Monthly"
                  : "Start Now"
                : "Book a Call"}
            </Button>

            <ul className="space-y-4">
              {item.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/85">
                  <img src={check} className="w-5 mt-1 opacity-80" />
                  <p className="text-sm">{feature}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PricingList;
