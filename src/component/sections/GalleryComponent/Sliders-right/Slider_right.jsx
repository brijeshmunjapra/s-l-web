import React, { useState } from "react";
import "./Slider_rigth.scss";
import img1 from '../../../../assets/fourth-section/1.webp'
import img2 from '../../../../assets/fourth-section/2.webp'
import img3 from '../../../../assets/fourth-section/3.webp'
import img4 from '../../../../assets/fourth-section/4.webp'
import img5 from '../../../../assets/fourth-section/5.webp'
import img6 from '../../../../assets/fourth-section/6.webp'
// import img7 from '../../../assets/fourth-section/7.webp'
// import img8 from '../../../assets/fourth-section/8.webp'
// import img9 from '../../../assets/fourth-section/9.webp'
// import img10 from '../../../assets/fourth-section/10.webp'
// import img11 from '../../../assets/fourth-section/11.webp'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

const Slider_right = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="brijesh-section">
      <div className="container">
        {/* LEFT CONTENT */}
        <div className="content">
          <h2>Brijesh & Radhika</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic types.
          </p>
        </div>

        {/* RIGHT SLIDER */}
        <div className="slider">
          <button className="nav left" onClick={prevSlide}>
            ❮
          </button>

          <div className="slider-track">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                style={{
                  transform: `translateX(${(i - index) * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              />
            ))}
          </div>

          <button className="nav right" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider_right;
