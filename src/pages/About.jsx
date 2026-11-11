import React, { useEffect } from "react";
import PageColumn, { pageY } from "../components/Layout/PageColumn";
import AboutSection from "../components/About/About";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <PageColumn className={`min-h-fill ${pageY}`}>
      <AboutSection />
    </PageColumn>
  );
}
