import React, { useEffect, useRef, useState } from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { HiOutlineDocumentDuplicate, HiCheck } from "react-icons/hi";
import CV from "../assets/cv/boris-agostina-cv.pdf";
import PageColumn, { headingClass, pageY } from "../components/Layout/PageColumn";

const EMAIL = "borisagostina@gmail.com";

const contactLinks = [{ label: "Resume (PDF)", href: CV }];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/agostinaboris/" },
  { label: "GitHub", href: "https://github.com/AgostinaBoris" },
  { label: "Behance", href: "https://www.behance.net/borisagostina" },
];

const row =
  "group flex w-full items-center justify-between gap-4 border-b border-text py-3 text-[15px] md:text-base text-text text-left";

function LinkRow({ label, href }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className={row}>
        <span className="underline-offset-4 group-hover:underline">{label}</span>
        <HiOutlineArrowUpRight
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </li>
  );
}

function EmailRow() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard blocked (e.g. insecure context): fall back to the mail app.
      window.location.href = `mailto:${EMAIL}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <li>
      <button type="button" onClick={copy} className={row} aria-label={`Copy ${EMAIL}`}>
        <span className="underline-offset-4 group-hover:underline">{EMAIL}</span>
        <span className="flex shrink-0 items-center gap-2 text-muted">
          <span aria-live="polite" className="text-[13px]">
            {copied ? "Copied" : ""}
          </span>
          {copied ? (
            <HiCheck aria-hidden="true" className="text-text" />
          ) : (
            <HiOutlineDocumentDuplicate aria-hidden="true" className="text-text" />
          )}
        </span>
      </button>
    </li>
  );
}

function Group({ title, children }) {
  return (
    <section>
      <h2 className={`mb-4 ${headingClass}`}>{title}</h2>
      <ul className="border-t border-text">{children}</ul>
    </section>
  );
}

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <PageColumn className={`min-h-fill ${pageY}`}>
      <div className="space-y-24 md:space-y-32">
        <Group title="Contact">
          <EmailRow />
          {contactLinks.map((l) => (
            <LinkRow key={l.label} {...l} />
          ))}
        </Group>

        <Group title="Social media">
          {socialLinks.map((l) => (
            <LinkRow key={l.label} {...l} />
          ))}
        </Group>
      </div>
    </PageColumn>
  );
}
