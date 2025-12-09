import React from "react";
import "./About.scss";
import image from "../../assets/sixth-section/bg.jpg";

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
        <img src={image} alt="About Us" />
      </div>
    </div>
  );
};

export default About;
