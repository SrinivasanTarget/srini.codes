import { projects } from "../../portfolio/projects";

export default function Projects() {
  return (
    <div className="relative mx-10vw" id="opensource">
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl">
        <div className="col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
            <span className="inline-flex">
              Open Source
              <img
                className="pl-2 w-11 h-11"
                src="https://superscene.pro/images/modal/red-heart.png"
                alt="red heart"
              />
            </span>
          </h1>
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl p-3">
        {projects.map((project, i) => (
          <div
            key={i}
            className="col-span-4 mb-10 shadow shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 rounded-xl p-8 bg-gray-800 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black"
          >
            <a href={project.source} target="_blank" rel="noreferrer">
              <img
                className="rounded-full h-24 md:w-24 p-2 mx-auto"
                src={require(`../../assets/images/${project.imgSource}`)}
                alt={project.title}
              />
              <div className="pb-3 pt-2 text-center leading-tight text-lg font-inter text-white">
                {project.title}
              </div>
              <p className="text-lg text-gray-400 font-lora">
                {project.description}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
