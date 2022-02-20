import React from "react";
import Greeting from "../components/greeting/Greeting";
import Header from "../components/header/Header";
import Projects from "./projects/Projects";
import Blogs from "./blogs/Blogs";
import Conferences from "./conferences/conferences";
import ContactInfo from "./aboutme/AboutMe";
import ScrollToTop from "./scroll/ScrollToTop";
import Feeds from "../components/feeds/Feeds";
import Footer from "../components/footer/Footer";

const Main = () => {
  return (
    <div>
      <Header />
      <Greeting />
      <Projects />
      <Blogs />
      <Conferences />
      <Feeds />
      <ContactInfo />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Main;
