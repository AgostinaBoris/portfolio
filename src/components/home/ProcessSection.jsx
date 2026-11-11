import React from "react";

const steps = [
  { n: "01", title: "Research" },
  { n: "02", title: "Design" },
  { n: "03", title: "Build" },
  { n: "04", title: "Test" },
];

export default function ProcessSection() {
  return (
    <section id="process" className="px-4 py-24 md:px-6">
      <h2 className="text-5xl sm:text-6xl font-bold">Process</h2>
      <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
        {steps.map((s) => (
          <li key={s.n} className="border-t border-border pt-6">
            <p className="text-[15px]">{s.n}</p>
            <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
            <p className="mt-4">[descripción]</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-[13px]">
              {["[tag 1]", "[tag 2]", "[tag 3]"].map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
