import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteTextClass } from "./SiteName";
import CV from "../../assets/cv/boris-agostina-cv.pdf";

const EMAIL = "borisagostina@gmail.com";

// No "Home": the site name (top-left) goes home. All items evenly spaced.
const links = [
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Expertise", to: "/expertise" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

// White items; hovering one (or keyboard-focusing one) dims the others to 50%.
const itemClass =
  "pointer-events-auto inline-block text-[30px] md:text-[66px] font-normal leading-[1.05] tracking-tight text-white transition-opacity duration-200 group-hover/list:opacity-50 group-[:has(:focus-visible)]/list:opacity-50 hover:!opacity-100 focus-visible:!opacity-100 focus:outline-none focus-visible:underline underline-offset-8 decoration-2";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Site-wide menu: a single fixed hamburger (top-right, no bar) that opens a
// full-screen overlay. White + mix-blend-difference so the button reads on
// light pages, dark pages and over the reel images/videos.
export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const firstLinkRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const { pathname, key } = useLocation();

  // Any navigation (including the site name link) closes the menu.
  useEffect(() => {
    setOpen(false);
  }, [key]);

  useEffect(() => {
    if (!open) return;

    // Lock page scroll.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the menu.
    firstLinkRef.current && firstLinkRef.current.focus();

    // Escape closes; Tab / Shift+Tab stay inside the button + overlay.
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !wrapRef.current) return;
      const items = [...wrapRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!wrapRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const button = buttonRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Return focus to the toggle.
      button && button.focus();
    };
  }, [open]);

  const line = "absolute left-1/2 h-[1.5px] w-7 -translate-x-1/2 bg-white transition-all duration-300 ease-out";

  return (
    <div ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] h-11 w-11 mix-blend-difference"
      >
        <span className={`${line} ${open ? "top-1/2 rotate-45" : "top-[14px]"}`} />
        <span className={`${line} top-1/2 ${open ? "opacity-0" : "opacity-100"}`} />
        <span className={`${line} ${open ? "top-1/2 -rotate-45" : "top-[29px]"}`} />
      </button>

      {open && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-[#111] text-white"
        >
          {/* Items centred in the overlay, horizontally and vertically. */}
          <nav className="flex flex-1 flex-col items-center justify-center px-6 text-center" aria-label="Main">
            <ul className="group/list pointer-events-none space-y-3 md:space-y-5">
              {links.map((l, i) => (
                <li key={l.label}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    to={l.to}
                    onClick={close}
                    aria-current={pathname === l.to ? "page" : undefined}
                    className={itemClass}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer row, same corners and style as the site name and menu button. */}
          <div className={`flex items-end justify-between gap-6 px-6 pb-6 ${siteTextClass}`}>
            <a href={CV} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
              Resume
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:underline underline-offset-4">
              {EMAIL}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
