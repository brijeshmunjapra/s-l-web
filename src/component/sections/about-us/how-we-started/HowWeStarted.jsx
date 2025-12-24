import React from "react";
import "./HowWeStarted.scss";
import OurStory from "../../../../assets/about-us/our-story.svg";
import Banner from "../../../../assets/about-us/1.jpg";

const HowWeStarted = () => {
  return (
    <div className="how-we-started-container">
      <div className="how-we-started-title">How We Started</div>
      <div className="how-we-started-content">
        <div className="how-we-started-left">
          <img src={OurStory} alt="Our Story" />
          <div className="how-we-started-left-content">
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic types.
            </div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic types.
            </div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic types.
            </div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </div>
          </div>
        </div>
        <div className="how-we-started-right">
          <img src={Banner} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default HowWeStarted;
