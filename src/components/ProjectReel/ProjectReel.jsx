import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../utils/data.js";
import { columnPad } from "../Layout/PageColumn";
import useReveal from "../../hooks/useReveal";

const FRAME_MS = 2500;
const FADE_MS = 600;
const REEL_COUNT = 4;
// Wheel step: one gesture scrolls smoothly to the next project; the
// transition itself is tied to the scroll position (see applyProgress).
const STEP_MS = 700;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Responsive fit for the wide project slides (all exported at 3296x1516).
// A plain cover crop cuts the browser window (or Bondly's phones) on any
// screen narrower than the slide. Instead: the slide is shown whole
// (contain), anchored to the bottom so the window still runs off the screen
// edge like on desktop, and enlarged until its subject (the middle
// `focusWidth` of the slide) spans the screen, but never past a cover fit.
// Any space left above stays black, and the labels/counter move up into it.
//
// The white labels must never sit on the subject (the white browser
// windows would swallow them): they go above it when there's room under
// the header, else beside it (bottom-right, on the slide's colour). If
// neither fits, the slide is shrunk until one does.
// Only used by the pinned reel (landscape screens >= 1024px wide); narrow or
// portrait screens get ReelList instead.
const SLIDE_W = 3296;
const SLIDE_H = 1516;
const SLIDE_RATIO = SLIDE_W / SLIDE_H;
const LABEL_GAP = 24; // labels' distance from the screen edges / the subject
// Fixed site name + menu button (72px) plus a gap, so labels placed above
// the subject never crowd the header.
const HEADER_H = 72 + LABEL_GAP;
const SIDE_GAP = 16; // min space between the labels and the subject, sideways
const MIN_SCALE = 0.6;
const DEFAULT_LABELS = { w: 180, h: 150 };

function fitSlide(project, W, H, labels = DEFAULT_LABELS) {
  if (project.frameFit !== "cover") return null; // contain-on-black slides: untouched
  const half = (project.focusWidth || 0.74) / 2; // subject half-width, of slide width
  const top = project.focusTop ?? 0.1; // subject top, of slide height
  const { w: Lw, h: Lh } = labels.w ? labels : DEFAULT_LABELS;
  const baseW = Math.min(W, H * SLIDE_RATIO); // plain contain width

  // Geometry of a fit: where the subject's right edge and top land on screen.
  const cover = () => {
    const dw = Math.max(W, H * SLIDE_RATIO);
    const dh = dw / SLIDE_RATIO;
    return { mode: "cover", scale: 1, imageH: H, right: W / 2 + half * dw, top: (H - dh) / 2 + top * dh };
  };
  const contain = (scale) => {
    const dw = baseW * scale;
    const dh = dw / SLIDE_RATIO;
    return { mode: "contain", scale, imageH: dh, right: W / 2 + half * dw, top: H - (1 - top) * dh };
  };
  // Labels above the subject (preferred), beside it, or null if neither fits
  // (1px slack so the shrunk fit below isn't rejected by rounding).
  const place = (fit) => {
    if (fit.top - LABEL_GAP - Lh >= HEADER_H - 1) return { ...fit, labelsBottom: H - fit.top + LABEL_GAP };
    if (W - LABEL_GAP - Lw >= fit.right + SIDE_GAP - 1) return { ...fit, labelsBottom: LABEL_GAP };
    return null;
  };

  // Preferred fit, as before: cover, or contain enlarged up to 1 / focusWidth.
  const maxScale = 1 / (half * 2);
  const toCover = Math.max(W, H * SLIDE_RATIO) / baseW;
  const preferred = W / H >= SLIDE_RATIO || maxScale >= toCover ? cover() : contain(maxScale);
  const placed = place(preferred);
  if (placed) return placed;

  // Shrink (bottom-anchored contain) to the largest scale that frees room
  // above the subject or beside it.
  const sAbove = ((H - HEADER_H - LABEL_GAP - Lh) * SLIDE_RATIO) / ((1 - top) * baseW);
  const sBeside = (W / 2 - LABEL_GAP - Lw - SIDE_GAP) / (half * baseW);
  const scale = Math.max(MIN_SCALE, Math.min(toCover, maxScale, Math.max(sAbove, sBeside)));
  const fit = contain(scale);
  return place(fit) || { ...fit, labelsBottom: LABEL_GAP };
}

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

// Narrow or portrait screens (phones, tablets held upright, landscape phones)
// get a stacked list instead of the pinned full-screen reel: the wide slides
// would otherwise be cropped or tiny. Also the <picture> breakpoint for
// optional mobile assets.
const COMPACT_MQ = "(max-width: 1023px), (orientation: portrait)";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// Data saver on: videos don't autoplay, the poster shows instead.
function saveDataOn() {
  try {
    return Boolean(navigator.connection && navigator.connection.saveData);
  } catch {
    return false;
  }
}

// One slide frame. If the project lists a mobile asset for it
// (project.mobileFrames[i], e.g. bondly-01-mobile.webp) it's served on
// compact screens through <picture>; otherwise a plain <img>.
function FrameImg({ src, mobileSrc, ...imgProps }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  const img = <img src={src} width={SLIDE_W} height={SLIDE_H} {...imgProps} />;
  if (!mobileSrc) return img;
  return (
    <picture className="contents">
      <source media={COMPACT_MQ} srcSet={mobileSrc} />
      {img}
    </picture>
  );
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
      <p className="pointer-events-none absolute top-14 left-4 md:top-16 md:left-6 text-[13px] md:text-[15px] leading-[1.6] text-on-media">
        {project.number} / {String(total).padStart(2, "0")}
      </p>
      <p className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[13px] md:text-[15px] leading-[1.6] text-on-media">
        {project.name}
      </p>
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[13px] md:text-[15px] leading-[1.6] font-normal text-on-media">
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

// Bottom-right stack (default variant): project name, its links and, on the
// last project, "All projects". Each line slides up 12px and fades in with an
// 80ms stagger when the project becomes active, and leaves quickly.
function LabelStack({ project, showIn, allProjectsCount }) {
  const lines = [<p key="name">{project.name}</p>];
  const ext = (href, label) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pointer-events-auto hover:underline underline-offset-4"
    >
      {label}
    </a>
  );
  if (project.figmaPrototype) lines.push(ext(project.figmaPrototype, "Figma Prototype →"));
  if (project.deploy) lines.push(ext(project.deploy, "See Demo here →"));
  if (project.caseStudy) lines.push(ext(project.caseStudy, "Read case study →"));
  if (allProjectsCount) {
    lines.push(
      <Link key="all" to="/work" className="pointer-events-auto hover:underline underline-offset-4">
        All projects ({allProjectsCount}) →
      </Link>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 text-[18px] leading-none text-on-media">
      <div className="reel-labels absolute bottom-6 right-6 flex flex-col items-end gap-3">
        {lines.map((el, i) =>
          React.cloneElement(el, {
            className: `${el.props.className || ""} reel-line ${showIn ? "is-in" : ""}`,
            style: { transitionDelay: showIn ? `${i * 80}ms` : "0ms" },
          })
        )}
      </div>
    </div>
  );
}

function ReelItem({ project, index, total, reducedMotion, fullbleed, active, isCurrent, labelsIn, isLast, outerRef, innerRef }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const elapsedRef = useRef(0);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);

  const hasVideo = Boolean(project.video && (project.video.mp4 || project.video.webm));
  const frames = project.frames && project.frames.length ? project.frames : [project.img];
  const animate = !reducedMotion;
  const playVideo = animate && !saveDataOn();

  // The video element is on screen (the reel stage isn't scrolled away). All
  // slides share one sticky stage, so `active` (below) picks which slide plays.
  const [videoOnScreen, setVideoOnScreen] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!hasVideo || !video || !("IntersectionObserver" in window)) {
      setVideoOnScreen(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVideoOnScreen(entry.isIntersecting), { threshold: 0.25 });
    io.observe(video);
    return () => io.disconnect();
  }, [hasVideo]);

  // Video: plays only while its slide is active and on screen, never with
  // reduced motion (the poster shows instead); progress bar follows currentTime.
  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video) return;
    if (!active || !playVideo || !videoOnScreen) {
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
  }, [active, playVideo, hasVideo, videoOnScreen]);

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
  const cover = fullbleed || project.frameFit === "cover";
  // Slides that get the responsive fit (see fitSlide); the parent applies it
  // to the .reel-media / .reel-labels elements on resize.
  const responsiveFit = !fullbleed && project.frameFit === "cover";
  const fitClass = `${cover ? "object-cover" : "object-contain"} ${responsiveFit ? "reel-media" : ""}`;

  // Two layers so the reveal is a pure transform: the outer box slides up
  // from the bottom (overflow hidden) while the inner layer counter-slides,
  // so the image stays put and appears to be uncovered bottom-to-top. The
  // parent writes both transforms on scroll (applyProgress).
  return (
    <section
      ref={outerRef}
      aria-label={`${project.name} — ${project.category}`}
      aria-hidden={!isCurrent}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: index + 1, visibility: index === 0 ? "visible" : "hidden" }}
    >
      <div
        ref={innerRef}
        className={`bg-black absolute inset-0 will-change-transform`}
        style={{ transformOrigin: "center center" }}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full ${fitClass}`}
            autoPlay={playVideo}
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.video.poster || frames[0]}
            aria-label={project.video.label || project.name}
          >
            {project.video.webm && <source src={project.video.webm} type="video/webm" />}
            {project.video.mp4 && <source src={project.video.mp4} type="video/mp4" />}
          </video>
        ) : (
          // Default: every frame shown whole (contain) on black.
          // fullbleed / frameFit "cover": frames fill the slide edge to edge.
          frames.map((src, i) => {
            const visible = i === shown;
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
                <FrameImg
                  src={src}
                  mobileSrc={project.mobileFrames?.[i]}
                  alt={project.frameAlts?.[i] ?? (i === 0 ? project.name : "")}
                  loading={index === 0 && i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={`w-full h-full ${fitClass} ${zooming ? "reel-zoom" : ""}`}
                  style={{ animationPlayState: active ? "running" : "paused" }}
                />
              </div>
            );
          })
        )}

        {fullbleed ? (
          <FullbleedOverlay project={project} total={total} />
        ) : (
          <LabelStack project={project} showIn={labelsIn} allProjectsCount={isLast ? data.length : 0} />
        )}

        {animate && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px mix-blend-difference">
            <div ref={barRef} className="h-full w-full origin-left bg-white" style={{ transform: "scaleX(0)" }} />
          </div>
        )}
      </div>
    </section>
  );
}

// Bottom-left "01 / 04", same style as the site name; the number slides
// vertically when the active project changes.
function Counter({ index, total, direction, visible, reducedMotion }) {
  const [prev, setPrev] = useState(null);
  const lastRef = useRef(index);
  useEffect(() => {
    if (lastRef.current !== index) {
      setPrev(lastRef.current);
      lastRef.current = index;
    }
  }, [index]);
  const fmt = (n) => String(n + 1).padStart(2, "0");
  const dir = direction >= 0 ? "down" : "up";
  return (
    <p
      aria-hidden="true"
      className="pointer-events-none fixed left-6 z-[45] text-[18px] leading-none text-on-media transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, bottom: "var(--reel-labels-bottom, 24px)" }}
    >
      <span className="relative inline-block overflow-hidden align-bottom h-[1.15em] leading-[1.15em]">
        {!reducedMotion && prev !== null && (
          <span key={`out-${index}`} className={`absolute inset-0 reel-count-out-${dir}`}>
            {fmt(prev)}
          </span>
        )}
        <span key={`in-${index}`} className={`block ${!reducedMotion && prev !== null ? `reel-count-in-${dir}` : ""}`}>
          {fmt(index)}
        </span>
      </span>{" "}
      / {String(total).padStart(2, "0")}
    </p>
  );
}

// Compact layout, one project after another: the media at full width with
// its own aspect ratio (nothing cropped), then the name and links below it,
// left-aligned. Frames cross-fade and the video plays only while on screen;
// each project fades in once as it enters (no scroll-linked motion).
function ReelCard({ project, index, isLast, reducedMotion }) {
  const [revealRef, revealed] = useReveal(0.1);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [onScreen, setOnScreen] = useState(false);
  const [current, setCurrent] = useState(0);

  const hasVideo = Boolean(project.video && (project.video.mp4 || project.video.webm));
  const frames = project.frames && project.frames.length ? project.frames : [project.img];
  const animate = !reducedMotion;
  const playVideo = animate && !saveDataOn();

  useEffect(() => {
    const el = mediaRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOnScreen(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!hasVideo || !video) return;
    if (onScreen && playVideo) video.play().catch(() => {});
    else video.pause();
  }, [hasVideo, onScreen, playVideo]);

  useEffect(() => {
    if (hasVideo || !animate || !onScreen || frames.length < 2) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % frames.length), FRAME_MS);
    return () => clearInterval(t);
  }, [hasVideo, animate, onScreen, frames.length]);

  const shown = animate ? current : 0;
  const link = "inline-flex min-h-[44px] items-center hover:underline underline-offset-4";
  const ext = (href, label) => (
    <li key={label}>
      <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
        {label}
      </a>
    </li>
  );

  return (
    <article
      ref={revealRef}
      aria-label={`${project.name} — ${project.category}`}
      className={`reveal ${revealed ? "reveal-in" : ""}`}
    >
      <div ref={mediaRef} className="relative w-full overflow-hidden bg-black">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="block w-full h-auto"
            width={SLIDE_W}
            height={SLIDE_H}
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.video.poster || frames[0]}
            aria-label={project.video.label || project.name}
          >
            {project.video.webm && <source src={project.video.webm} type="video/webm" />}
            {project.video.mp4 && <source src={project.video.mp4} type="video/mp4" />}
          </video>
        ) : (
          // The first frame sets the box (natural ratio); the rest sit on top.
          frames.map((src, i) => (
            <FrameImg
              key={i}
              src={src}
              mobileSrc={project.mobileFrames?.[i]}
              alt={project.frameAlts?.[i] ?? (i === 0 ? project.name : "")}
              aria-hidden={i !== shown}
              loading={index === 0 && i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={i === 0 ? "block w-full h-auto" : "absolute inset-0 w-full h-full object-cover"}
              style={{ opacity: i === shown ? 1 : 0, transition: animate ? `opacity ${FADE_MS}ms ease` : "none" }}
            />
          ))
        )}
      </div>

      <div className={`${columnPad} pt-4 text-[18px] leading-none text-white`}>
        <h2 className="py-3 font-normal">{project.name}</h2>
        <ul>
          {project.figmaPrototype && ext(project.figmaPrototype, "Figma Prototype →")}
          {project.deploy && ext(project.deploy, "See Demo here →")}
          {project.caseStudy && ext(project.caseStudy, "Read case study →")}
          {isLast && (
            <li>
              <Link to="/work" className={link}>
                All projects ({data.length}) →
              </Link>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}

function ReelList() {
  const projects = data.slice(0, REEL_COUNT);
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div className="reel-list bg-black pb-16 space-y-14 md:space-y-20">
      {projects.map((p, i) => (
        <ReelCard key={p.id} project={p} index={i} isLast={i === projects.length - 1} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}

// Pinned full-screen reel on wide screens; the stacked list (ReelList) on
// narrow or portrait ones. /new's fullbleed variant always uses the reel.
export default function ProjectReel({ variant = "default" }) {
  const compact = useMediaQuery(COMPACT_MQ);
  if (compact && variant !== "fullbleed") return <ReelList />;
  return <ReelStage variant={variant} />;
}

function ReelStage({ variant }) {
  const fullbleed = variant === "fullbleed";
  const projects = data.slice(0, REEL_COUNT);
  const count = projects.length;
  const reducedMotion = usePrefersReducedMotion();

  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const outerRefs = useRef([]);
  const innerRefs = useRef([]);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(false);
  const [introDone, setIntroDone] = useState(() => !window.__abIntroActive);

  // Labels of the first project wait for the home intro to finish.
  useEffect(() => {
    if (introDone) return;
    const done = () => setIntroDone(true);
    window.addEventListener("ab:intro-done", done);
    return () => window.removeEventListener("ab:intro-done", done);
  }, [introDone]);

  // Responsive fit: size each slide's media for the current screen, show the
  // colour fill when there's space above it, and lift the labels into it.
  const labelsBottomRef = useRef([]);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const layout = () => {
      const W = stage.offsetWidth;
      const H = stage.offsetHeight;
      data.slice(0, count).forEach((project, i) => {
        const inner = innerRefs.current[i];
        const labels = inner && inner.querySelector(".reel-labels");
        const size = labels ? { w: labels.offsetWidth, h: labels.offsetHeight } : undefined;
        const fit = !fullbleed && inner ? fitSlide(project, W, H, size) : null;
        if (!fit) return;
        const contain = fit.mode === "contain";
        inner.querySelectorAll(".reel-media").forEach((el) => {
          el.style.objectFit = contain ? "contain" : "cover";
          el.style.objectPosition = contain ? "center bottom" : "";
          el.style.transformOrigin = contain ? "center bottom" : "";
          el.style.transform = contain ? `scale(${fit.scale})` : "";
        });
        if (labels) labels.style.bottom = `${fit.labelsBottom}px`;
        labelsBottomRef.current[i] = fit.labelsBottom;
      });
      const b = labelsBottomRef.current[indexRef.current];
      document.documentElement.style.setProperty("--reel-labels-bottom", `${b || LABEL_GAP}px`);
    };
    layout();
    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("resize", layout);
      document.documentElement.style.removeProperty("--reel-labels-bottom");
    };
  }, [count, fullbleed]);

  // The counter follows the active project's label height.
  useEffect(() => {
    if (fullbleed) return;
    const b = labelsBottomRef.current[index];
    document.documentElement.style.setProperty("--reel-labels-bottom", `${b || LABEL_GAP}px`);
  }, [index, fullbleed]);

  // Scroll-linked transition. p = how many viewports into the pinned track
  // (0 … count-1). Project i is revealed by r_i = p - (i-1) (0 → 1): it wipes
  // in from the bottom while project i-1 scales 1 → 0.96 and dims 1 → 0.6.
  // Reduced motion: no wipe/scale/dim, the nearest project is shown as is.
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const slideH = stage.offsetHeight || window.innerHeight;
      const p = Math.min(count - 1, Math.max(0, -rect.top / slideH));
      const nearest = Math.round(p);
      const reveal = (i) => (i === 0 ? 1 : reducedMotion ? (i <= nearest ? 1 : 0) : clamp01(p - (i - 1)));
      for (let i = 0; i < count; i++) {
        const outer = outerRefs.current[i];
        const inner = innerRefs.current[i];
        if (!outer || !inner) continue;
        const r = reveal(i);
        const covered = i < count - 1 ? reveal(i + 1) : 0;
        outer.style.visibility = r <= 0 || covered >= 1 ? "hidden" : "visible";
        const off = (1 - r) * 100;
        outer.style.transform = off ? `translate3d(0, ${off}%, 0)` : "";
        const k = reducedMotion ? 0 : covered;
        inner.style.transform = off || k ? `translate3d(0, ${-off}%, 0) scale(${1 - 0.04 * k})` : "";
        inner.style.opacity = k ? String(1 - 0.4 * k) : "";
      }
      const mid = window.innerHeight * 0.5;
      setInView(rect.top < mid && rect.bottom > mid);
      if (nearest !== indexRef.current) {
        setDirection(nearest > indexRef.current ? 1 : -1);
        indexRef.current = nearest;
        setIndex(nearest);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [count, reducedMotion]);

  // Desktop wheel: while the stage is pinned, one gesture = one project,
  // reached with a short eased scroll so the scroll-linked wipe plays.
  // At the first/last project the wheel scrolls the page normally.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let tweening = false;
    let tweenRaf = 0;
    let lastWheel = 0;
    let lastMag = 0;
    const scrollToY = (to) => {
      if (reducedMotion) {
        window.scrollTo({ top: to, behavior: "instant" });
        return;
      }
      const from = window.scrollY;
      const t0 = performance.now();
      tweening = true;
      const step = (now) => {
        const t = Math.min(1, (now - t0) / STEP_MS);
        window.scrollTo({ top: from + (to - from) * easeInOutCubic(t), behavior: "instant" });
        if (t < 1) tweenRaf = requestAnimationFrame(step);
        else tweening = false;
      };
      tweenRaf = requestAnimationFrame(step);
    };
    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const rect = track.getBoundingClientRect();
      const slideH = rect.height / count;
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;
      if (tweening) {
        e.preventDefault();
        return;
      }
      const dir = e.deltaY > 0 ? 1 : -1;
      const target = indexRef.current + dir;
      if (target < 0 || target > count - 1) return;

      e.preventDefault();
      const now = performance.now();
      const mag = Math.abs(e.deltaY);
      // Ignore trackpad inertia: a new step needs either a pause in the
      // wheel stream or a fresh, stronger push.
      const fresh = now - lastWheel > 200 || mag > lastMag * 1.5;
      lastWheel = now;
      lastMag = mag;
      if (!fresh || mag < 4) return;

      scrollToY(window.scrollY + rect.top + target * slideH);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(tweenRaf);
      window.removeEventListener("wheel", onWheel);
    };
  }, [count, reducedMotion]);

  return (
    <div className="w-full">
      <div ref={trackRef} className="reel-track relative w-full" style={{ "--reel-count": count }}>
        <div
          ref={stageRef}
          className={`reel-stage sticky top-0 w-full overflow-hidden bg-black`}
        >
          {projects.map((p, i) => (
            <ReelItem
              key={p.id}
              project={p}
              index={i}
              total={count}
              reducedMotion={reducedMotion}
              fullbleed={fullbleed}
              active={inView && i === index}
              isCurrent={i === index}
              labelsIn={inView && i === index && introDone}
              isLast={i === count - 1}
              outerRef={(el) => (outerRefs.current[i] = el)}
              innerRef={(el) => (innerRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {fullbleed ? (
        <div className="flex justify-center px-6 pt-6 pb-10">
          <Link to="/work" className="text-[18px] text-text hover:underline underline-offset-4">
            All projects ({data.length}) →
          </Link>
        </div>
      ) : (
        <Counter index={index} total={count} direction={direction} visible={inView} reducedMotion={reducedMotion} />
      )}
    </div>
  );
}
