import React, { useId, useState } from "react";
import SectionIntro from "../SectionIntro/SectionIntro";
import { blockGap, bodyClass } from "../Layout/PageColumn";

const steps = [
  {
    n: "01",
    title: "Research",
    body: "User interviews, competitive analysis and a close look at real behavior, not assumptions. I map what people do, not just what they say they do.",
  },
  {
    n: "02",
    title: "Define",
    body: "I turn findings into a clear problem statement, user flows and priorities. This is where scope gets decided, before any visual decision is made.",
  },
  {
    n: "03",
    title: "Design",
    body: "Wireframes to high-fidelity in Figma, built on a component system. I test early with real users and iterate before anything is final.",
  },
  {
    n: "04",
    title: "Build",
    body: "I code the frontend myself, working side by side with developers. What ships matches what was designed, and I validate it with real usage after launch.",
  },
];

// Number column width; the open description lines up with the title after it.
const NUM_COL = "w-12 md:w-16";
const NUM_PAD = "pl-12 md:pl-16";

function Step({ step, open, onToggle, isLast }) {
  const uid = useId();
  const buttonId = `process-${uid}-button`;
  const panelId = `process-${uid}-panel`;

  return (
    <li className={`border-t border-text ${isLast ? "border-b" : ""}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center py-6 md:py-8 text-left font-medium text-[length:clamp(24px,21.03px+0.762vw,32px)] leading-tight text-text focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text"
        >
          <span className={`${NUM_COL} shrink-0`}>{step.n}</span>
          <span className="flex-1 min-w-0">{step.title}</span>
          <span
            aria-hidden="true"
            className={`ml-4 shrink-0 text-[length:clamp(30px,27.77px+0.571vw,36px)] font-light leading-none transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className={`${NUM_PAD} pb-8 md:pb-10 ${bodyClass}`}>
            {step.body}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function Process() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="process" className="text-text">
      <SectionIntro eyebrow="Process" heading="Clarity before pixels.">
        Most product problems aren't interface problems — they're clarity problems. Before I open Figma, I want to
        understand who's using the product, what they're actually trying to do, and where they get stuck. Every project
        follows the same four steps, and the last one is where most designers stop: I build what I design.
      </SectionIntro>

      <ol className={blockGap}>
        {steps.map((s, i) => (
          <Step
            key={s.n}
            step={s}
            open={openIndex === i}
            onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            isLast={i === steps.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}
