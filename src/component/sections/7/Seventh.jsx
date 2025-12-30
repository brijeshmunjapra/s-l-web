import React from "react";
import "./Seventh.scss";

import image1 from "../../../assets/seventh-section/1.webp";
import image2 from "../../../assets/seventh-section/2.webp";
import image3 from "../../../assets/fifth-section/2.webp";
import image4 from "../../../assets/seventh-section/4.webp";
import image5 from '../../../assets/fourth-section/4.webp'
import Frame from "../../../assets/seventh-section/Frame.png"
const Seventh = () => {
  return (
    <section className="seventh">
      <div className="seventh__wrapper">

        {/* LEFT IMAGE GRID */}
        <div className="seventh__grid">
          <div className="col">
            <img src={image1} alt="" />
            <img src={image4} alt="" />
          </div>

          <div className="col center">
            <img src={image2} alt="" />
          </div>

          <div className="col">
            <img src={image3} alt="" />
            <img src={image5} alt="" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="seventh__content">
          <h2>JOIN OUR VISUAL JOURENY</h2>

          <p className="sub-heading">
            Every photograph is a blend of emotion, light, and storytelling
            crafted with care. Follow us to experience moments that turn into
            timeless memories.
          </p>

          <div className="seventh__social">
            <div>
              <span>INSTAGRAM</span>
              <a href="https://www.instagram.com/shadeandlight__/"target="_blank">@shadeandlightt__<span><img src={Frame} alt="" className="Frame-icon" /></span></a>
            </div>

            <div className="divider" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Seventh;
