import React from "react";
import data from "../../utils/data.js";
import ProjectCard from "./ProjectCard.jsx";

const Projects = () => {
  return data.map((c, i) => (
    <ProjectCard key={c.id} c={c} delay={(i % 2) * 100} />
  ));
};

export default Projects;
