import React, { useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { eyebrowClass, headingClass } from "../Layout/PageColumn";
import { testimonials } from "../../utils/testimonials";

const SWIPE_PX = 50;

// Quote: 22px at 390 → 36px at 1440 (same fluid scale as the inner pages).
const quoteClass =
  "mx-auto max-w-[22em] text-[length:clamp(22px,16.8px+1.333vw,36px)] font-normal leading-[1.35] text-text";

function ArrowButton({ dir, onClick }) {
  const Icon = dir === "prev" ? HiOutlineChevronLeft : HiOutlineChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-text text-text transition-colors duration-200 hover:bg-text hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text"
    >
      <Icon aria-hidden="true" size={18} />
    </button>
  );
}

// Home testimonials: one quote at a time, centred. All quotes sit in the same
// grid cell, so the box always has the height of the tallest one (at the
// current width) and the page never jumps; the active one crossfades in with a
// small upward slide (instant with reduced motion). Arrows loop; left/right
// keys work while focus is inside; swipe on touch screens. No autoplay.
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const touch = useRef(null);

  const go = (step) => setIndex((i) => (i + step + count) % count);
  const prev = () => go(-1);
  const next = () => go(1);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  const counter = (
    <p className="text-[15px] leading-none text-muted tabular-nums" aria-hidden="true">
      {index + 1} / {count}
    </p>
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={onKeyDown}
      className="w-full bg-background py-24 md:py-40 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-[8vw] text-center text-text"
    >
      <p className={eyebrowClass}>Testimonials</p>
      <h2 className={`mt-4 md:mt-6 ${headingClass}`}>What clients say</h2>

      <div className="mt-12 md:mt-20 flex items-center justify-center gap-10">
        <div className="hidden md:block">
          <ArrowButton dir="prev" onClick={prev} />
        </div>

        <div
          tabIndex={0}
          aria-live="polite"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="grid min-w-0 flex-1 max-w-[880px] touch-pan-y focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-text"
        >
          {testimonials.map((t, i) => {
            const active = i === index;
            return (
              <figure
                key={t.name}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                className={`[grid-area:1/1] transition-[opacity,transform] duration-[400ms] ease-out motion-reduce:transition-none ${
                  active ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-3"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="block select-none text-[length:clamp(72px,58.63px+3.429vw,108px)] font-normal leading-[0.8] h-[0.45em] text-muted"
                >
                  “
                </span>
                <blockquote lang={t.lang} className={`mt-4 md:mt-6 ${quoteClass}`}>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-8 md:mt-10">
                  <span className="block text-[18px] font-medium leading-snug text-text">{t.name}</span>
                  <span className="mt-1 block text-[15px] md:text-base leading-snug text-muted">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="hidden md:block">
          <ArrowButton dir="next" onClick={next} />
        </div>
      </div>

      {/* Desktop: counter alone, centred. Mobile: ‹ 1 / 4 › on one row. */}
      <div className="mt-10 md:mt-14 flex items-center justify-center gap-6">
        <div className="md:hidden">
          <ArrowButton dir="prev" onClick={prev} />
        </div>
        {counter}
        <div className="md:hidden">
          <ArrowButton dir="next" onClick={next} />
        </div>
      </div>
    </section>
  );
}
