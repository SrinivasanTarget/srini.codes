export default function ConferenceCard({ conference }) {
  return conference.reverse ? (
    <div className="flex flex-row-reverse md:contents">
      <div className="shadow-2xl shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 bg-gray-800 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto">
        <h3 className="font-semibold text-xl mb-1 font-lora">
          {conference.title}
        </h3>
        <a
          className="leading-tight text-justify"
          href={conference.url}
          target="_blank"
          rel="noreferrer"
        >
          {conference.description}
        </a>
      </div>
      <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow"></div>
      </div>
    </div>
  ) : (
    <div className="flex md:contents">
      <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow"></div>
      </div>
      <div className="shadow-2xl shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 bg-gray-800 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto">
        <h3 className="font-semibold text-xl font-lora mb-1">
          {conference.title}
        </h3>
        <a
          className="leading-tight text-justify"
          href={conference.url}
          target="_blank"
          rel="noreferrer"
        >
          {conference.description}
        </a>
      </div>
    </div>
  );
}
