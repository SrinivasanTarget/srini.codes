import React from "react";
import { projects } from "../../portfolio/projects";

export default function Projects() {
  return (
    <div className="md:container md:mx-auto pt-5" id="opensource">
      <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
        <span className="inline-flex">
          Open Source
          <img
            className="w-12 h-12"
            src="https://superscene.pro/images/modal/red-heart.png"
            alt="red heart"
          />
        </span>
      </h1>
      <div className="flex flex-col md:grid grid-cols-3 gap-3 p-3">
        {projects.map((project, i) => (
          <figure
            key={i}
            className="shadow shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 md:flex rounded-xl p-8 md:p-0 bg-gray-800 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black"
          >
            <div className="md:shrink-0">
              <img
                className="rounded-full h-24 md:w-24 p-2 mx-auto"
                src={require(`../../assets/images/${project.imgSource}`)}
                alt={project.title}
              />
            </div>
            <div className="p-2 text-center md:text-left space-y-4 tracking-wide">
              <a href={project.source} target="_blank" rel="noreferrer">
                <p className="text-lg font-lora">{project.description}</p>
                <figcaption>
                  <div className="text-blue-300 pb-3 pt-2 text-sm">
                    {project.title}
                  </div>
                </figcaption>
              </a>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
