import React from "react";
import { blogs } from "../../portfolio/blogs";

export default function Blogs() {
  return (
    <div className="relative mx-10vw pb-16" id="blogs">
      <div className="relative grid grid-cols-4 gap-x-2 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-2 mx-auto max-w-7xl">
        <div className="col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
            <span className="inline-flex">
              Blogs
              <img
                decoding="async"
                className="pl-2 w-12 h-12"
                src="https://superscene.pro/images/modal/money-bag.png"
                alt="moneyBag"
              />
            </span>
          </h1>
        </div>
      </div>
      <div className="relative grid grid-cols-4 gap-x-2 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-2 mx-auto max-w-7xl">
        <p className="text-indigo-100 text-2xl decoration-2 pl-3 pb-3 col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          I love to write blogs to share my knowledge with wider community.
        </p>
      </div>
      <div className="relative grid grid-cols-4 gap-x-5 md:grid-cols-8 lg:grid-cols-12 mx-auto max-w-7xl p-3">
        {blogs.map((blog, i) => (
          <div
            key={i}
            className="col-span-4 mb-5 shadow-2xl shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 rounded-xl p-8 bg-gray-800 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <a href={blog.source} target="_blank" rel="noreferrer">
              <blockquote>
                <p className="text-xl p-3 font-lora mb-1">{blog.title}</p>
              </blockquote>
              <div className="inline-flex text-center align-middle">
                <a className="group relative inline-flex text-lg font-medium focus:outline-none opacity-100 disabled:opacity-50 transition">
                  <div className="relative flex h-full w-full items-center justify-center whitespace-nowrap text-inverse">
                    <span className="text-gray-400 font-lora pl-3">
                      Read blog
                    </span>
                    <span>
                      <svg
                        className="transform rotate-[235deg] text-gray-400"
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
