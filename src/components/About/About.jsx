import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { bodyClass, eyebrowClass } from "../Layout/PageColumn";
import CV from "../../assets/cv/boris-agostina-cv.pdf";
import photo from "../../assets/yop.jpg";
import useReveal from "../../hooks/useReveal";

// Editorial About block, same system as Process and Expertise: eyebrow,
// statement, body, closing line, Resume button, then a straight black-and-white
// photo below, all on the shared column's left edge.
export default function About() {
  // Fade-in on scroll, as the original About block had.
  const [ref, inView] = useReveal();

  return (
    <section id="about" ref={ref} className={`reveal ${inView ? "reveal-in" : ""} text-text`}>
      <p className={eyebrowClass}>About</p>

      <p className="mt-4 md:mt-6 text-2xl md:text-[2.25rem] font-normal leading-[1.3] text-text">
        Most products don't fail because of how they look. They fail in the gaps: between what users need and what
        gets prioritized, between what's designed and what actually gets built. Every handoff loses something — a
        state nobody designed, an edge case nobody tested, a decision nobody explained.
      </p>

      <p className={`mt-12 md:mt-20 ${bodyClass}`}>
        I work in those gaps. I research to find the real problem, design the interface and build it myself, so the
        original intent survives all the way to production. I've also spent six years teaching, leading classrooms
        of forty kids, which turned out to be the best training I know for making complex things clear and
        explaining the why behind every decision.
      </p>

      <p className="mt-12 md:mt-20 text-[25px] md:text-[33px] font-normal leading-[1.3] text-text">
        Clear products, built the way they were designed. That is what I do.
      </p>

      {/* Same button style as the old About hero. */}
      <a
        href={CV}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-btn mt-10 md:mt-12 inline-flex items-center gap-2 border border-text/20 text-text text-lg font-semibold px-9 py-4 rounded-full hover:border-text"
      >
        Resume <HiOutlineDownload className="hero-btn-icon" size={18} />
      </a>

      <img
        src={photo}
        alt="Agostina Boris"
        className="mt-16 md:mt-24 block w-full max-w-[400px] md:w-[320px] h-auto grayscale"
      />
    </section>
  );
}
