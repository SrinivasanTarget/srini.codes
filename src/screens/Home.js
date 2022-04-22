import React from "react";
import Greeting from "../components/greeting/Greeting";
import Projects from "../containers/projects/Projects";
import Blogs from "../containers/blogs/Blogs";
import Conferences from "../containers/conferences/conferences";
import Feeds from "../components/feeds/Feeds";

export default function Home() {
  return (
    <div>
      <Greeting
        url={new URL("../assets/images/figma.png", import.meta.url).href}
        isName={true}
        description={"Helping enterpises build & ship high quality software 🚀"}
        subdescription={"Quality Analyst @ Thoughtworks"}
        isSocial={true}
      />
      <Projects />
      <Blogs />
      <Conferences />
      <Feeds />
    </div>
  );
}
