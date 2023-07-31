import React from "react";
import './Nikko.css';

const Nikko = () => {
  return (
    <div
      className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto  content-div"
    >
      {/* Hover effects */}
      <div className="opacity-95 group-hover:opacity-25">
        <span className="text-2xl font-bold text-white tracking-wider">
          NextJs Website
        </span>
        <div>
          <a href="https://next-js-web-one.vercel.app">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Demo
            </button>
          </a>
          <a href="https://github.com/AgostinaBoris/NextJs_Web.git">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nikko;
