import React from "react";
import { blockGap, bodyClass, eyebrowClass, headingClass } from "../Layout/PageColumn";

// Re-exported so existing imports keep working; the tokens live in PageColumn.
export { blockGap, eyebrowClass };

// Shared editorial intro for content sections (Process, Expertise):
// small uppercase eyebrow, large regular-weight heading, body paragraph.
export default function SectionIntro({ eyebrow, heading, children }) {
  return (
    <>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={`mt-4 md:mt-6 max-w-[12ch] ${headingClass}`}>{heading}</h2>
      <p className={`mt-8 md:mt-10 ${bodyClass}`}>{children}</p>
    </>
  );
}
