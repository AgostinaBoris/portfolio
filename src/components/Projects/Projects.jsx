import React from "react";
import data from "../../utils/data.js";
import ProjectCard from "./ProjectCard.jsx";

const Projects = ({ limit }) => {
  return data.slice(0, limit).map((c, i) => (
    <ProjectCard key={c.id} c={c} delay={(i % 2) * 100} />
  ));
};

export default Projects;
