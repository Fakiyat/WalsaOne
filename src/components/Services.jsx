import Section from "./Sections";
import Heading from "./Heading";
import {
  service1,
  service2,
  service3,
  check,
  prototype,
  lock,
  ai,
} from "../assets";
import { motion } from "framer-motion";

import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";
import micIcon from "../assets/3dIcons/mic.png";
import settingIcon from "../assets/3dIcons/setting.png";
import aiIcon from "../assets/3dIcons/ai-chip.png";
import cloudIcon from "../assets/3dIcons/cloud-server.png";
import { Linear } from "gsap";
import { LeftLine, RightLine } from "./design/Pricing";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const Services = () => {
  return (
    <Section id="how" className="relative overflow-hidden">
      {/* BACKGROUND PREMIUM GRADIENT */}
      <div className="absolute inset-0 -z-10 opacity-60 blur-[120px] bg-gradient-to-br from-purple-700/40 to-indigo-700/30" />

      <div className="container">
        <Heading
          title="How We Build MVPs — Fast, Scalable & Production-Ready"
          text="From idea to launch. We combine design, engineering & AI to build MVPs 5× faster."
        />

        {/* --- BLOCK 1: IDEA → MVP (LEFT IMAGE + RIGHT CONTENT) --- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="relative z-10 flex items-center h-[40rem] mb-12 p-8 rounded-3xl border border-white/10 overflow-hidden lg:p-20 lg:h-[46rem] bg-black/30 backdrop-blur-xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 md:w-3/5 xl:w-auto -z-10">
            <img
              src={ai}
              alt="AI MVP Builder"
              className="w-full h-full object-cover md:object-right opacity-70"
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-20 max-w-[20rem] ml-auto">
            <h4 className="h4 mb-4 text-white">AI-Powered MVP Creation</h4>
            <p className="body-2 mb-8 text-n-3">
              We turn your idea into a working MVP using AI + engineering
              pipelines.
            </p>

            <ul className="body-2 space-y-4">
              {[
                "Idea validation & rapid prototyping",
                "UI/UX & component system setup",
                "API + backend + auth in days",
                "AI features integrated natively",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-t border-white/10 pt-4"
                >
                  <img src={check} width={20} alt="check" />
                  <p className="text-n-2">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <PhotoChatMessage />
        </motion.div>

        {/* --- BLOCK 2: PROTOTYPE → DEVELOPMENT (GRID) --- */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* CARD 1 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="relative min-h-[39rem] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md"
          >
            <img
              src={prototype}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-b from-transparent to-black/80">
              <h4 className="h4 text-white mb-4">Prototype → Real Product</h4>
              <p className="body-2 mb-4 text-n-3">
                We convert your approved prototype into a functional MVP.
              </p>

              <ul className="space-y-3 text-n-3">
                <li>⚡ Modular codebase setup</li>
                <li>⚡ Reusable UI components</li>
                <li>⚡ API integration & database setup</li>
              </ul>
            </div>

            <PhotoChatMessage />
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="p-4 bg-black/40 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden"
          >
            <div className="py-10 px-6">
              <h4 className="h4 text-white mb-4">Secure & Production-Ready</h4>
              <p className="body-2 mb-8 text-n-3">
                We deploy your MVP with best-practice DevOps: monitoring,
                logging, backups & security.
              </p>

              {/* ICON ROW */}
              <div className="flex items-center justify-between gap-4">
                {[micIcon, settingIcon, aiIcon, cloudIcon].map((icon, i) => (
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    key={i}
                    className="w-16 h-16 bg-black/20  rounded-2xl flex items-center justify-center"
                  >
                    <img src={icon} className="w-12 opacity-100" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* VIDEO PREVIEW */}
            <div className="relative h-[20rem] bg-black/60 rounded-xl overflow-hidden">
              <img
                src={lock}
                className="w-full h-full object-cover opacity-60"
              />

              <VideoBar />
            </div>
          </motion.div>
        </div>

        <Gradient />
      </div>
    </Section>
  );
};

export default Services;
