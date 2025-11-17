let gsapPromise;
let scrollTriggerPromise;
let isScrollTriggerRegistered = false;

export const loadGsap = async () => {
  if (!gsapPromise) {
    gsapPromise = import("gsap").then((module) => module.default);
  }
  return gsapPromise;
};

export const loadScrollTrigger = async () => {
  const gsap = await loadGsap();

  if (!scrollTriggerPromise) {
    scrollTriggerPromise = import("gsap/ScrollTrigger").then(
      (module) => module.ScrollTrigger
    );
  }

  const ScrollTrigger = await scrollTriggerPromise;

  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }

  return { gsap, ScrollTrigger };
};

