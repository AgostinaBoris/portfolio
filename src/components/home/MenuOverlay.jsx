import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CV from "../../assets/cv/boris-agostina-cv.pdf";
import CV_ES from "../../assets/cv/boris-agostina-cv-es.pdf";

const links = [
  { n: "01", label: "Work", to: "/work" },
  { n: "02", label: "About", to: "/about" },
  { n: "03", label: "Process", href: "#process" },
  { n: "04", label: "Contact", href: "#contact" },
];

export default function MenuOverlay({ open, onClose }) {
  // Close with Escape and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <nav
      id="menu"
      aria-label="Main menu"
      className="fixed inset-0 z-40 flex flex-col justify-center bg-text px-4 md:px-6 text-white"
    >
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.n} className="text-4xl md:text-6xl">
            {l.to ? (
              <Link to={l.to} onClick={onClose} className="hover:underline underline-offset-8">
                <span className="mr-4 text-base align-top">{l.n}</span>
                {l.label}
              </Link>
            ) : (
              <a href={l.href} onClick={onClose} className="hover:underline underline-offset-8">
                <span className="mr-4 text-base align-top">{l.n}</span>
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-wrap gap-6 text-[15px]">
        <a href={CV} target="_blank" rel="noopener noreferrer" onClick={onClose} className="hover:underline underline-offset-4">
          Resume →
        </a>
        <a href={CV_ES} target="_blank" rel="noopener noreferrer" onClick={onClose} className="hover:underline underline-offset-4">
          CV Español →
        </a>
      </div>
    </nav>
  );
}
