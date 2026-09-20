import React, { useEffect, useRef } from "react";
import { HiOutlineDownload, HiArrowDown, HiOutlineMail } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import YO from "../assets/yop.jpg";
import CV from "../assets/cv/boris-agostina-cv.pdf";
import Projects from "../components/Projects/Projects";
import useReveal from "../hooks/useReveal";

function renderLetters(text, startDelay, step = 45) {
  return Array.from(text).map((char, i) => (
    <span
      key={i}
      className="letter-bounce"
      style={{ animationDelay: `${startDelay + i * step}ms` }}
    >
      {char === " " ? " " : char}
    </span>
  ));
}

const aboutParagraphs = [
  "I’m a Product Designer and Front-End Developer who enjoys turning ideas into simple, thoughtful digital experiences.",
  "With a background in both design and development, I’m comfortable moving between understanding what people need, exploring solutions, and thinking about how those ideas will actually be built.",
  "I care about creating products that feel clear, useful, and easy to use. I enjoy collaborating with others, asking questions, learning along the way, and paying attention to the details that make an experience feel just right.",
];

export default function Home() {
  const location = useLocation();

  // Smooth-scroll to a section when the URL carries a hash — either from
  // clicking a nav anchor while already on "/", or from landing on "/#id"
  // from another route.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    const el = document.querySelector(location.hash);
    if (!el) return;
    const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, location.key]);

  const [workRef, workIn] = useReveal();
  const [aboutRef, aboutIn] = useReveal();
  const [contactRef, contactIn] = useReveal();

  const [workTitleRef, workTitleIn] = useReveal();
  const [aboutTitleRef, aboutTitleIn] = useReveal();
  const [contactTitleRef, contactTitleIn] = useReveal();

  const heroPhotoRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleHeroPhotoMouseMove = (e) => {
    if (reducedMotionRef.current) return;
    const img = heroPhotoRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * 52; // max ~26deg at the edges
    const rotateX = -py * 52;
    img.style.transition = "none";
    img.style.transform = `rotate(2deg) scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleHeroPhotoMouseLeave = () => {
    const img = heroPhotoRef.current;
    if (!img) return;
    img.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
    img.style.transform = "";
    window.setTimeout(() => {
      if (img) img.style.transition = "";
    }, 420);
  };

  return (
    <div name="home" className="relative w-full bg-background">
      {/* Hero — minimal and typography-led: no background artwork, no
          texture, just generous space and one confident headline. */}
      <div className="w-full bg-surface pt-[90px]">
        <div className="min-h-[55vh] flex flex-col items-center justify-center px-6 py-12 text-center">
          <h1 className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-[clamp(44px,5.5vw,100px)] font-extrabold text-text leading-[1] tracking-tight">
            <span>{renderLetters("Hi,", 0)}</span>
            <span
              className="hero-photo-wrap opacity-0 animate-fade-up [animation-delay:160ms]"
              onMouseMove={handleHeroPhotoMouseMove}
              onMouseLeave={handleHeroPhotoMouseLeave}
            >
              <img
                ref={heroPhotoRef}
                src={YO}
                alt="Agostina Boris"
                className="hero-photo w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl object-cover shadow-sm"
              />
            </span>
            <span>{renderLetters("I’m Agostina!", 280)}</span>
          </h1>
          <p className="opacity-0 animate-fade-up [animation-delay:950ms] mt-10 text-2xl sm:text-[26px] text-muted leading-[1.5] max-w-[760px] mx-auto">
            A Product Designer and Front-End Developer who researches, designs
            and builds — turning unclear products into interfaces people can
            actually use.
          </p>
          <div className="opacity-0 animate-fade-up [animation-delay:1100ms] flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/work"
              className="hero-btn bg-primary text-white text-lg font-semibold px-9 py-4 rounded-full hover:bg-primary-dark"
            >
              View Work
            </Link>
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn flex items-center gap-2 border border-text/20 text-text text-lg font-semibold px-9 py-4 rounded-full hover:border-text"
            >
              Resume <HiOutlineDownload className="hero-btn-icon" size={18} />
            </a>
          </div>
          <span className="opacity-0 animate-fade-up [animation-delay:1250ms] inline-block mt-10">
            <HiArrowDown className="hero-arrow-bounce mx-auto text-muted" size={22} />
          </span>
        </div>
      </div>

      {/* Selected work */}
      <div
        id="work"
        ref={workRef}
        className={`reveal ${workIn ? "reveal-in" : ""} w-full max-w-none px-[clamp(24px,2.5vw,48px)] py-24 scroll-mt-[90px]`}
      >
        <h2
          ref={workTitleRef}
          className={`title-reveal ${workTitleIn ? "title-reveal-in" : ""} text-4xl sm:text-5xl font-bold text-text text-center mb-16`}
        >
          Selected Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(32px,2vw,40px)]">
          <Projects limit={4} />
        </div>
      </div>

      {/* About Me */}
      <div
        id="about"
        ref={aboutRef}
        className={`reveal ${aboutIn ? "reveal-in" : ""} w-full py-24 px-6 scroll-mt-[90px]`}
      >
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-x-16 lg:gap-x-20 gap-y-12 sm:items-center">
          <div className="max-w-[640px]">
            <h2
              ref={aboutTitleRef}
              className={`title-reveal ${aboutTitleIn ? "title-reveal-in" : ""} text-[clamp(48px,3vw,56px)] font-bold leading-[1.05] text-text mb-8`}
            >
              About Me
            </h2>
            <div className="space-y-7">
              {aboutParagraphs.map((p) => (
                <p key={p} className="text-[clamp(20px,1.25vw,22px)] leading-[1.6] text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <img
              src={YO}
              alt="Agostina Boris"
              className="w-full max-w-[380px] sm:max-w-[440px] aspect-square rounded-2xl object-cover rotate-3 shadow-lg transition-transform duration-300 hover:rotate-0"
            />
          </div>
        </div>
      </div>

      {/* Let's Connect */}
      <div
        id="contact"
        ref={contactRef}
        className={`reveal ${contactIn ? "reveal-in" : ""} w-full bg-surface py-28 px-6 scroll-mt-[90px]`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base sm:text-lg font-semibold uppercase tracking-[0.1em] text-muted">
            Like what you see?
          </p>
          <h2
            ref={contactTitleRef}
            className={`title-reveal ${contactTitleIn ? "title-reveal-in" : ""} mt-3 text-6xl sm:text-7xl md:text-8xl font-bold text-text`}
          >
            Let&rsquo;s Connect!
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white text-lg font-semibold px-9 py-4 rounded-full transition-all duration-200 hover:bg-primary-dark hover:scale-[1.03] active:scale-[0.97]"
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/agostinaboris/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-text/20 text-text text-lg font-semibold px-9 py-4 rounded-full transition-all duration-200 hover:border-text hover:scale-[1.03] active:scale-[0.97]"
            >
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </div>
          <a
            href="mailto:borisagostina@gmail.com"
            className="mt-8 inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-text"
          >
            <HiOutlineMail size={18} /> borisagostina@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
