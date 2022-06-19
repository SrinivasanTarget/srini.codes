import { projects } from "../../portfolio/projects";
import NavigationArrow from "../../components/navigationArrow/NavigationArrow";

export default function Projects() {
  return (
    <div className="relative mx-10vw pb-16" id="opensource">
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-4 mx-auto max-w-7xl">
        <div className="col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0 mb-16">
          <div className="space-y-2 lg:space-y-0  pl-2">
            <h2 className="leading-tight text-3xl md:text-4xl text-white">
              Open Source
            </h2>
            <p className="leading-tight text-3xl md:text-4xl text-gray-400">
              I love contributing to Open Source Projects
            </p>
          </div>
          <NavigationArrow
            arrow={{ link: "opensource", context: "See all projects" }}
          />
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-4 mx-auto max-w-7xl p-3">
        {projects.slice(0, 2).map((project, i) => {
          return (
            <div key={i} className="col-span-full lg:col-span-6">
              <div className="relative h-full w-full pt-12">
                <div className="relative block h-full w-full rounded-lg bg-gray-800 px-8 pb-10 pt-36 md:px-16 md:pb-20 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                  <h3 className="leading-tight text-3xl md:text-4xl text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-sm h-44 leading-tight text-3xl md:text-4xl text-gray-400">
                    {project.description}
                  </p>
                  <a
                    className="mt-16 group relative rounded-2xl inline-flex text-lg font-inter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    target="_blank"
                    rel="noreferrer"
                    href={project.source}
                  >
                    <div className="relative flex h-full w-full items-center justify-center whitespace-nowrap text-inverse space-x-3 px-8 py-4">
                      <span>Visit</span>
                    </div>
                  </a>
                </div>
                <div className="absolute left-16 top-0">
                  <img
                    decoding="async"
                    className="rounded-full h-28 w-auto object-contain pt-2"
                    alt="logo"
                    src={require(`../../assets/images/${project.imgSource}`)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-56 lg:h-64"></div>
    </div>
  );
}
