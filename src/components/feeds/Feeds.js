import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default function Feeds() {
  return (
    <div className="md:container md:mx-auto" id="feeds">
      <h1 className="text-indigo-100 text-5xl decoration-4 p-4">
        <span className="inline-flex">
          Feeds {""}
          <img
            width="50px"
            height="40px"
            src="https://superscene.pro/images/modal/snowman.png"
            alt=""
          />
        </span>
      </h1>
      <div className="pl-5 bg">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="srinivasanskr"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
}
