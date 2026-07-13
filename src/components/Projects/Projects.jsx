import React from "react";
import data from "../../utils/data.js";


const Projects = () => {
  return data.map((c) => {
    return (
      <div
        key={c.id}
        className="group container rounded-lg bg-surface border border-border shadow-md hover:shadow-lg duration-300 overflow-hidden flex flex-col items-center m-auto content-div"
      >
        <img className="w-full h-auto object-cover" src={c.img} alt={c.name}></img>
        <span className="text-2xl font-bold flex justify-center items-center text-text tracking-wider py-4">
          {c.name}
        </span>

        <div className="flex justify-center items-center flex-wrap pb-6">
          {c.codigo ? (
            <a href={c.codigo} target="_blank" rel="noopener noreferrer">
              <button className="text-center rounded-lg px-4 py-3 m-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg duration-300">
                Code
              </button>
            </a>
          ) : c.caseStudy ? (
            <a href={c.caseStudy} target="_blank" rel="noopener noreferrer">
              <button className="text-center rounded-lg px-4 py-3 m-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg duration-300">
                Case Study
              </button>
            </a>
          ) : null}
          {c.figmaPrototype ? (
            <a href={c.figmaPrototype} target="_blank" rel="noopener noreferrer">
              <button className="text-center rounded-lg px-4 py-3 m-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg duration-300">
                Figma Prototype
              </button>
            </a>
          ) : null}
          <a href={c.deploy} target="_blank" rel="noopener noreferrer">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-primary hover:bg-primary-dark text-white font-bold text-lg duration-300">
              {c.figmaPrototype ? "Live Demo" : "Demo"}
            </button>
          </a>
        </div>
      </div>
    );
  });
};

export default Projects;
