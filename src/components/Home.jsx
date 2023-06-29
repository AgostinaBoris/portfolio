import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function Home() {
  return (
    <div name="home" className="w-full h-screen bg-black ">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <p className="text-gray-300 text-2xl">Hi, my name is</p>
        <h1 className="text-4xl sm:text-7xl py-4 font-bold text-pink-600">
          Agostina Boris
        </h1>
        <h2 className="text-4xl sm:text-7xl py-2 font-bold text-[#8892b0]">
          I'm a Jr. Front-end Web Developer.
        </h2>
        <p className="text-[#8892b0] text-xl py-4 max-w-[700px]">
          I'm a junior front-end developer with a passion for creating engaging digital experiences. 
          I'm focused on building responsive web applications and continuously expanding my skills in this area. 
        </p>
        <div>
          <button className="text-white border-2 px-6 py-3 my-2 flex items-center hover:bg-amber-400 hover:border-amber-400 ">
            View Work <HiArrowNarrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
