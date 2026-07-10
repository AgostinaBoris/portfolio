import React from "react";
import { HiSparkles } from "react-icons/hi";
import YO from '../assets/yop.jpg'

const points = [
  "I'm a Product Designer and Front-End Developer focused on creating clear, accessible, and visually polished digital experiences.",
  "My work combines user research, interface design, prototyping, and responsive development to turn ideas into functional, intuitive products.",
  "With a background in front-end development, I design with real implementation in mind — creating experiences that are thoughtful, feasible, and ready to grow.",
];

function About() {
  return (
    <div name="about" className="relative w-full min-h-screen pt-[110px] pb-16 bg-background overflow-hidden">
      {/* Decorative background blobs: soft, blurred, layered for a delicate 3D depth feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-accent/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/4 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-primary-dark">About</h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-primary-dark/70" />
            <HiSparkles className="text-primary-dark" />
            <span className="h-px w-14 bg-primary-dark/70" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 items-start">
          <div className="flex flex-col items-start">
            <p className="font-serif text-4xl text-primary-dark mb-8">
              Hi, I&rsquo;m Agostina.
            </p>
            <img
              src={YO}
              alt="Agostina Boris"
              className="rounded-full w-full max-w-[400px] h-auto border-4 border-accent/50 shadow-xl"
            />
          </div>
          <div className="space-y-8 sm:mt-20">
            {points.map((text) => (
              <div key={text} className="flex items-start gap-3">
                <HiSparkles className="text-accent shrink-0 mt-1.5" size={18} />
                <p className="text-xl text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
