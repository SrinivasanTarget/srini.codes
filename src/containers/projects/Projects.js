import React from "react";
import { projects } from "../../portfolio/projects";

let projectList = [];
projects.forEach((project) => {
  projectList.push(
    <figure className="drop-shadow-2xl text-yellow-50 md:flex bg-gray-100 rounded-xl p-8 md:p-0 dark:bg-gray-800 hover:bg-gradient-to-r from-gray-500">
      <div className="grid-cols-2 p-4">
        <img
          src={require(`../../assets/images/${project.imgSource}`)}
          alt={project.title}
          width="90px"
          height="90px"
        />
      </div>
      <div className="p-2 text-center md:text-left space-y-4 tracking-wide">
        <a href={project.source} target="_blank" rel="noreferrer">
          <blockquote>
            <p className="text-xl font-lora">{project.description}</p>
          </blockquote>
          <figcaption>
            <div className="text-gray-300 pb-3 pt-2 text-sm">
              {project.title}
            </div>
          </figcaption>
        </a>
      </div>
    </figure>
  );
});

export default function Projects() {
  return (
    <div className="md:container md:mx-auto pt-5" id="opensource">
      <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
        <span className="inline-flex">
          Open Source
          <img
            width="40px"
            height="35px"
            src="https://superscene.pro/images/modal/red-heart.png"
            alt="red heart"
          />
        </span>
      </h1>
      <div className="grid grid-cols-3 gap-3 p-3">{projectList}</div>
    </div>
  );
}
