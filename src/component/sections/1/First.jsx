import React from "react";
import "./First.scss";
import leftImage from "../../../assets/first-section/left.jpg";
import rightImage from "../../../assets/first-section/right.jpg";
import cornerSvg from "../../../assets/first-section/right-image-left-top-corner.svg";
import topImage from "../../../assets/first-section/masterpiece.svg";

const First = () => {
  return (
    <div className="first-section">
      <div className="first-section-left">
        <img src={leftImage} alt="Left" />
      </div>
      <div className="first-section-top">
        <div className="top-content">
          <div className="top-content-text">
            <div className="top-content-text-line-1">Where Memories</div>
            <div className="top-content-text-line-2">Find their Modern</div>
          </div>
          <img src={topImage} alt="Top" />
        </div>
      </div>
      <div className="first-section-middle">
        <div className="middle-content">
          <div>
            Recognised as a leading voice in modern wedding photography and
            filmmaking, Shade & Light has spent years shaping a visual style
            that blends emotion, artistry, and cinematic elegance
          </div>
          <div>
            Our long-standing journey has given us the privilege of creating
            photographs and films that become treasured heirlooms crafted with
            intention, depth, and heart.
          </div>
          <div>
            {
              "With a trusted legacy and a distinct creative vision, Shade & Light continues to reimagine how love, culture, and celebration are captured.\nWe don’t just document weddings.\nWe create art that lives on."
            }
          </div>
        </div>
      </div>
      <div className="first-section-right">
        <div className="right-image-wrapper">
          <img src={rightImage} alt="Right" />
          <img src={cornerSvg} alt="Corner decoration" className="corner-svg" />
        </div>
      </div>
    </div>
  );
};

export default First;
