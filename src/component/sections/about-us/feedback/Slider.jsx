import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import user1 from "../../../../assets/about-us/1.jpg";
import quoteIcon from "../../../../assets/about-us/quote.svg";

import { fetchReviews } from "../../../../store/slices/reviewsSlice";

import "./Slider.scss";

export default function Slider({ onSwiperInit, onPositionChange }) {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  const { data: reviewsData, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleSlideChange = (swiper) => {
    if (onPositionChange) {
      onPositionChange({
        isBeginning: swiper.isBeginning,
        isEnd: swiper.isEnd
      });
    }
  };

  // Filter reviews where active is true
  const activeReviews = reviewsData?.data?.reviews?.filter(review => review.active) || [];

  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={2}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (onSwiperInit) onSwiperInit(swiper);
          // Initial position check
          if (onPositionChange) {
            onPositionChange({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd
            });
          }
        }}
        onSlideChange={handleSlideChange}
      >
        {activeReviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="card">
              <p>{review.reviewContent}</p>
              <div className="user">
                <div>
                  <h4>{review.clientName}</h4>
                  <span>Customers</span>
                </div>
              <img src={quoteIcon} alt="quote" className="quote" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
