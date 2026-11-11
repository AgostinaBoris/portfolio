import React from "react";
import SectionIntro, { blockGap, eyebrowClass } from "../SectionIntro/SectionIntro";

// mobileCols: Focus areas has longer items, so it drops to one column on
// phones; Tools are short and stay at two.
const blocks = [
  {
    label: "Focus areas",
    mobileCols: "grid-cols-1",
    items: [
      "Product design",
      "UX research",
      "Usability testing",
      "UI design",
      "Design systems",
      "Wireframing",
      "Prototyping",
      "Front-end development",
    ],
  },
  {
    label: "Tools",
    mobileCols: "grid-cols-2",
    items: ["Figma", "Miro", "React", "Next.js", "JavaScript", "HTML", "CSS", "Sass", "Tailwind", "Node.js", "Vite"],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="text-text">
      <SectionIntro eyebrow="Expertise" heading="Design that ships.">
        I work across the full product cycle, from research and strategy to interface design and frontend code. That
        means the person who designs the flow is the same one who builds it, so nothing gets lost between Figma and
        production. I work side by side with developers and founders, and years of teaching taught me to explain the
        thinking behind every decision, so teams understand the why, not just the what.
      </SectionIntro>

      {blocks.map((b) => (
        <div key={b.label} className={`${blockGap} border-t border-text pt-6 md:pt-8`}>
          <h3 className={eyebrowClass}>{b.label}</h3>
          <ul
            className={`mt-6 md:mt-8 grid ${b.mobileCols} sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 md:gap-y-4 text-[length:clamp(20px,18.51px+0.381vw,24px)] leading-snug`}
          >
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
