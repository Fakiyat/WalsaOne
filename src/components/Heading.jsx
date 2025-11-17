import { useEffect, useRef } from "react";
import TagLine from "./Tagline";
import { loadScrollTrigger } from "../utils/gsapLoader";

const Heading = ({ className, title, text, tag }) => {
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const subtitleRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const headingEl = headingRef.current;
    if (!headingEl || !container) return;

    let st;
    let cancelled = false;

    const init = async () => {
      const { gsap, ScrollTrigger } = await loadScrollTrigger();
      if (cancelled) return;

      const alreadySplit =
        headingEl.querySelectorAll(".heading-letter").length > 0;
      if (!alreadySplit) {
        const letters = headingEl.textContent.trim().split("");
        headingEl.innerHTML = letters
          .map(
            (char) =>
              `<span class="heading-letter inline-block" aria-hidden="true">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");
      }

      const letterElems = headingEl.querySelectorAll(".heading-letter");

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      tl.to(letterElems, {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.025,
      });

      const randomizeLetters = () => {
        gsap.set(letterElems, {
          opacity: 0,
          x: () => gsap.utils.random(-220, 220),
          y: () => gsap.utils.random(-140, 140),
          rotate: () => gsap.utils.random(-75, 75),
          scale: 0.92,
        });
      };

      randomizeLetters();

      st = ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => {
          randomizeLetters();
          tl.restart();
        },
        onEnterBack: () => {
          randomizeLetters();
          tl.restart();
        },
        onLeave: () => {
          tl.reverse();
        },
        onLeaveBack: () => {
          tl.reverse();
        },
      });

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "+= -0.4"
        );
      }
    };

    init();

    return () => {
      cancelled = true;
      st?.kill();
      tlRef.current?.kill();
    };
  }, [title, text]);

  return (
    <div
      ref={containerRef}
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}

      {title && (
        <h2
          ref={headingRef}
          className="h2 leading-[1.15] text-white"
          style={{ display: "inline-block" }}
        >
          {title}
        </h2>
      )}

      {text && (
        <p ref={subtitleRef} className="body-2 mt-4 text-n-4 max-w-2xl mx-auto">
          {text}
        </p>
      )}
    </div>
  );
};

export default Heading;
