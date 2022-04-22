export default function Project({ project }) {
  return (
    <div className="col-span-4 mb-10 shadow-2xl shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 rounded-xl p-8 bg-gray-800 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <a href={project.source} target="_blank" rel="noreferrer">
        <img
          decoding="async"
          className="rounded-full h-24 md:w-24 p-2 mx-auto"
          src={require(`../../assets/images/${project.imgSource}`)}
          alt={project.title}
        />
        <div className="pb-3 pt-2 text-center leading-tight text-lg font-inter text-white">
          {project.title}
        </div>
        <p className="text-lg text-gray-400 font-lora">{project.description}</p>
      </a>
    </div>
  );
}
