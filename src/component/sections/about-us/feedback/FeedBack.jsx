import React, { useState } from "react";
import "./FeedBack.scss";

import brideImg from "../../../../assets/about-us/1.jpg";
import Slider from "./Slider";
import RigthArrow from "../../../../assets/about-us/Left-arrow.svg";
import LeftArrow from "../../../../assets/about-us/Rigth-arrow.svg";
import StarIcon from "../../../../assets/about-us/star.svg";


const FeedBack = () => {
  const [swiper, setSwiper] = useState(null);
  const [sliderPosition, setSliderPosition] = useState({ isBeginning: true, isEnd: false });

  const handlePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  const handleSwiperInit = (swiperInstance) => {
    setSwiper(swiperInstance);
  };

  const handlePositionChange = (position) => {
    setSliderPosition(position);
  };

  return (
    <section className="testimonials">
      <div className="container">
        {/* LEFT */}
        <div className="content">
          <span className="sub-heading subtitle">
            gentle frames, lasting impressions
          </span>
          <h2 className="title">What Our Clients Say</h2>
          <div className="arrows">
            <button onClick={handlePrev} className={sliderPosition.isBeginning ? 'disabled' : ''}>
              {/* <LeftArrow /> */}
              <img src={RigthArrow} alt="" />
            </button>
            <button onClick={handleNext} className={sliderPosition.isEnd ? 'disabled' : ''}>
              {/* <RightArrow */}
              <img src={LeftArrow} alt="" />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="image-box">
          <img src={brideImg} alt="Bride" />
          <div className="rating">
            <div className="stars">
              {Array.from({ length: 5 }, (_, index) => (
                <img key={index} src={StarIcon} alt="star" />
              ))}
            </div>
            <h4>4.8 / 5 positive Ratings</h4>
          </div>
        </div>

        <Slider onSwiperInit={handleSwiperInit} onPositionChange={handlePositionChange} />
      </div>
    </section>

  );
};

export default FeedBack;
