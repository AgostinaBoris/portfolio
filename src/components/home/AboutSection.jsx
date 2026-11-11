import React from "react";
import YO from "../../assets/yop.jpg";

const profile = `const agostina = {
  role: "[Rol]",
  basedIn: "[Ciudad]",
  focus: ["[Foco 1]", "[Foco 2]", "[Foco 3]"],
  tools: ["[Herramienta 1]", "[Herramienta 2]"],
  available: "[Disponibilidad]",
};`;

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 md:px-6">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-5xl sm:text-6xl font-bold">[Titular about]</h2>
          <p className="mt-6 max-w-prose text-lg">[Párrafo about]</p>
          <pre className="mt-10 font-sans overflow-x-auto rounded-lg bg-surface p-6 text-[13px] leading-relaxed">
            <code className="font-sans">{profile}</code>
          </pre>
        </div>
        <img src={YO} alt="Agostina Boris" className="w-full max-w-[440px] aspect-square object-cover" />
      </div>
    </section>
  );
}
