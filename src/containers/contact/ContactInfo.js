import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function ContactInfo() {
  return (
    <div className="shadow-lg">
      <div className="md:container md:mx-auto pt-5" id="contacts">
        <div className="flex flex-col md:grid">
          <div>
            <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
              <span className="inline-flex">
                Reach Me! {""}
                <img
                  className="w-12 h-12"
                  src="https://superscene.pro/images/modal/pushpin.png"
                  alt="pushpin"
                />
              </span>
            </h1>
            <span className="text-cyan-100 text-xl pl-4 flex flex-wrap">
              Thoughtworker | Open Source Contributor
              <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_VgPRtS.json"
                style={{ height: "45px", width: "45px" }}
              />
              | Conference Speaker{" "}
              <Player
                autoplay
                loop
                src="https://assets5.lottiefiles.com/packages/lf20_kujkzll7.json"
                style={{ height: "45px", width: "45px" }}
              />{" "}
              | Blogger{" "}
              <Player
                autoplay
                loop
                src="https://assets1.lottiefiles.com/packages/lf20_Q895iE.json"
                style={{ height: "45px", width: "45px" }}
              />{" "}
              | Mentor{" "}
              <Player
                autoplay
                loop
                src="https://assets7.lottiefiles.com/private_files/lf30_Fy9W8c.json"
                style={{ height: "45px", width: "45px" }}
              />
            </span>
            <div className="p-3">
              <a
                href="https://github.com/SrinivasanTarget"
                className="pr-3 inline-flex"
              >
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_Cko7Sr.json"
                  style={{ height: "50px", width: "50px" }}
                />
              </a>
              <a
                href="https://twitter.com/srinivasanskr"
                className="pr-3 inline-flex"
              >
                <Player
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/private_files/lf30_oahjps8u.json"
                  style={{ height: "50px", width: "50px" }}
                />
              </a>
              <a
                href="mailto:srinivasan.sekar1990@gmail.com"
                className="pr-3 inline-flex"
              >
                <Player
                  autoplay
                  loop
                  src="https://assets7.lottiefiles.com/packages/lf20_tszzqucf.json"
                  style={{ height: "50px", width: "50px" }}
                />
              </a>
            </div>
          </div>
          <div className="inline-flex">
            <img
              className="rounded-full shadow-2xl float-right scale-90 text-right"
              src="https://github.com/srinivasanTarget.png?size=200"
              alt="srinivasan sekar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
