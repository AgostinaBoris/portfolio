import React from "react";


function About() {
  return (
    <div name="about" className="w-full h-full bg-black text-gray-300 mt-10">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-8 pl-4">
            <p className="text-4xl font-bold inline border-b-4 border-pink-600">
              About
        </p>
          </div>
    </div>
    <div className="max-w-[1400px] w-full grid sm:grid-cols-2 py-20 gap-8 px-4">
        <div className="sm:text-right text-4xl font-bold">
            <p>Hi. I'm Agostina, nice to meet you. Please take a look around.</p>
        </div>
        <div>
            <p>I am passionate about building software that improves the lives of those around me. Together, we can create transformative solutions that address your unique needs and drive your success forward. Let's embark on this exciting journey of innovation and collaboration.
            </p>
        </div>
    </div>
    </div>
    </div>
  );
}


export default About;
