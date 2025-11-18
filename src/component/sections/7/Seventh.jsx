import React from "react";
import "./Seventh.scss";
import image1 from "../../../assets/seventh-section/1.webp";
import image2 from "../../../assets/seventh-section/2.webp";
import image3 from "../../../assets/seventh-section/3.webp";
import image4 from "../../../assets/seventh-section/4.webp";
import image5 from "../../../assets/seventh-section/5.webp";
import image6 from "../../../assets/seventh-section/6.webp";
import image7 from "../../../assets/seventh-section/7.webp";

const Seventh = () => {
  return (
    <div>
      <div className="seventh-section-container">
        <div className="seventh-section-header">
          <h2 className="seventh-section-heading">FOLLOW US ON INSTAGRAM</h2>
        </div>
        <div className="seventh-section-images">
          <div className="seventh-section-images-column">
            <div className="seventh-section-image-wrapper">
              <img
                src={image1}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
            <div className="seventh-section-image-wrapper">
              <img
                src={image2}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
          </div>
          <div className="seventh-section-images-column">
            <div className="seventh-section-image-wrapper">
              <img
                src={image3}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
          </div>
          <div className="seventh-section-images-column">
            <div className="seventh-section-image-wrapper">
              <img
                src={image4}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
            <div className="seventh-section-image-wrapper">
              <img
                src={image5}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
            <div className="seventh-section-image-wrapper">
              <img
                src={image6}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
          </div>
          <div className="seventh-section-images-column">
            <div className="seventh-section-image-wrapper">
              <img
                src={image7}
                alt="Wedding couple"
                className="seventh-section-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seventh;
