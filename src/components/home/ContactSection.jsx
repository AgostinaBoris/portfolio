import React from "react";
import CV from "../../assets/cv/boris-agostina-cv.pdf";

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 py-24 md:px-6">
      <h2 className="text-5xl sm:text-6xl font-bold">[Titular contacto]</h2>
      <a
        href="mailto:borisagostina@gmail.com"
        className="mt-8 inline-block text-xl md:text-3xl hover:underline underline-offset-4"
      >
        borisagostina@gmail.com
      </a>
      <ul className="mt-8 flex gap-6 text-[15px]">
        <li>
          <a
            href="https://www.linkedin.com/in/agostinaboris/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            LinkedIn →
          </a>
        </li>
        <li>
          <a href={CV} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
            Resume →
          </a>
        </li>
      </ul>
    </section>
  );
}
