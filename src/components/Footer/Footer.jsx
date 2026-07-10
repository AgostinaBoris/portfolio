import React from "react";
import { FaLinkedin, FaGithub, FaBehance } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export const Footer = (props) => {
  return (
    <div className="footer w-100 bg-surface text-primary-dark px-8 py-12 border-t border-border">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
        <h3 className="text-2xl font-semibold">Agostina Boris</h3>

        <div className="flex items-center gap-8">
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/agostinaboris/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark duration-300"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            aria-label="GitHub"
            href="https://github.com/AgostinaBoris"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark duration-300"
          >
            <FaGithub size={30} />
          </a>
          <a
            aria-label="Email"
            href="mailto:borisagostina@gmail.com"
            className="text-primary hover:text-primary-dark duration-300"
          >
            <CiMail size={30} />
          </a>
          <a
            aria-label="Behance"
            href="https://www.behance.net/borisagostina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark duration-300"
          >
            <FaBehance size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
