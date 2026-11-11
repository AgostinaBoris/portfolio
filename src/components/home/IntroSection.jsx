import React from "react";

export default function IntroSection() {
  return (
    <section
      id="intro"
      className="relative flex h-screen supports-[height:100svh]:h-[100svh] flex-col justify-center px-4 md:px-6"
    >
      <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
        [Frase intro — línea 1]
        <br />
        [Frase intro — línea 2]
      </h1>
      <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 flex items-end justify-between text-[15px]">
        <p>[Rol]</p>
        <a href="#work" className="hover:underline underline-offset-4">
          scroll ↓
        </a>
      </div>
    </section>
  );
}
