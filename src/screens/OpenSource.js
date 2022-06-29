import Project from "../components/project/Project";
import { projects } from "../portfolio/projects";
import Greeting from "../components/greeting/Greeting";

export default function OpenSource() {
  return (
    <div className="relative mx-10vw pb-16">
      <Greeting
        url={new URL("../assets/images/rocket.webp", import.meta.url).href}
        isName={false}
        description={"Helping enterpises build & ship high quality software 🚀"}
        subdescription={""}
        isSocial={true}
      />
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl">
        <div className="col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
            <span className="inline-flex">Open Source</span>
          </h1>
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl p-3">
        {projects.map((project, i) => (
          <Project
            key={i}
            project={{
              source: project.source,
              title: project.title,
              imgSource: project.imgSource,
              description: project.description,
            }}
          />
        ))}
      </div>
    </div>
  );
}
