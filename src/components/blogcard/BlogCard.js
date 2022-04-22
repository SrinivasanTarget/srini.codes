import React from "react";

export default function BlogCard({ blog }) {
  return (
    <div className="col-span-4 mb-5 shadow-2xl shadow-blue-800/40 md:shadow-indigo-500/40 text-white rounded-xl p-8 bg-gray-800 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <a href={blog.source} target="_blank" rel="noreferrer">
        <blockquote>
          <p className="text-xl p-3 font-lora mb-1 h-32">{blog.title}</p>
        </blockquote>
        <div className="inline-flex text-center align-middle">
          <div className="relative flex h-full w-full items-center justify-center whitespace-nowrap text-inverse">
            <span className="text-gray-400 font-lora pl-3">Read blog</span>
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
        </div>
      </a>
    </div>
  );
}
