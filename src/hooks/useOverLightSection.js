import { useEffect, useState } from "react";

// True while the fixed header (site name + menu button) sits over a section
// marked with data-header-light (a white background), so the header can
// switch from white-with-shadow to black there. Only checked when `enabled`.
const HEADER_Y = 36; // vertical middle of the fixed header, in px

export default function useOverLightSection(enabled) {
  const [overLight, setOverLight] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setOverLight(false);
      return;
    }
    let frame = 0;
    const check = () => {
      frame = 0;
      const hit = [...document.querySelectorAll("[data-header-light]")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= HEADER_Y && r.bottom >= HEADER_Y;
      });
      setOverLight(hit);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return overLight;
}
