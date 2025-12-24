import React, { useState } from "react";
import "./FeedBack.scss";

import brideImg from "../../../../assets/about-us/1.jpg";
import user1 from "../../../../assets/about-us/1.jpg";
import Slider from "./Slider";

const FeedBack = () => {
  const [swiper, setSwiper] = useState(null);

  const handlePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  const handleSwiperInit = (swiperInstance) => {
    setSwiper(swiperInstance);
  };

  return (
    <section className="testimonials">
      <div className="container">
        {/* LEFT */}
        <div className="content">
          <span className="subtitle">
            GENTLE FRAMES, LASTING IMPRESSIONS
          </span>
          <h2 className="title">What Our Clients Say</h2>
          <div className="arrows">
            <button onClick={handlePrev}>←</button>
            <button onClick={handleNext}>→</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="image-box">
          <img src={brideImg} alt="Bride" />

          <div className="rating">
            <div className="stars">★★★★★</div>
            <h4>4.8 / 5 positive Ratings</h4>
            <span>Based on 500+ Reviews</span>
          </div>
        </div>
      </div>
      <Slider onSwiperInit={handleSwiperInit} />
    </section>

  );
};

export default FeedBack;
