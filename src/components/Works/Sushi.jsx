import React from "react";
import './Sushi.css';


const Sushi = () => {
  return (
    <div
      className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto  content-div"
    >
      {/* Hover effects */}
      <div className="opacity-95 group-hover:opacity-25">
        <span className="text-2xl font-bold text-white tracking-wider">
          Sushi Website - React Js
        </span>
        <div>
          <a href="https://sushi-web-eight.vercel.app/">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Demo
            </button>
          </a>
          <a href="https://github.com/AgostinaBoris/Sushi_web">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sushi;
