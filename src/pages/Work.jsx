import React from "react";
import Projects from './../components/Projects/Projects';


const Work = () => {
  return (
    <div name="work" className="relative w-full min-h-screen bg-background overflow-hidden pb-20">
      {/* Decorative background blobs: soft, blurred, layered for a delicate 3D depth feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-20 px-6 lg:px-8 ">
        <div className="py-8 mt-20">
          <p className="text-5xl font-bold inline border-b-4 text-primary-dark border-primary">
            Work
          </p>
          <p className="py-12 text-3xl text-muted">Check out some of my recent work</p>
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

