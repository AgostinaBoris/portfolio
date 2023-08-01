import React from "react";
import Projects from './../components/Projects/Projects';


const Work = () => {
  return (
    <div name="work" className="w-full h-full bg-black pb-20">
      <div className="max-w-7xl mx-auto pt-20 pl-10 sm:px-6 lg:px-8 ">
        <div className="py-8 mt-20">
          <p className="text-5xl font-bold inline border-b-4 text-blue-300 border-blue-600">
            Work
          </p>
          <p className="py-12 text-3xl text-white">Check out some of my recent work</p>
        </div>

        {/* Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12 relative z-0 ">
       <Projects/>
        </div>
      </div>
    </div>
  );
};

export default Work;

