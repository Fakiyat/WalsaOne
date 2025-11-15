import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import WaslaOne from "../assets/WaslaLogo2.png";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    } else {
      disablePageScroll();
      setOpenNavigation(true);
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  // close overlay on esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && openNavigation) {
        enablePageScroll();
        setOpenNavigation(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openNavigation]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-450
          ${
            openNavigation
              ? "bg-[rgba(10,6,20,0.98)] backdrop-blur-2xl border-purple-800/40 shadow-[0_12px_40px_rgba(90,20,140,0.28)]"
              : isScrolled
              ? "bg-[rgba(10,6,20,0.78)] backdrop-blur-xl border-purple-900/20 shadow-[0_6px_20px_rgba(20,8,60,0.25)]"
              : "bg-[rgba(10,6,20,0.48)] backdrop-blur-sm border-transparent"
          }
        `}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center px-4 lg:px-6 h-[4rem] lg:h-[6rem]">
          {/* Logo */}
          <a className="block w-[15rem] xl:mr-8" href="#hero" aria-label="Home">
            <img
              src={WaslaOne}
              width={100}
              height={70}
              alt="Wasla One"
              className="h-30 w-auto object-contain drop-shadow-[0_6px_18px_rgba(140,70,255,0.18)] transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Desktop nav (kept visually similar but upgraded) */}
          <nav
            aria-label="Primary"
            className={`hidden lg:flex lg:mx-auto lg:items-center`}
          >
            <div className="flex items-center gap-2">
              {navigation.map((item) => {
                const active = item.url === pathname.hash;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    onClick={handleClick}
                    className={`
    group relative font-mono font-semibold uppercase text-sm tracking-wider px-6 py-4
    transition-all duration-300
    ${active ? "text-white" : "text-white/70 hover:text-white"}
  `}
                  >
                    {/* Text */}
                    <span className="relative z-10">{item.title}</span>

                    {/* Hover Underline - premium neon glow */}
                    <span
                      className={`
      absolute left-6 right-6 bottom-2 h-[2px] rounded-full
      bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-300
      transform scale-x-0 group-hover:scale-x-100
      transition-transform duration-500 ease-out
      shadow-[0_0_10px_rgba(170,60,255,0.6)]
      ${active ? "scale-x-100" : ""}
    `}
                    />
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right: Hamburger for mobile (keeps your Button usage) */}
          <div className="ml-auto lg:hidden">
            <Button
              px="px-3"
              onClick={toggleNavigation}
              aria-expanded={openNavigation}
              aria-controls="mobile-menu"
              className="transition-transform duration-200"
            >
              <MenuSvg openNavigation={openNavigation} />
            </Button>
          </div>

          {/* Right area on desktop (call to action) */}
          <div className="hidden lg:flex lg:items-center ml-auto gap-4">
            {/* Example CTA — keep or remove */}
            <a
              href="/pricing"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-[0_8px_30px_rgba(140,60,255,0.14)] hover:brightness-105 transition"
            >
              Get started
            </a>

            <HamburgerMenu />
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu (non-transparent to fix the issue) */}
      <AnimatePresence>
        {openNavigation && (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[rgba(5,2,12,0.98)] to-[rgba(6,3,18,0.96)] backdrop-blur-2xl border-t border-white/6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              onClick={() => {
                enablePageScroll();
                setOpenNavigation(false);
              }}
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative m-auto w-[94%] max-w-md bg-[rgba(12,6,26,0.75)] backdrop-blur-xl border border-white/8 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <a href="#hero" onClick={handleClick} aria-label="Home">
                  <img
                    src={WaslaOne}
                    width={120}
                    height={50}
                    alt="Wasla One"
                    className="object-contain"
                  />
                </a>

                <button
                  onClick={() => {
                    enablePageScroll();
                    setOpenNavigation(false);
                  }}
                  aria-label="Close menu"
                  className="p-2 rounded-lg bg-white/6 hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    onClick={handleClick}
                    className="block px-4 py-3 rounded-xl text-left font-semibold text-white/90 hover:bg-white/6 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono uppercase tracking-wide">
                        {item.title}
                      </span>
                      <span className="text-xs text-white/50">
                        {item.subtitle}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-white/50 mt-2">
                        {item.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/6">
                <a
                  href="/pricing"
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-[0_12px_40px_rgba(140,60,255,0.18)] transition"
                >
                  Start Building
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
