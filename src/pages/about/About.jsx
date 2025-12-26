import React from "react";
import "./About.scss";
import HowWeStarted from "../../component/sections/about-us/how-we-started/HowWeStarted";
import FeedBack from "../../component/sections/about-us/feedback/FeedBack";
// import Vertical_timeline from "../../component/sections/about-us/Vertical_timeline/Vertical_timeline";
import Award from "../../component/sections/Award/Award";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="about-header-title">About Us</div>
        <div className="about-header-description">
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged.
        </div>
      </div>
      <div className="about-image">
        <video className="video" src="https://event-pdf-crm.s3.ap-south-1.amazonaws.com/wesite-images/V%26V+INSTA+STORY+2.mp4" alt="About Us" autoPlay muted loop />
      </div>
      <HowWeStarted />
      <FeedBack />
      {/* <Vertical_timeline/> */}
      <Award/>
    </div>
  );
};

export default About;
