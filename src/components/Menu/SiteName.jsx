import React from "react";
import { Link, useLocation } from "react-router-dom";
import useOverLightSection from "../../hooks/useOverLightSection";

// Small text style for the menu footer links (the site name itself is 23px).
export const siteTextClass = "text-[18px] leading-none";

// Site name, fixed top-left on every page (outside the content column).
// Home: plain white with a soft shadow. Inner pages: white +
// mix-blend-difference, like the menu button, so it reads on light
// pages, over the reel images and on the open menu. Clicking it goes home.
export default function SiteName() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  // Home: black over the white testimonials section.
  const overLight = useOverLightSection(isHome);
  const color = !isHome
    ? "text-white mix-blend-difference"
    : overLight
      ? "text-text transition-colors duration-300"
      : "text-on-media transition-colors duration-300";
  return (
    <>
      {/* Inner pages: a white strip behind the name and menu button so page
          text doesn't run under them while scrolling. Under the menu (z-50). */}
      {pathname !== "/" && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[calc(72px+env(safe-area-inset-top))] md:h-[calc(88px+env(safe-area-inset-top))] bg-background"
        />
      )}
      <Link
      to="/"
      // 11px vertical padding makes a 45px tap target; top is offset by the
      // same amount so the text stays 24px from the edge (or below a notch).
      className={`fixed top-[calc(13px+env(safe-area-inset-top))] left-[max(1.5rem,env(safe-area-inset-left))] z-[55] py-[11px] text-[23px] leading-none whitespace-nowrap ${color} hover:underline underline-offset-4`}
    >
      Agostina Boris
      </Link>
    </>
  );
}
