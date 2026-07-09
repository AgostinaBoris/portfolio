import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";



export default function Home() {
  return (
    <div name="home" className="w-full min-h-screen pt-[90px] pl-10 bg-background">
      {/* Container */}
      <div className="mx-auto px-8 flex flex-col justify-center min-h-[calc(100vh-90px)]">
        <p className="text-muted text-xl">Hi, my name is</p>
        <h1 className="text-4xl sm:text-6xl py-2 font-bold text-primary-dark">
          Agostina
        </h1>
        <h1 className="text-4xl sm:text-6xl py-2 font-bold text-primary">
          Aldana Boris
        </h1>
        <h2 className="text-2xl sm:text-4xl py-2 font-bold text-primary-dark max-w-[900px]">
         UX/UI Designer &amp; Front-End Developer
        </h2>
        <p className="text-muted text-lg py-4 max-w-[650px]">
          I'm a UX/UI Designer and Front-End Developer focused on creating
          intuitive, accessible, and visually refined digital products. My
          work combines user research, interface design, prototyping, and
          front-end development to build experiences that are clear,
          functional, and engaging.
        </p>
        <div>
          <Link
            to="work" exact="true"
            className="text-white bg-primary w-1/4 px-4 py-4 my-2 flex font-bold items-center rounded-lg hover:bg-primary-dark duration-300"
          >
            View Work <HiArrowNarrowRight className="mx-4 w-12"/>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
