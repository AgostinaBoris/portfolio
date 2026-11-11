import React from "react";

// Shared editorial system for inner pages (About, Process, Expertise, Work,
// Contact) and the menu overlay. Everything aligns to one left edge:
// 24px on mobile, ~8% of the viewport on tablet, ~17% on desktop (≥1280px).

// Horizontal padding that sets the column's left edge.
export const columnPad = "px-6 md:pl-[8vw] md:pr-[8vw] xl:pl-[17vw] xl:pr-12";

// Max width of the content inside the column.
export const columnMax = "max-w-[880px]";

// Vertical page padding (clears the fixed site name and menu button).
export const pageY = "pt-28 md:pt-36 pb-24 md:pb-36";

// Typography tokens.
export const eyebrowClass = "text-[13px] md:text-sm font-medium uppercase tracking-[0.14em] text-muted";
export const headingClass = "font-normal text-5xl sm:text-6xl leading-[1.02] tracking-tight text-text";
export const bodyClass = "max-w-[65ch] text-[17px] md:text-[18px] leading-[1.55] text-text";

// Space between the intro and the first block below it, and between blocks.
export const blockGap = "mt-16 md:mt-40";

export default function PageColumn({ className = "", children }) {
  return (
    <div className={`w-full bg-background ${columnPad} ${className}`}>
      <div className={columnMax}>{children}</div>
    </div>
  );
}
