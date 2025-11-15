import { brainwaveWhiteSymbol, gradient, play } from "../../assets";
import ChatBubbleWing from "../../assets/svg/ChatBubbleWing";
import { motion } from "framer-motion";

export const Gradient = () => {
  return (
    <div className="absolute top-0 -left-[10rem] w-[56.625rem] h-[56.625rem] opacity-50 mix-blend-color-dodge pointer-events-none">
      <img
        className="absolute top-1/2 left-1/2 w-[79.5625rem] max-w-[79.5625rem] h-[88.5625rem] -translate-x-1/2 -translate-y-1/2"
        src={gradient}
        width={1417}
        height={1417}
        alt="Gradient"
      />
    </div>
  );
};

export const PhotoChatMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{
        opacity: 0.85,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{
        scale: 1.03,
        y: -2,
        transition: { duration: 0.3 },
      }}
      className="
        absolute top-4 right-10 
        max-w-[17.5rem]
        py-5 px-7 
        bg-black/50 
        backdrop-blur-xl 
        rounded-t-xl rounded-bl-xl 
        font-code text-base 
        border border-white/10 
        shadow-[0_0_25px_rgba(140,60,255,0.25)] 
        text-white/90
      "
    >
      <div className="relative z-10">Hey Wasla ONE, Can you build this?</div>

      {/* Glow line shimmer */}
      <motion.div
        className="absolute inset-0 rounded-t-xl rounded-bl-xl bg-gradient-to-r from-purple-500/20 to-pink-500/10 pointer-events-none"
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <ChatBubbleWing className="absolute left-full bottom-0 opacity-80" />
    </motion.div>
  );
};

export const VideoChatMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{
        opacity: 0.9,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{
        scale: 1.03,
        y: -3,
        transition: { duration: 0.25 },
      }}
      className="
        absolute top-8 left-[3.125rem] 
        w-full max-w-[15rem] 
        px-5 pt-3 pb-8
        bg-black/40
        backdrop-blur-xl
        rounded-t-xl rounded-br-xl
        border border-white/10
        shadow-[0_0_25px_rgba(140,60,255,0.25)]
        text-white/90 
        font-code text-base
        transform-gpu
      "
    >
      {/* MAIN TEXT */}
      <div className="relative z-20">Built Successfully!</div>

      {/* ICON BOX */}
      <motion.div
        className="
          absolute left-5 -bottom-[1.125rem]
          flex items-center justify-center
          w-[2.3rem] h-[2.3rem]
          rounded-xl
          bg-color-1/90
          shadow-[0_0_12px_rgba(140,60,255,0.6)]
        "
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <img
          src={brainwaveWhiteSymbol}
          width={26}
          height={26}
          alt="brainwave"
        />
      </motion.div>

      {/* TIMESTAMP */}
      <p className="tagline absolute right-2 bottom-1 text-[0.65rem] text-white/50 tracking-wide uppercase">
        just now
      </p>

      {/* Bubble Wing */}
      <ChatBubbleWing
        className="absolute right-full bottom-0 -scale-x-100"
        pathClassName="fill-black/40"
      />

      {/* SHIMMER OVERLAY */}
      <motion.div
        className="absolute inset-0 rounded-t-xl rounded-br-xl pointer-events-none bg-gradient-to-r from-purple-500/20 to-pink-500/10"
        animate={{ opacity: [0.15, 0.32, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};
export const VideoBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      viewport={{ once: false, amount: 0.3 }}
      className="absolute left-0 bottom-0 w-full flex items-center p-6"
    >
      {/* PLAY BUTTON */}
      <motion.img
        src={play}
        width={24}
        height={24}
        alt="Play"
        className="mr-4 opacity-90"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      />

      {/* PROGRESS BAR */}
      <div className="flex-1 bg-white/20 rounded-full h-[3px] overflow-hidden">
        <motion.div
          className="h-full bg-color-1 rounded-full shadow-[0_0_10px_rgba(140,60,255,0.8)]"
          animate={{ width: ["20%", "65%", "45%", "80%", "55%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};
