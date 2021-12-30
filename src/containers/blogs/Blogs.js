import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { blogs } from "../../portfolio/blogs";

let blogList = [];
blogs.forEach((blog) => {
  blogList.push(
    <figure className="shadow shadow-blue-800/40 md:shadow-indigo-500/40 text-yellow-50 md:flex rounded-xl p-8 md:p-0 dark:bg-gray-800 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="p-2 text-center md:text-left space-y-4 tracking-wide">
        <a href={blog.source} target="_blank" rel="noreferrer">
          <blockquote>
            <p className="text-xl p-3 font-lora mb-1">{blog.title}</p>
          </blockquote>
          <div className="inline-flex text-center align-middle">
            <Player
              autoplay
              loop
              src="https://assets5.lottiefiles.com/packages/lf20_3oogeo8f.json"
              style={{ height: "40px", width: "40px" }}
            />
            <span className="self-center text-xs text-white">{blog.tags}</span>
          </div>
        </a>
      </div>
    </figure>
  );
});

export default function Blogs() {
  return (
    <div className="md:container md:mx-auto pt-5" id="blogs">
      <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
        <span className="inline-flex">
          Blogs
          <img
            height="40px"
            width="40px"
            src="https://superscene.pro/images/modal/money-bag.png"
            alt="moneyBag"
          />
        </span>
      </h1>
      <p className="text-indigo-100 text-2xl decoration-2 pl-3 pb-3">
        I love to write blogs to share my knowledge with wider community.
      </p>
      <div className="flex flex-col md:grid grid-cols-4 gap-3 p-3">
        {blogList}
      </div>
    </div>
  );
}
