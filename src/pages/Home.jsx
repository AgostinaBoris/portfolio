import React from "react";
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
import CV from "../assets/cv/cv boris agostina.pdf";

const skillTags = ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"];

// Each mockup: image + label + a 2D tilt/depth "3D card stack" treatment
// (rotation + shadow + z-index) so the deck reads as layered without
// relying on true rotateY, which doesn't compose with Tailwind's hover utilities.
const mockups = [
  { img: mockupFrameoSplash, label: "Frameo", sub: "Streaming Splash", tilt: "rotate-6", z: 20 },
  { img: mockupOnetapSplash, label: "OneTap", sub: "Finance Splash", tilt: "-rotate-6", z: 30 },
  { img: mockupInFocus, label: "In Focus Studio", sub: "Photography Hero", tilt: "rotate-3", z: 40 },
  { img: mockupBoutiqueHero, label: "Sophie's Boutique", sub: "Home Hero", tilt: "-rotate-8", z: 20 },
  { img: mockupBoutiqueCollection, label: "Sophie's Boutique", sub: "Collection Grid", tilt: "rotate-8", z: 30 },
  { img: mockupInFocusGallery, label: "In Focus Studio", sub: "Gallery", tilt: "-rotate-4", z: 20 },
  { img: mockupSushi, label: "Akari Sushi", sub: "Restaurant Hero", tilt: "rotate-10", z: 10 },
  { img: mockupSushiGallery, label: "Akari Sushi", sub: "Signature Gallery", tilt: "-rotate-10", z: 20 },
];

export default function Home() {
  return (
    <div name="home" className="w-full min-h-screen pt-[90px] pl-10 bg-background overflow-x-hidden">
      {/* Container */}
      <div className="mx-auto px-8 flex flex-col lg:flex-row lg:items-center gap-12 min-h-[calc(100vh-90px)] py-10">
        {/* Text content */}
        <div className="flex flex-col justify-center lg:w-2/5 lg:shrink-0">
          <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary bg-accent/20 border border-border rounded-full px-4 py-1.5 mb-4">
            <HiSparkles /> UX/UI DESIGNER · FRONT-END DEVELOPER
          </span>
          <p className="text-muted text-xl">Hi, my name is</p>
          <h1 className="text-4xl sm:text-6xl py-2 font-bold text-primary-dark">
            Agostina
          </h1>
          <h1 className="text-4xl sm:text-6xl py-2 font-bold text-primary">
            Aldana Boris
          </h1>
          <h2 className="text-2xl sm:text-4xl py-2 font-bold text-primary-dark max-w-[900px]">
           UX/UI Designer &amp; Front-End Developer
          </h2>
          <p className="text-muted text-lg py-4 max-w-[650px]">
            I'm a UX/UI Designer and Front-End Developer focused on creating
            intuitive, accessible, and visually refined digital products. My
            work combines user research, interface design, prototyping, and
            front-end development to build experiences that are clear,
            functional, and engaging.
          </p>
          <div className="flex flex-wrap gap-4">
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
          <div className="flex flex-wrap gap-2 pt-2">
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

        {/* Project mockups: layered 3D-style card deck, contained within the hero */}
        <div className="lg:w-3/5 [perspective:1600px]">
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 max-w-md sm:max-w-xl mx-auto">
            {mockups.map(({ img, label, sub, tilt, z }, i) => (
              <div
                key={`${label}-${sub}`}
                style={{ zIndex: z }}
                className={`relative bg-surface border border-border rounded-2xl shadow-2xl p-2 sm:p-3 duration-300 ${tilt} ${
                  i >= 2 ? "md:-mt-10" : ""
                } hover:rotate-0 hover:z-50 hover:scale-110`}
              >
                <p className="text-[11px] sm:text-xs font-bold text-primary-dark truncate">{label}</p>
                <p className="text-[10px] sm:text-[11px] text-muted mb-2 truncate">{sub}</p>
                <img
                  src={img}
                  alt={`${label} ${sub} mockup`}
                  className="w-full aspect-[9/13] rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
