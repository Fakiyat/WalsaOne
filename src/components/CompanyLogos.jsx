import { companyLogos } from "../constants";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useRef } from "react";
import OptimizedImage from "./OptimizedImage";

const CompanyLogos = ({ className }) => {
  const { scrollY } = useScroll();

  // Scroll → 3D transforms
  const rotateX = useTransform(scrollY, [0, 400], [0, -30]);
  const translateY = useTransform(scrollY, [0, 400], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.85]);

  // ---------- AUTO SCROLL LOGIC ----------
  const baseX = useMotionValue(0);
  const speed = 0.5; // lower = slower, higher = faster
  const ribbonRef = useRef(null);

  // Auto-move the ribbon every frame
  useAnimationFrame((t, delta) => {
    // move based on frame time
    baseX.set(baseX.get() - speed * (delta / 16));

    // reset for infinite loop
    if (Math.abs(baseX.get()) > ribbonRef.current.scrollWidth / 2) {
      baseX.set(0);
    }
  });

  return (
    <div className={`relative ${className}`}>
      <h5 className="tagline mb-6 text-center text-white/50">
        Trusted by teams building amazing products
      </h5>

      {/* 3D Ribbon Container */}
      <div className="relative w-full overflow-hidden perspective-[1500px]">
        <motion.ul
          ref={ribbonRef}
          className="flex gap-20 py-6 whitespace-nowrap will-change-transform"
          style={{
            x: baseX,
            rotateX,
            y: translateY,
            opacity,
          }}
        >
          {/* Duplicate for infinite loop */}
          {[...companyLogos, ...companyLogos].map((logo, index) => (
            <li
              key={index}
              className="flex items-center justify-center min-w-[12rem] h-[6rem] 
              opacity-80 hover:opacity-100 transition pointer-events-none"
            >
              <OptimizedImage
                src={logo}
                className="w-auto h-10 object-contain"
                alt="company logo"
              />
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Left / Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#05030d] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#05030d] to-transparent" />
    </div>
  );
};

export default CompanyLogos;
