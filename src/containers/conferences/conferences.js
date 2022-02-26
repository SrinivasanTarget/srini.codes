import React from "react";
import { conferences } from "../../portfolio/conferences";

export default function Conferences() {
  return (
    <div className="relative mx-10vw" id="talks">
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl">
        <div className="col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
            <span className="inline-flex">
              Conferences
              <img
                className="pl-2 w-12 h-12"
                src="https://superscene.pro/images/modal/trophy.png"
                alt="trophy"
              />
            </span>
          </h1>
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl">
        <p className="text-indigo-100 text-2xl decoration-2 pl-3 pb-3 col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          I love speaking in conferences and mentor others present in
          conferences
        </p>
      </div>
      <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
        {conferences.map((conference, i) =>
          conference.reverse ? (
            <div key={i} className="flex flex-row-reverse md:contents">
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
            <div key={i} className="flex md:contents">
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
          )
        )}
      </div>
    </div>
  );
}
