import React from "react";
import YO from '../assets/yop.jpg'


function About() {
  return (
    <div name="about" className="w-full h-full pt-20 pl-10 bg-background ">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right mt-20 pb-8 pl-4">
            <p className="text-5xl font-bold inline border-b-4 text-primary-dark border-primary">
              About
            </p>
          </div>
        </div>
        <div className="max-w-[1400px] w-full grid sm:grid-cols-2 py-20 gap-8 px-4">
          <div className="flex flex-col items-end">
            <p className="sm:text-right text-primary-dark text-4xl font-bold">
              Hi, I&rsquo;m Agostina.
            </p>
            <img
              src={YO}
              alt="Agostina Aldana Boris"
              className="mt-8 rounded-full w-full max-w-[320px] h-auto border-4 border-border"
            />
          </div>
          <div className="space-y-6">
            <p className="text-2xl text-muted">
              I&rsquo;m a UX/UI Designer and Front-End Developer focused on
              creating clear, accessible, and visually polished digital
              experiences.
            </p>
            <p className="text-2xl text-muted">
              My work combines user research, interface design, prototyping,
              and responsive development. I enjoy turning ideas into
              functional products, designing interfaces that are not only
              beautiful, but also intuitive, structured, and easy to use.
            </p>
            <p className="text-2xl text-muted">
              With a background in frontend development, I design with real
              implementation in mind — creating experiences that are
              thoughtful, feasible, and ready to grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
