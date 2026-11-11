import React, { useEffect } from "react";
import PageColumn, { pageY } from "../components/Layout/PageColumn";
import ProcessSection from "../components/Process/Process";

// Process lives on its own page, reached only from the menu.
export default function Process() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <PageColumn className={`min-h-fill ${pageY}`}>
      <ProcessSection />
    </PageColumn>
  );
}
