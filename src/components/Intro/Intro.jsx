import React, { useEffect, useState } from "react";
import { columnMax, columnPad } from "../Layout/PageColumn";

const KEY = "ab-intro-seen";
const LINE_MS = 600; // line fades/slides up
const HOLD_MS = 1000; // hold
const WIPE_MS = 800; // overlay wipes up (clip-path), see .intro-overlay

function shouldShow() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !window.sessionStorage.getItem(KEY);
  } catch {
    return false; // storage blocked: skip rather than replay on every visit
  }
}

// Home intro, once per session: a white overlay with one italic line on the
// inner-page column, then it wipes up to reveal the first project.
export default function Intro() {
  const [show, setShow] = useState(() => {
    const s = shouldShow();
    // Lets the reel hold the first project's labels until the wipe starts.
    window.__abIntroActive = s;
    return s;
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {}
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setLeaving(true);
      window.__abIntroActive = false;
      window.dispatchEvent(new Event("ab:intro-done"));
    }, LINE_MS + HOLD_MS);
    const t2 = setTimeout(() => setShow(false), LINE_MS + HOLD_MS + WIPE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  if (!show) return null;
  return (
    <div
      aria-hidden="true"
      className={`intro-overlay fixed inset-0 z-[100] flex items-center bg-background ${columnPad} ${
        leaving ? "is-leaving" : ""
      }`}
    >
      <div className={`${columnMax} w-full`}>
        <p className="intro-line font-normal italic text-[length:clamp(36px,27.09px+2.286vw,60px)] leading-[1.1] tracking-tight text-text">
          Designing products that ship.
        </p>
      </div>
    </div>
  );
}
