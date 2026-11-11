import React from "react";
import { Link } from "react-router-dom";

// Small text style for the menu footer links (the site name itself is 23px).
export const siteTextClass = "text-[18px] leading-none";

// Site name, fixed top-left on every page (outside the content column).
// White + mix-blend-difference, like the menu button, so it reads on light
// pages, over the reel images and on the open menu. Clicking it goes home.
export default function SiteName() {
  return (
    <Link
      to="/"
      className={`fixed top-6 left-6 z-[55] text-[23px] leading-none whitespace-nowrap text-white mix-blend-difference hover:underline underline-offset-4`}
    >
      Agostina Boris
    </Link>
  );
}
