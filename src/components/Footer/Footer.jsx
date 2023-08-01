import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export const Footer = (props) => {
  return (
    <div className="footer w-100 bg-black text-blue-400 p-8">
      <div className="container py-12 lg:grid grid-cols-2 gap-4 justify-center">
        <div className="grid grid-rows-2">
          <h3 className="text-xl">Agostina Aldana Boris</h3>
        </div>

  <h3 className="text-xl">Get in touch</h3>
        <div className="flex  items-center justify-center gap-8">
        
          <FaLinkedin className="icon" />
          <FaGithub className="icon"/>
          <CiMail className="icon "/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
