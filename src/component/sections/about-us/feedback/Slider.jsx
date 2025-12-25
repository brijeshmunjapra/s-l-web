import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import user1 from "../../../../assets/about-us/1.jpg";

import "./Slider.scss";

export default function Slider({ onSwiperInit }) {
  const swiperRef = useRef(null);

  return (
    <>

      <Swiper
        watchSlidesProgress={true}
        slidesPerView={2}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (onSwiperInit) onSwiperInit(swiper);
        }}
      >
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>          <div className="card">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
          <div className="user">
            <img src={user1} />
            <div>
              <h4>John Smith</h4>
              <span>Customers</span>
            </div>
          </div>
          <span className="quote">“</span>
        </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum porro exercitationem libero. Nesciunt.</p>
            <div className="user">
              <img src={user1} />
              <div>
                <h4>John Smith</h4>
                <span>Customers</span>
              </div>
            </div>
            <span className="quote">“</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
