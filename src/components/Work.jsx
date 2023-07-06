import React from "react";
import Tesla from "../assets/tesla.jpg";
import Ecommerce2 from "../assets/ecommerce.jpg";
import Nikko from "../assets/nikko.jpg";
import Clima from "../assets/clima.jpg";
import Homepage from "../assets/homePage.jpg";
import pic from "../assets/sugar.jpg";
import Sushi from "../assets/sushi.jpg";

const Work = () => {
  return (
    <div name="work" className="w-full md: h-screen text-gray-300 bg-black">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600">
            Work
          </p>
          <p className="py-6">Check out some of my recent work</p>
        </div>

        {/* Container */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            style={{ backgroundImage: `url(${pic})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto content-div"
          >
       
            <div className="opacity-0 group-hover:opacity-100">
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
            style={{ backgroundImage: `url(${Sushi})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto content-div"
          >
            {/* Hover effects */}
            <div className="opacity-0 group-hover:opacity-100">
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
            style={{ backgroundImage: `url(${Nikko})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto content-div"
          >
            {/* Hover effects */}
            <div className="opacity-0 group-hover:opacity-100">
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
            style={{ backgroundImage: `url(${Tesla})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto content-div"
          >
            {/* Hover effects */}
            <div className="opacity-0 group-hover:opacity-100">
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
            style={{ backgroundImage: `url(${Ecommerce2})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto content-div"
          >
            {/* Hover effects */}
            <div className="opacity-0 group-hover:opacity-100">
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

          <div
            style={{ backgroundImage: `url(${Homepage})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto content-div"
          >
            {/* Hover effects */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                Homepage - Html Css Js
              </span>
              <div>
                <a href="https://homepage-main-iota.vercel.app/">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="https://github.com/AgostinaBoris/Homepage_main.git">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div
            style={{ backgroundImage: `url(${Clima})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center m-auto  content-div"
          >
            {/* Hover effects */}
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                Weather App 
              </span>
              <div>
                <a href="https://weather-app-delta-sable.vercel.app/">
                  <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="https://github.com/AgostinaBoris/Weather_app.git">
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
