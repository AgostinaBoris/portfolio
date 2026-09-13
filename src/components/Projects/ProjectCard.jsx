import React from "react";
import useReveal from "../../hooks/useReveal";

const actionClasses =
  "text-lg sm:text-lg font-semibold text-text border border-text/25 rounded-full px-6 py-3 sm:px-5 sm:py-2.5 transition-all duration-200 hover:bg-text hover:text-white hover:border-text hover:scale-[1.03] active:scale-[0.97]";

export default function ProjectCard({ c, delay = 0 }) {
  const [ref, inView] = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`reveal ${inView ? "reveal-in" : ""} flex flex-col group`}
    >
      <div className="w-full aspect-[4/3] sm:aspect-[2.05/1] overflow-hidden rounded-[22px] bg-surface">
        <img
          className="block w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          src={c.img}
          alt={c.name}
        />
      </div>

      {c.category && (
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          {c.category}
        </p>
      )}
      <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-text">{c.name}</h3>
      {c.blurb && <p className="mt-3 text-lg text-muted leading-relaxed">{c.blurb}</p>}

      <div className="flex flex-wrap gap-3 mt-6">
        {c.codigo && (
          <a href={c.codigo} target="_blank" rel="noopener noreferrer" className={actionClasses}>
            Code
          </a>
        )}
        {c.caseStudy && (
          <a href={c.caseStudy} target="_blank" rel="noopener noreferrer" className={actionClasses}>
            Case Study
          </a>
        )}
        {c.figmaPrototype && (
          <a href={c.figmaPrototype} target="_blank" rel="noopener noreferrer" className={actionClasses}>
            Figma Prototype
          </a>
        )}
        {c.deploy && (
          <a href={c.deploy} target="_blank" rel="noopener noreferrer" className={actionClasses}>
            {c.figmaPrototype ? "Live Demo" : "Demo"}
          </a>
        )}
      </div>
    </div>
  );
}
