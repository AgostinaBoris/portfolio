import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/home/Header";
import MenuOverlay from "../components/home/MenuOverlay";
import IntroSection from "../components/home/IntroSection";
import WorkSection from "../components/home/WorkSection";
import AboutSection from "../components/home/AboutSection";
import ProcessSection from "../components/home/ProcessSection";
import ContactSection from "../components/home/ContactSection";
import HomeFooter from "../components/home/HomeFooter";

// Temporary skeleton of the new home, served at /new for comparison.
export default function HomeNew() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The global CSS offsets anchors by 90px for the old opaque navbar; this
  // header is transparent, so anchors and snap points start at the very top.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = "0px";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => {
      root.style.scrollPaddingTop = prev;
    };
  }, []);

  return (
    <div className="relative w-full bg-background text-text">
      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <main>
        <IntroSection />
        <WorkSection />
        <AboutSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <HomeFooter />
    </div>
  );
}
