import React from "react";
import Projects from "./../components/Projects/Projects";
import PageColumn, { bodyClass, headingClass, pageY } from "../components/Layout/PageColumn";

const Work = () => {
  return (
    <PageColumn className={`min-h-screen ${pageY}`}>
      <div name="work">
        <h1 className={headingClass}>Work</h1>
        <p className={`mt-6 md:mt-8 ${bodyClass}`}>Check out some of my recent work</p>

        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          <Projects />
        </div>
      </div>
    </PageColumn>
  );
};

export default Work;
