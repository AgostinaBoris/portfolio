import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProjectReel from "../components/ProjectReel/ProjectReel";
import Intro from "../components/Intro/Intro";

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

  return (
    <div name="home" className="relative w-full bg-background">
      {/* First visit per session: intro line, then a wipe up to the reel. */}
      <Intro />
      {/* Selected work: the reel starts at the very top of the page */}
      <div id="work" className="w-full">
        <ProjectReel />
      </div>
    </div>
  );
}
