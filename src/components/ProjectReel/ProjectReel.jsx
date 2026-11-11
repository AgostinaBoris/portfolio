import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../utils/data.js";

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
// Any space left above is filled with the slide's own top band (brand
// colour, .reel-backdrop), and the labels/counter move up into it.
// `portraitCoverBelow`: on screens narrower than this aspect ratio, use a
// plain cover crop instead (Bondly: the middle phone alone fills a phone).
const SLIDE_RATIO = 3296 / 1516;
const LABEL_GAP = 24;
function fitSlide(project, W, H) {
  const A = W / H;
  const cover = { mode: "cover", scale: 1, imageH: H, labelsBottom: LABEL_GAP };
  if (project.frameFit !== "cover") return null; // contain-on-#111 slides: untouched
  if (A >= SLIDE_RATIO || (project.portraitCoverBelow && A <= project.portraitCoverBelow)) return cover;
  const maxScale = 1 / (project.focusWidth || 0.74);
  const toCover = SLIDE_RATIO / A;
  if (maxScale >= toCover) return cover;
  const imageH = (W / SLIDE_RATIO) * maxScale;
  // Labels go above the image only when there's real room for them there.
  const labelsBottom = H - imageH >= 220 ? imageH + LABEL_GAP : LABEL_GAP;
  return { mode: "contain", scale: maxScale, imageH, labelsBottom };
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
    <div className="pointer-events-none absolute inset-0 text-[18px] leading-none text-white mix-blend-difference">
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
    if (!active || !animate || !videoOnScreen) {
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
  }, [active, animate, hasVideo, videoOnScreen]);

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
  // to the .reel-media / .reel-backdrop / .reel-labels elements on resize.
  const responsiveFit = !fullbleed && project.frameFit === "cover";
  const fitClass = `${cover ? "object-cover" : "object-contain"} ${responsiveFit ? "reel-media" : ""}`;
  const backdropSrc = hasVideo ? project.video.poster || frames[0] : frames[0];

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
        className={`${fullbleed ? "bg-black" : "bg-[#111]"} absolute inset-0 will-change-transform`}
        style={{ transformOrigin: "center center" }}
      >
        {responsiveFit && (
          <img
            src={backdropSrc}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="reel-backdrop absolute inset-0 w-full h-full object-cover"
            style={{ display: "none" }}
          />
        )}
        {hasVideo ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full ${fitClass}`}
            autoPlay={animate}
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
          // Default: every frame shown whole (contain) on #111.
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
                <img
                  src={src}
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
      className="pointer-events-none fixed left-6 z-[45] text-[18px] leading-none text-white mix-blend-difference transition-opacity duration-300"
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

export default function ProjectReel({ variant = "default" }) {
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
        const fit = !fullbleed && inner ? fitSlide(project, W, H) : null;
        if (!fit) return;
        const contain = fit.mode === "contain";
        inner.querySelectorAll(".reel-media").forEach((el) => {
          el.style.objectFit = contain ? "contain" : "cover";
          el.style.objectPosition = contain ? "center bottom" : "";
          el.style.transformOrigin = contain ? "center bottom" : "";
          el.style.transform = contain ? `scale(${fit.scale})` : "";
        });
        const backdrop = inner.querySelector(".reel-backdrop");
        if (backdrop) backdrop.style.display = contain ? "block" : "none";
        const labels = inner.querySelector(".reel-labels");
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
          className={`reel-stage sticky top-0 w-full overflow-hidden ${fullbleed ? "bg-black" : "bg-[#111]"}`}
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
