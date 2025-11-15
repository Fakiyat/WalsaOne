import React from "react";
import Section from "./Sections";
import { socials } from "../constants";
import { motion } from "framer-motion";
import moscot from "../assets/roadmap/moscot2.png";

const Footer = () => {
  // Scroll to top function
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative py-16 px-6 bg-gradient-to-r from-purple-700/10 via-purple-500/10 to-indigo-600/20 border-t border-white/10 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 blur-[200px] bg-purple-500/10 pointer-events-none" />

        {/* 3D Floating Mascot
        <motion.img
          src={moscot}
          alt="MVP Mascot"
          className="absolute right-10 top-6 w-28 drop-shadow-xl pointer-events-none"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        /> */}

        {/* CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to Build Your MVP?
          </h2>
          <p className="text-white/60 mb-8">
            Get your idea transformed into a real product — faster, smarter,
            better.
          </p>

          {/* Newsletter Input */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full py-3 px-4 rounded-xl bg-white/5 border border-purple-500/40 text-white 
                  placeholder-white/40 outline-none backdrop-blur-md
                  focus:border-purple-400 focus:shadow-[0_0_20px_rgba(160,100,255,0.4)]
                  transition-all
                "
              />
              <button
                className="
                  absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg
                  bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold
                  shadow-lg hover:shadow-[0_0_20px_rgba(160,100,255,0.7)] transition-all
                "
              >
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ⭐⭐⭐ ACTUAL FOOTER SECTION ⭐⭐⭐ */}
      <Section
        crosses
        className="!px-0 !py-14 relative overflow-hidden bg-gradient-to-b from-[#06030f] to-[#0a031a]"
      >
        {/* Glow Lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 w-[80%] h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-600/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 w-[60%] h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        </div>

        {/* Hologram Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-cover pointer-events-none"
        />

        <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="caption text-white/60 tracking-wide"
          >
            © {new Date().getFullYear()} The Internet Eagle — All Rights
            Reserved.
          </motion.p>

          {/* Social Icons */}
          <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.18,
                  boxShadow: "0 0 18px rgba(160,100,255,0.5)",
                }}
                transition={{ duration: 0.3 }}
                key={item.id}
                href={item.url}
                target="_blank"
                className="flex items-center justify-center w-11 h-11
                  bg-white/5 border border-white/10 backdrop-blur-md rounded-xl 
                  hover:bg-white/10 transition-all"
              >
                <img
                  src={item.iconUrl}
                  width={18}
                  height={18}
                  className="opacity-80"
                  alt={item.title}
                />
              </motion.a>
            ))}
          </ul>
        </div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute w-2 h-2 bg-purple-400/40 rounded-full blur-sm animate-ping left-[20%] top-[40%]" />
          <div className="absolute w-3 h-3 bg-indigo-400/40 rounded-full blur-sm animate-pulse left-[75%] top-[30%]" />
          <div className="absolute w-1.5 h-1.5 bg-blue-300/40 rounded-full blur-sm animate-ping left-[50%] bottom-[20%]" />
        </div>

        {/* ⭐ Scroll-to-Top Button ⭐ */}
        <motion.button
          onClick={scrollTop}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(150, 90, 255, 0.8)",
          }}
          transition={{ duration: 0.4 }}
          className="
            fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full 
            bg-gradient-to-r from-purple-600 to-indigo-600 
            text-white shadow-[0_0_18px_rgba(160,100,255,0.5)]
            flex items-center justify-center text-xl backdrop-blur-md
          "
        >
          ↑
        </motion.button>
      </Section>
    </>
  );
};

export default Footer;
