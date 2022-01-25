import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Greeting() {
  return (
    <div className="md:container md:mx-auto px-4 py-20">
      <div className="flex flex-col md:grid grid-flow-col">
        <div>
          <div className="text-gray-100 font-lora pl-4">
            <h1 className="text-6xl content-center font-lora">
              {" I'm Srini "}
              <span className="inline-flex">
                <Player
                  autoplay
                  loop
                  src="https://assets3.lottiefiles.com/packages/lf20_6niurjte.json"
                  style={{ height: "50px", width: "50px" }}
                />
              </span>
            </h1>
            <p className="inline-flex text-3xl">
              A passionate Quality Analyst 🚀 having experience of testing
              Microservices, Web and Mobile applications.
            </p>
          </div>
          <div className="p-3 inline-flex">
            <a href="https://github.com/SrinivasanTarget" className="pr-3">
              <Player
                autoplay
                loop
                src="https://assets7.lottiefiles.com/packages/lf20_Cko7Sr.json"
                style={{ height: "50px", width: "50px" }}
              />
            </a>
            <a href="https://twitter.com/srinivasanskr" className="pr-3">
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/private_files/lf30_oahjps8u.json"
                style={{ height: "50px", width: "50px" }}
              />
            </a>
            <a href="mailto:srinivasan.sekar1990@gmail.com" className="pr-3">
              <Player
                autoplay
                loop
                src="https://assets7.lottiefiles.com/packages/lf20_tszzqucf.json"
                style={{ height: "50px", width: "50px" }}
              />
            </a>
          </div>
          <div className="p-4">
            <a href="#contacts">
              <button
                type="button"
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full"
              >
                Contact Me
              </button>
            </a>
          </div>
        </div>
        <div className="inline-flex">
          <img src={require("../../assets/images/figma.png")} />
        </div>
      </div>
    </div>
  );
}
