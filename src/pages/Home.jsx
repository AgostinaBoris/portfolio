import React, { useEffect, useState } from "react";
import { HiArrowNarrowRight, HiSparkles, HiOutlineDownload } from "react-icons/hi";
import { Link } from "react-router-dom";
import mockupFrameoSplash from "../assets/mockups/mockup-frameo-splash.webp";
import mockupOnetapSplash from "../assets/mockups/mockup-onetap-splash.webp";
import mockupInFocus from "../assets/mockups/mockup-infocus.webp";
import mockupBoutiqueHero from "../assets/mockups/mockup-boutique-hero.webp";
import mockupBoutiqueCollection from "../assets/mockups/mockup-boutique-collection.webp";
import mockupInFocusGallery from "../assets/mockups/mockup-infocus-gallery.webp";
import mockupSushi from "../assets/mockups/mockup-sushi.webp";
import mockupSushiGallery from "../assets/mockups/mockup-sushi-gallery.webp";
import CV from "../assets/cv/boris-agostina-cv.pdf";

const skillTags = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind",
  "UX Research",
  "UI Design",
  "Figma",
  "Prototyping",
];

// Two smaller fans (4 cards each) read more clearly than one wide 8-card fan
// and can be staggered diagonally within the mockups column without reaching
// back into the text column. `x`/`angle` are relative to each fan's own center.
const fanA = [
  { img: mockupFrameoSplash, label: "Frameo", sub: "Streaming Splash", x: -108, angle: -16, z: 10 },
  { img: mockupOnetapSplash, label: "OneTap", sub: "Finance Splash", x: -36, angle: -6, z: 20 },
  { img: mockupInFocus, label: "In Focus Studio", sub: "Photography Hero", x: 36, angle: 6, z: 30 },
  { img: mockupBoutiqueHero, label: "Sophie's Boutique", sub: "Home Hero", x: 108, angle: 16, z: 40 },
];

const fanB = [
  { img: mockupBoutiqueCollection, label: "Sophie's Boutique", sub: "Collection Grid", x: -108, angle: -16, z: 10 },
  { img: mockupInFocusGallery, label: "In Focus Studio", sub: "Gallery", x: -36, angle: -6, z: 20 },
  { img: mockupSushi, label: "Akari Sushi", sub: "Restaurant Hero", x: 36, angle: 6, z: 30 },
  { img: mockupSushiGallery, label: "Akari Sushi", sub: "Signature Gallery", x: 108, angle: 16, z: 40 },
];

function Fan({ cards, className = "", open }) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-6 md:block md:relative md:h-[260px] lg:h-[300px] xl:h-[340px] md:w-[340px] lg:w-[400px] xl:w-[480px] ${className}`}>
      {cards.map(({ img, label, sub, x, angle, z }, i) => (
        <div
          key={`${label}-${sub}`}
          style={{
            zIndex: z,
            transformOrigin: "bottom center",
            "--x": `${open ? x : 0}px`,
            "--angle": `${open ? angle : 0}deg`,
            transitionDelay: `${i * 110}ms`,
          }}
          className="group relative bg-surface border border-border rounded-2xl shadow-2xl p-2 sm:p-3
            md:absolute md:left-1/2 md:bottom-0 md:w-32 lg:w-40 xl:w-52
            md:[transform:translateX(calc(-50%_+_var(--x)))_rotate(var(--angle))]
            md:transition-transform md:duration-700 md:ease-out
            hover:z-50"
        >
          <p className="text-xs font-bold text-primary-dark truncate">{label}</p>
          <p className="text-[11px] text-muted mb-2 truncate">{sub}</p>
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
      <div className="relative z-10 mx-auto max-w-[1360px] px-8 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-10 lg:gap-14 min-h-[calc(100vh-90px)] py-10">
        {/* Text content */}
        <div className="flex flex-col justify-center lg:w-2/5 lg:shrink-0 lg:pl-4 xl:pl-6">
          <span style={titleStyle(0)} className={`inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary bg-accent/20 border border-border rounded-full px-4 py-1.5 mb-6 ${titleClass(0)}`}>
            <HiSparkles /> UX/UI DESIGNER · FRONT-END DEVELOPER
          </span>
          <p style={titleStyle(90)} className={`text-muted text-2xl mb-1 ${titleClass(90)}`}>Hi, my name is</p>
          <h1 style={titleStyle(180)} className={`text-5xl sm:text-7xl py-3 font-bold text-primary-dark ${nameClass()}`}>
            Agostina
          </h1>
          <h1 style={titleStyle(320)} className={`text-5xl sm:text-7xl py-3 font-bold text-primary ${nameClass()}`}>
            Aldana Boris
          </h1>
          <h2 style={titleStyle(360)} className={`text-3xl sm:text-5xl py-3 mt-2 font-bold text-primary-dark max-w-[900px] ${titleClass(360)}`}>
           UX/UI Designer &amp; Front-End Developer
          </h2>
          <p className="text-muted text-xl py-6 max-w-[650px]">
            I'm a UX/UI Designer and Front-End Developer focused on creating
            intuitive, accessible, and visually refined digital products. My
            work combines user research, interface design, prototyping, and
            front-end development to build experiences that are clear,
            functional, and engaging.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="work" exact="true"
              className="text-white bg-primary w-fit whitespace-nowrap px-6 py-4 my-2 flex font-bold items-center rounded-lg hover:bg-primary-dark duration-300"
            >
              View Work <HiArrowNarrowRight className="mx-4 w-12"/>{" "}
            </Link>
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border border-primary w-fit whitespace-nowrap px-6 py-4 my-2 flex gap-3 font-bold items-center rounded-lg hover:bg-primary hover:text-white duration-300"
            >
              Download CV <HiOutlineDownload size={20} />
            </a>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            {skillTags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-primary-dark bg-surface border border-border rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project mockups: two smaller fans staggered diagonally (top-left,
            bottom-right) within the mockups column. Falls back to plain
            2-column grids on mobile, where there's no room to fan out. */}
        <div className="lg:w-3/5 flex flex-col gap-10 md:gap-6 items-center">
          <Fan cards={fanA} open={fansOpen} className="max-w-xs md:max-w-none mx-auto md:-translate-x-6 lg:translate-x-0 xl:-translate-x-8" />
          <Fan cards={fanB} open={fansOpen} className="max-w-xs md:max-w-none mx-auto md:translate-x-6 lg:translate-x-0 xl:translate-x-8" />
        </div>
      </div>
    </div>
  );
}
