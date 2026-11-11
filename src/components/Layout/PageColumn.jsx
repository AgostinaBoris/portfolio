import React from "react";

// Shared editorial system for inner pages (About, Process, Expertise, Work,
// Contact) and the menu overlay. Everything aligns to one left edge:
// 24px on mobile, ~8% of the viewport on tablet, ~17% on desktop (≥1280px).
// Breakpoints are Tailwind's defaults: sm 640, md 768, lg 1024, xl 1280.
//
// Fluid sizes are clamp(min, …, max), linear between a 390px and a 1440px
// wide viewport, so type scales smoothly instead of jumping at breakpoints.

// Horizontal padding that sets the column's left edge. On phones it also
// clears a notch / rounded corner in landscape (safe-area insets).
export const columnPad =
  "pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:pl-[8vw] md:pr-[8vw] xl:pl-[17vw] xl:pr-12";

// Max width of the content inside the column.
export const columnMax = "max-w-[880px]";

// Vertical page padding (clears the fixed site name and menu button).
export const pageY = "pt-28 md:pt-36 pb-24 md:pb-36";

// Typography tokens.
export const eyebrowClass = "text-[13px] md:text-sm font-medium uppercase tracking-[0.14em] text-muted";
// 48px at 390 → 60px at 1440.
export const headingClass =
  "font-normal text-[length:clamp(3rem,2.72rem+1.143vw,3.75rem)] leading-[1.02] tracking-tight text-text";
// 17px → 18px; never under 16px, at most 65 characters per line.
export const bodyClass = "max-w-[65ch] text-[length:clamp(17px,16.63px+0.095vw,18px)] leading-[1.55] text-text";
// Large statement text (About): 24px → 36px, and the closing line 25px → 33px.
export const statementClass = "text-[length:clamp(24px,19.54px+1.143vw,36px)] font-normal leading-[1.3] text-text";
export const closingClass = "text-[length:clamp(25px,22.03px+0.762vw,33px)] font-normal leading-[1.3] text-text";

// Space between the intro and the first block below it, and between blocks.
export const blockGap = "mt-16 md:mt-40";

export default function PageColumn({ className = "", children }) {
  return (
    <div className={`w-full bg-background ${columnPad} ${className}`}>
      <div className={columnMax}>{children}</div>
    </div>
  );
}
