import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          href="#"
        >
          <span className="ml-3 text-xl font-sign">
            &lt; Srinivasan Sekar /&gt;
          </span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a
            href="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            aria-current="page"
          >
            Home
          </a>

          <a
            href="#opensource"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Open Source
          </a>

          <a
            href="#blogs"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Blogs
          </a>

          <a
            href="#talks"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Talks
          </a>
          <a
            href="#feeds"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            Feeds
          </a>
          <a
            href="#aboutme"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            About Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
