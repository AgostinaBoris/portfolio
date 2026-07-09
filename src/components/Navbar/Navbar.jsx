import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <div
      className=" z-10 fixed top-0 w-full h-[90px] justify-end items-center text-text
    font-bold inset-x-0 flex-col text-xl sm:flex sm:flex-row bg-surface border-b border-border"
    >
      {/* menu */}

      <ul className="hidden md:flex">
        <li>
          <Link to="/" exact="true" className="hover:text-primary duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="about" exact="true" className="hover:text-primary duration-300">
            About
          </Link>
        </li>
        <li>
          <Link to="skills" exact="true" className="hover:text-primary duration-300">
            Skills
          </Link>
        </li>
        <li>
          <Link to="work" exact="true" className="hover:text-primary duration-300">
            Work
          </Link>
        </li>
        <li>
          <Link to="contact" exact="true" className="hover:text-primary duration-300">
            Contact
          </Link>
        </li>
      </ul>

      {/* Hamburger menu */}
      <div onClick={handleClick} className="md:hidden fixed w-12 top-0 right-0 py-8 text-text">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      {nav && (
        <ul className= "sm:hidden w-full h-screen flex-col flex justify-center text-white items-center bg-primary-dark" >
          <li className="py-6 text-4xl">
            <Link to="/" onClick={handleClick}>
              Home
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link to="/about" onClick={handleClick}>
              About
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link to="/skills" onClick={handleClick}>
              Skills
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link to="/work" onClick={handleClick}>
              Work
            </Link>
          </li>
          <li className="py-6 text-4xl">
            <Link to="/contact" onClick={handleClick}>
              Contact
            </Link>
          </li>
          <li className="flex gap-8 pt-8 text-2xl">
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/agostinaboris/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="hover:text-accent duration-300"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              aria-label="GitHub"
              href="https://github.com/AgostinaBoris"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="hover:text-accent duration-300"
            >
              <FaGithub size={28} />
            </a>
            <a
              aria-label="Email"
              href="mailto:borisagostina@gmail.com"
              onClick={handleClick}
              className="hover:text-accent duration-300"
            >
              <HiOutlineMail size={28} />
            </a>
          </li>
        </ul>
      )}

      {/* social icons */}

      <div className="hidden sm:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-primary">
            <a
              className="flex justify-between items-center w-full text-white px-4"
              href="https://www.linkedin.com/in/agostinaboris/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-primary-dark">
            <a
              className="flex justify-between items-center w-full text-white px-4"
              href="https://github.com/AgostinaBoris"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-primary">
            <a
              className="flex justify-between items-center w-full text-white px-4"
              href="mailto:borisagostina@gmail.com"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
