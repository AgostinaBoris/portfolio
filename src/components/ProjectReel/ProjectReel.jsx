import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../utils/data.js";

const FRAME_MS = 2500;
const FADE_MS = 600;
const REEL_COUNT = 4;
// Slide-to-slide wipe (same feel as julianjakob.at): the outgoing project
// collapses toward one edge while the incoming one grows from the other.
const SWAP_MS = 800;
const SWAP_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function ArrowLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-1.5">
      <span className="decoration-1 underline-offset-4 group-hover:underline">{children}</span>
      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

// fullbleed overlay: counter top-left (below the fixed header), name bottom-right, details block bottom-left
// over a black gradient (0 → 40%) on the bottom third.
function FullbleedOverlay({ project, total }) {
  const roles = Array.isArray(project.role) ? project.role : project.role ? [project.role] : [];
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      <p className="pointer-events-none absolute top-14 left-4 md:top-16 md:left-6 text-[13px] md:text-[15px] leading-[1.6] text-white mix-blend-difference">
        {project.number} / {String(total).padStart(2, "0")}
      </p>
      <p className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[13px] md:text-[15px] leading-[1.6] text-white">
        {project.name}
      </p>
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[13px] md:text-[15px] leading-[1.6] font-normal text-white">
        <dl className="hidden md:block">
          {project.category && (
            <div className="mb-[1.6em]">
              <dt>Type:</dt>
              <dd>{project.category}</dd>
            </div>
          )}
          {roles.length > 0 && (
            <div className="mb-[1.6em]">
              <dt>Role:</dt>
              {roles.map((r) => (
                <dd key={r}>{r}</dd>
              ))}
            </div>
          )}
        </dl>
        <ul>
          {project.caseStudy && (
            <li>
              <ArrowLink href={project.caseStudy}>Case study</ArrowLink>
            </li>
          )}
          {project.figmaPrototype && (
            <li>
              <ArrowLink href={project.figmaPrototype}>Prototype</ArrowLink>
            </li>
          )}
          {project.deploy && (
            <li>
              <ArrowLink href={project.deploy}>Live</ArrowLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

function ReelItem({ project, index, total, reducedMotion, fullbleed, active, phase, direction }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const elapsedRef = useRef(0);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);

  const hasVideo = Boolean(project.video && (project.video.mp4 || project.video.webm));
  const frames = project.frames && project.frames.length ? project.frames : [project.img];
  const animate = !reducedMotion;

  // Video: play/pause with visibility, progress bar follows currentTime.
  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video) return;
    if (!active || !animate) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
    let raf;
    const tick = () => {
      if (barRef.current && video.duration) {
        barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, animate, hasVideo]);

  // Frames: advance every FRAME_MS while visible, keep elapsed time when paused.
  useEffect(() => {
    if (hasVideo || !active || !animate) return;
    const cycle = frames.length * FRAME_MS;
    let last = performance.now();
    let raf;
    const tick = (now) => {
      elapsedRef.current = (elapsedRef.current + (now - last)) % cycle;
      last = now;
      const next = Math.floor(elapsedRef.current / FRAME_MS);
      if (next !== currentRef.current) {
        setPrevious(currentRef.current);
        currentRef.current = next;
        setCurrent(next);
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${elapsedRef.current / cycle})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, animate, hasVideo, frames.length]);

  const shown = animate ? current : 0;

  // phase: "in" = on screen, "out" = collapsing away, "idle" = hidden.
  // Going down, the old slide shrinks toward the top and the new one grows
  // from the bottom; going up, the other way round.
  const down = direction >= 0;
  const origin = phase === "out" ? (down ? "top" : "bottom") : down ? "bottom" : "top";
  const style = {
    transform: phase === "in" ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: `center ${origin}`,
    transition: animate && phase !== "idle" ? `transform ${SWAP_MS}ms ${SWAP_EASE}` : "none",
    visibility: phase === "idle" ? "hidden" : "visible",
    zIndex: phase === "in" ? 2 : phase === "out" ? 1 : 0,
  };

  return (
    <section
      aria-label={`${project.name} — ${project.category}`}
      aria-hidden={phase !== "in"}
      className={`${fullbleed ? "bg-black" : "bg-[#111]"} absolute inset-0 overflow-hidden will-change-transform`}
      style={style}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full ${fullbleed ? "object-cover" : "object-contain"}`}
          muted
          loop
          playsInline
          preload="none"
          poster={project.video.poster || frames[0]}
        >
          {project.video.webm && <source src={project.video.webm} type="video/webm" />}
          {project.video.mp4 && <source src={project.video.mp4} type="video/mp4" />}
        </video>
      ) : (
        // Default: every frame shown whole (contain) on #111.
        // fullbleed: every frame fills the screen (cover), no box around it.
        // project.frameFit === "cover" (Bondly): frames are exported at the
        // slide's aspect ratio, so they fill it edge to edge with no padding,
        // bars or zoom.
        frames.map((src, i) => {
          const visible = i === shown;
          const cover = fullbleed || project.frameFit === "cover";
          const zooming = animate && !(project.frameFit === "cover") && (i === current || i === previous);
          return (
            <div
              key={i}
              aria-hidden={!visible}
              className={`absolute inset-0 ${cover ? "" : "p-[clamp(16px,5vh,56px)]"}`}
              style={{
                opacity: visible ? 1 : 0,
                transition: animate ? `opacity ${FADE_MS}ms ease` : "none",
              }}
            >
              <img
                src={src}
                alt={project.frameAlts?.[i] ?? (i === 0 ? project.name : "")}
                loading={index === 0 && i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`w-full h-full ${cover ? "object-cover" : "object-contain"} ${zooming ? "reel-zoom" : ""}`}
                style={{ animationPlayState: active ? "running" : "paused" }}
              />
            </div>
          );
        })
      )}

      {fullbleed ? (
        <FullbleedOverlay project={project} total={total} />
      ) : (
        // Default overlay
        <div className="pointer-events-none absolute inset-0 text-[18px] leading-none text-white mix-blend-difference">
          {/* Bottom-right stack: project name, then its links */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
            <p>{project.name}</p>
              {project.figmaPrototype && (
                <a
                  href={project.figmaPrototype}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto hover:underline underline-offset-4"
                >
                  Figma Prototype →
                </a>
              )}
              {project.deploy && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto hover:underline underline-offset-4"
                >
                  See Demo here →
                </a>
              )}
              {project.caseStudy && (
                <a
                  href={project.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto hover:underline underline-offset-4"
                >
                  Read case study →
                </a>
              )}
          </div>
        </div>
      )}

      {animate && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px mix-blend-difference">
          <div ref={barRef} className="h-full w-full origin-left bg-white" style={{ transform: "scaleX(0)" }} />
        </div>
      )}
    </section>
  );
}

export default function ProjectReel({ variant = "default" }) {
  const fullbleed = variant === "fullbleed";
  const projects = data.slice(0, REEL_COUNT);
  const count = projects.length;
  const reducedMotion = usePrefersReducedMotion();

  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(false);

  // The track is count × 100vh tall; the stage inside it sticks to the
  // viewport, and the scroll position inside the track picks the project.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const slideH = rect.height / count;
      const mid = window.innerHeight * 0.5;
      setInView(rect.top < mid && rect.bottom > mid);
      const next = Math.min(count - 1, Math.max(0, Math.round(-rect.top / slideH)));
      if (next !== indexRef.current) {
        setDirection(next > indexRef.current ? 1 : -1);
        setPrevIndex(indexRef.current);
        indexRef.current = next;
        setIndex(next);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [count]);

  // Desktop wheel: while the stage is pinned, one gesture = one project.
  // At the first/last project the wheel scrolls the page normally.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let lockedUntil = 0;
    let lastWheel = 0;
    let lastMag = 0;
    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const rect = track.getBoundingClientRect();
      const slideH = rect.height / count;
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const target = indexRef.current + dir;
      if (target < 0 || target > count - 1) return;

      e.preventDefault();
      const now = performance.now();
      const mag = Math.abs(e.deltaY);
      // Ignore trackpad inertia: a new step needs the swap to be over and
      // either a pause in the wheel stream or a fresh, stronger push.
      const fresh = now - lastWheel > 200 || mag > lastMag * 1.5;
      lastWheel = now;
      lastMag = mag;
      if (now < lockedUntil || !fresh || mag < 4) return;

      lockedUntil = now + SWAP_MS + 100;
      const top = window.scrollY + rect.top + target * slideH;
      window.scrollTo({ top, behavior: "instant" });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [count]);

  return (
    <div className="w-full">
      <div ref={trackRef} className="reel-track relative w-full" style={{ "--reel-count": count }}>
        <div className={`reel-stage sticky top-0 w-full overflow-hidden ${fullbleed ? "bg-black" : "bg-[#111]"}`}>
          {projects.map((p, i) => (
            <ReelItem
              key={p.id}
              project={p}
              index={i}
              total={count}
              reducedMotion={reducedMotion}
              fullbleed={fullbleed}
              active={inView && i === index}
              phase={i === index ? "in" : i === prevIndex ? "out" : "idle"}
              direction={direction}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center px-6 pt-6 pb-10">
        <Link
          to="/work"
          className="text-[18px] text-text hover:underline underline-offset-4"
        >
          All projects ({data.length}) →
        </Link>
      </div>
    </div>
  );
}
