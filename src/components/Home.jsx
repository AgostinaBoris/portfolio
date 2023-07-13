import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div name="home" className="w-full h-full pt-20 pl-10 bg-black pb-20 ">
      {/* Container */}
      <div className=" mx-auto pt-20 px-8 flex flex-col justify-center h-full">
        <p className="text-white text-2xl">Hi, my name is</p>
        <h1 className="text-4xl sm:text-7xl py-4 font-bold text-blue-300">
          Agostina
        </h1>
        <h1 className="text-4xl sm:text-7xl py-4 font-bold text-blue-500">
          Boris
        </h1>
        <h2 className="text-4xl sm:text-7xl py-2 font-bold text-white">
          FrontEnd Web Developer.
        </h2>
        <p className="text-white text-2xl py-4 max-w-[700px]">
          I'm a front-end web developer with a passion for creating engaging
          digital experiences. I'm focused on building responsive web
          applications and continuously expanding my skills in this area.
        </p>
        <div>
          <Link
            to="work" exact="true"
            className="text-white w-1/6 border-2 px-6 py-3 my-2 flex font-bold items-center hover:bg-pink-300 hover:border-pink-400"
          >
            View Work <HiArrowNarrowRight className="mx-4 w-12"/>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

// SACAR LOS PADDING Y MAXWIDTH XL Y CENTRAR 