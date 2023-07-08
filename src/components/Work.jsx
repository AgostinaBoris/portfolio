import React from "react";
import Tesla from "../assets/tesla.jpg";
import Ecommerce2 from "../assets/ecommerce.jpg";
import Nikko from "../assets/nikko.jpg";
import pic from "../assets/sugar.jpg";
import Sushi from "../assets/sushi.jpg";

const Work = () => {
  return (
    <div name="work" className="w-full h-full mt-40 text-gray-300 bg-black">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <div className="py-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600">
            Work
          </p>
          <p className="py-6">Check out some of my recent work</p>
        </div>

        {/* Container */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <div
            style={{
              background: `linear-gradient(rgba(127, 0, 178, 0.5), rgba(127, 0, 178, 0.4)), url(${pic})`, backgroundSize: 'cover',
            }}
            className="shadow-lg shadow-[#040c16]  group container rounded-md flex justify-center items-center m-auto  content-div"
          >
            <div className="opacity-95 group-hover:opacity-25">
              <span className="text-2xl font-bold text-white tracking-wider">
                Ecommerce NextJS-Tailwind
              </span>
              <div>
                <a href="https://ecommerce-next-js-tailwind.vercel.app/">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="https://github.com/AgostinaBoris/Ecommerce_NextJs_Tailwind.git">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              background: `linear-gradient(rgba(127, 0, 178, 0.5), rgba(127, 0, 178, 0.4)), url(${Sushi})`,
            }}
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

          <div
            style={{
              background: `linear-gradient(rgba(127, 0, 178, 0.5), rgba(127, 0, 178, 0.4)), url(${Nikko})`,
            }}
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

          <div
            style={{
              background: `linear-gradient(rgba(127, 0, 178, 0.5), rgba(127, 0, 178, 0.4)), url(${Tesla})`,
            }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto  content-div"
          >
            {/* Hover effects */}
            <div className="opacity-95 group-hover:opacity-25">
              <span className="text-2xl font-bold text-white tracking-wider">
                Tesla Landing Page - Tailwind Css
              </span>
              <div>
                <a href="https://tailwind-dz85asx9r-agostinaboris.vercel.app/">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="https://github.com/AgostinaBoris/Landing_page.git">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              background: `linear-gradient(rgba(127, 0, 178, 0.5), rgba(127, 0, 178, 0.4)), url(${Ecommerce2})`,
            }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto  content-div"
          >
            {/* Hover effects */}
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
        </div>
      </div>
    </div>
  );
};

export default Work;
