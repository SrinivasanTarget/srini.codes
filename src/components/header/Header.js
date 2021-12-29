import React from "react";

const Header = () => {
  return (
    <header>
      <div className="grid gap-4 grid-cols-9 grid-flow-row-dense">
        <div className="col-span-4 pt-3">
          <span className="text-gray-50 text-3xl pl-7"> &lt;</span>
          <span className="font-sign indent-4 p-3 text-gray-50 text-3xl">
            Srinivasan Sekar
          </span>
          <span className="text-gray-50 text-3xl">/&gt;</span>
        </div>

        <a
          href="#opensource"
          className="text-gray-50 hover:text-sky-400 py-3 px-3 font-bold text-center text-lg"
        >
          Open Source
        </a>
        <a
          href="#blogs"
          className="text-gray-50 hover:text-sky-400 py-3 px-3 font-bold text-center text-lg"
        >
          Blogs
        </a>
        <a
          href="#talks"
          className="text-gray-50 hover:text-sky-400 py-3 px-3 font-bold text-center text-lg"
        >
          Talks
        </a>
        <a
          href="#feeds"
          className="text-gray-50 hover:text-sky-400 py-3 px-3 font-bold text-center text-lg"
        >
          Feeds
        </a>
        <a
          href="#contacts"
          className="text-gray-50 hover:text-sky-400 py-3 px-3 font-bold text-center text-lg"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
};

export default Header;
