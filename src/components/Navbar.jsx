import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import CV from "../assets/cv/cv boris agostina.pdf";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <div
      className=" fixed top-0 w-full h-[90px] justify-end items-center text-gray-300 
    font-bold inset-x-0 flex-col  sm:flex sm:flex-row bg-pink-700"
    >
      {/* menu */}

      <ul className="hidden md:flex">
        <li>
          <Link to="/" exact="true">
            Home
          </Link>
        </li>
        <li>
          <Link to="about" exact="true">
            About
          </Link>
        </li>
        <li>
          <Link to="skills" exact="true">
            Skills
          </Link>
        </li>
        <li>
          <Link to="work" exact="true">
            Work
          </Link>
        </li>
        <li>
          <Link to="contact" exact="true">
            Contact
          </Link>
        </li>
      </ul>

      {/* Hamburger menu */}
      <div onClick={handleClick} className="md:hidden z-20 fixed w-12 top-0 right-0 py-8">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}

      {nav && (
        <ul className="fixed  w-full h-screen flex-col flex justify-center text-gray-300 items-center sm:flex-row bg-pink-700" style={{ zIndex: 10 }}>
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
        </ul>
      )}

      {/* social icons */}

      <div className="sm:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://www.linkedin.com/in/agostinaboris/"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://github.com/AgostinaBoris"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#ffb703]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="mailto:agostinaboris@protonmail.com"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="w-auto h-20 flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#f01fa0]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href={CV}
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
