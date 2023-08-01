import React from "react";
import data from "../../utils/data.js";


const Projects = () => {
  return data.map((c) => {
    return (
      <div
        key={c.id}
        className=" group container rounded-md flex justify-center items-center m-auto  content-div"
      >
        {/* Hover effects */}
        <div className="opacity-80 group-hover:opacity-40">
         
          <img className="h-auto w-auto flex justify-center items-center m-auto bg-cover overflow-hidden" src={c.img} alt="/"></img>
           <span className="text-2xl font-bold flex justify-center items-center text-white tracking-wider py-4">
          {c.name}
          </span>

          <div className="flex justify-center items-center py-4">
            <a href={c.deploy}>
      
              <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg ">
                Demo
              </button>
              
            </a>
            <a href={c.codigo}>
              <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg ">
                Code
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  });
};

export default Projects;
