import React from "react";
import './EcommerceJs.css';

const EcommerceJs = () => {
  return (
    <div className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto  content-div">

      <div className="opacity-95 group-hover:opacity-25">
        <span className="text-2xl font-bold text-white tracking-wider">
          Ecommerce Model - Html Css Javascript
        </span>
        <div>
          <a href="https://ecommerce-html-css-js.vercel.app/index.html">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Demo
            </button>
          </a>
          <a href="https://github.com/AgostinaBoris/Ecommerce_html-Css-Js.git">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EcommerceJs;
