export default function Project({ project }) {
  return (
    <div className="col-span-4 mb-5 text-white">
      <div className="p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl">
        <div className="p-0.5 h-72 bg-gray-800 rounded-xl">
          <a href={project.source} target="_blank" rel="noreferrer">
            <img
              decoding="async"
              className="rounded-full h-24 md:w-24 p-2 mx-auto"
              src={require(`../../assets/images/${project.imgSource}`)}
              alt={project.title}
            />
            <div className="p-3 text-center leading-tight text-lg text-yellow-50">
              {project.title}
            </div>
            <p className="text-lg p-3 font-lora">{project.description}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
