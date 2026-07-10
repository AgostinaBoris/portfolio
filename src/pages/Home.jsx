import React, { useEffect, useState } from "react";
import { HiArrowNarrowRight, HiSparkles, HiOutlineDownload } from "react-icons/hi";
import { Link } from "react-router-dom";
import mockupFrameoSplash from "../assets/mockups/mockup-frameo-splash.webp";
import mockupOnetapSplash from "../assets/mockups/mockup-onetap-splash.webp";
import mockupInFocus from "../assets/mockups/mockup-infocus.webp";
import mockupBoutiqueHero from "../assets/mockups/mockup-boutique-hero.webp";
import CV from "../assets/cv/boris-agostina-cv.pdf";

const skillTags = [
  "React",
  "JavaScript",
  "Next.js",
  "Figma",
  "Product Design",
  "Prototyping",
];

// Single fan of 4 cards, staggered diagonally within the mockups column.
const fanA = [
  { img: mockupFrameoSplash, label: "Frameo", sub: "Streaming Splash", x: -205, y: 0, angle: -10, z: 10 },
  { img: mockupOnetapSplash, label: "OneTap", sub: "Finance Splash", x: -70, y: 40, angle: -6, z: 20 },
  { img: mockupInFocus, label: "In Focus Studio", sub: "Photography Hero", x: 70, y: 80, angle: -2, z: 30 },
  { img: mockupBoutiqueHero, label: "Sophie's Boutique", sub: "Home Hero", x: 205, y: 120, angle: 2, z: 40 },
];

function Fan({ cards, className = "", open, onToggle }) {
  return (
    <div
      style={{ perspective: "1600px" }}
      onClick={onToggle}
      className={`cursor-pointer grid grid-cols-2 gap-x-4 gap-y-6 md:block md:relative md:h-[460px] lg:h-[540px] xl:h-[600px] md:w-[600px] lg:w-[700px] xl:w-[820px] ${className}`}
    >
      {cards.map(({ img, label, sub, x, y, angle, z }, i) => (
        <div
          key={`${label}-${sub}`}
          style={{
            zIndex: z,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
            "--x": `${open ? x : 0}px`,
            "--y": `${open ? y : 0}px`,
            "--angle": `${open ? angle : 0}deg`,
            "--rotY": `${open ? angle * 0.9 : 0}deg`,
            "--z": `${open ? Math.abs(angle) * 2 : 0}px`,
            transitionDelay: `${i * 110}ms`,
          }}
          className="group relative bg-surface border border-border rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.45)] p-4 sm:p-5
            md:absolute md:left-1/2 md:bottom-0 md:w-64 lg:w-80 xl:w-96
            md:[transform:translateX(calc(-50%_+_var(--x)))_translateY(var(--y))_rotateZ(var(--angle))_rotateY(var(--rotY))_translateZ(var(--z))]
            md:hover:[transform:translateX(calc(-50%_+_var(--x)))_translateY(calc(var(--y)_-_18px))_rotateZ(var(--angle))_rotateY(0deg)_translateZ(60px)]
            md:transition-transform md:duration-700 md:ease-out
            hover:z-50"
        >
          <p className="text-base font-bold text-primary-dark truncate">{label}</p>
          <p className="text-sm text-muted mb-2 truncate">{sub}</p>
          <img
            src={img}
            alt={`${label} ${sub} mockup`}
            className="w-full aspect-[9/13] rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [fansOpen, setFansOpen] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroIn(true), 50);
    const t2 = setTimeout(() => setFansOpen(true), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const titleClass = () =>
    `transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
  const nameClass = () =>
    `transition-all duration-[900ms] ease-out ${heroIn ? "opacity-100 translate-y-0 scale-100 blur-none" : "opacity-0 translate-y-12 scale-90 blur-sm"}`;
  const titleStyle = (delay) => ({ transitionDelay: `${delay}ms` });

  return (
    <div name="home" className="relative w-full min-h-screen pt-[90px] bg-background overflow-x-hidden">
      {/* Decorative background blobs: soft, blurred, layered for a delicate 3D depth feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-20 w-[26rem] h-[26rem] bg-accent/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-1/4 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-10 left-1/3 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl" />
      </div>

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-[1680px] px-8 xl:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-14 lg:gap-20 min-h-[calc(100vh-90px)] py-10">
        {/* Text content */}
        <div className="flex flex-col justify-center lg:w-[38%] lg:shrink-0">
          <span style={titleStyle(0)} className={`inline-flex w-fit items-center gap-2 text-base font-semibold text-primary bg-accent/20 border border-border rounded-full px-5 py-2 mb-6 ${titleClass(0)}`}>
            <HiSparkles /> PRODUCT DESIGN · FRONT-END · DIGITAL EXPERIENCES
          </span>
          <p style={titleStyle(90)} className={`text-muted text-2xl mb-1 ${titleClass(90)}`}>Hi, my name is</p>
          <h1 className="text-6xl sm:text-8xl py-3 font-bold whitespace-nowrap">
            <span style={titleStyle(180)} className={`inline-block mr-4 text-primary-dark ${nameClass()}`}>
              Agostina
            </span>
            <span style={titleStyle(320)} className={`inline-block text-primary ${nameClass()}`}>
              Boris
            </span>
          </h1>
          <h2 style={titleStyle(360)} className={`text-4xl sm:text-6xl py-3 mt-2 font-bold text-primary-dark max-w-[900px] ${titleClass(360)}`}>
           Product Designer &amp; Front-End Developer
          </h2>
          <p className="text-muted text-2xl py-6 max-w-[700px]">
            I design clear, accessible digital products and build responsive
            front-end experiences. My work combines research, interface
            design, prototyping, and development to turn ideas into
            functional products.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="work" exact="true"
              className="text-white text-lg bg-primary w-fit whitespace-nowrap px-8 py-5 my-2 flex font-bold items-center rounded-lg hover:bg-primary-dark duration-300"
            >
              View Work <HiArrowNarrowRight className="mx-4 w-12"/>{" "}
            </Link>
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-lg border border-primary w-fit whitespace-nowrap px-8 py-5 my-2 flex gap-3 font-bold items-center rounded-lg hover:bg-primary hover:text-white duration-300"
            >
              Download CV <HiOutlineDownload size={22} />
            </a>
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            {skillTags.map((tag) => (
              <span
                key={tag}
                className="text-base text-primary-dark bg-surface border border-border rounded-full px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project mockups: one fan of 4 cards, staggered diagonally within
            the mockups column. Falls back to a plain 2-column grid on
            mobile, where there's no room to fan out. */}
        <div className="lg:flex-1 flex flex-col items-center justify-center">
          <Fan
            cards={fanA}
            open={fansOpen}
            onToggle={() => setFansOpen((o) => !o)}
            className="max-w-sm md:max-w-none mx-auto lg:translate-x-14 xl:translate-x-24 lg:translate-y-8 xl:translate-y-10"
          />
        </div>
      </div>
    </div>
  );
}
