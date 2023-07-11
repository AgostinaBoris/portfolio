import React from "react";
import EcommerceJs from "./Works/EcommerceJs";
import EcommerceNext from "./Works/EcommerceNext";
import Sushi from "./Works/Sushi";
import Nikko from "./Works/Nikko";
import Tesla from "./Works/Tesla";

const Work = () => {
  return (
    <div name="work" className="w-full h-full text-gray-300 bg-black pb-20">
      <div className="max-w-7xl mx-auto pt-20 pl-10 sm:px-6 lg:px-8 ">
        <div className="py-8 mt-20">
          <p className="text-4xl font-bold inline border-b-4  border-pink-600">
            Work
          </p>
          <p className="py-6 text-3xl">Check out some of my recent work</p>
        </div>

        {/* Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12">
        <EcommerceNext />
        <Sushi />
        <Nikko />
        <EcommerceJs />
        <Tesla />



        </div>
      </div>
    </div>
  );
};

export default Work;
