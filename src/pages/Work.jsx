import React from "react";
import Projects from './../components/Projects/Projects';


const Work = () => {
  return (
    <div name="work" className="relative w-full min-h-screen bg-background pt-[90px] pb-24">
      <div className="mb-16 text-center px-[clamp(24px,2.5vw,48px)] pt-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-text">Work</h1>
        <p className="mt-4 text-xl text-muted">Check out some of my recent work</p>
      </div>

      <div className="w-full max-w-none px-[clamp(24px,2.5vw,48px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(32px,2vw,40px)]">
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default Work;
