import React, { useEffect } from "react";
import PageColumn, { pageY } from "../components/Layout/PageColumn";
import ExpertiseSection from "../components/Expertise/Expertise";

// Expertise lives on its own page, reached from the menu (replaces /skills).
export default function Expertise() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <PageColumn className={`min-h-fill ${pageY}`}>
      <ExpertiseSection />
    </PageColumn>
  );
}
