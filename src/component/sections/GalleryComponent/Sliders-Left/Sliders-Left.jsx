import React, { useEffect, useRef, useState } from 'react';
import "./Sliders-Left.scss";
import img1 from '../../../../assets/fourth-section/1.webp';
import img2 from '../../../../assets/fourth-section/2.webp';
import img3 from '../../../../assets/fourth-section/3.webp';
import img4 from '../../../../assets/fourth-section/4.webp';
import img5 from '../../../../assets/fourth-section/5.webp';
import img6 from '../../../../assets/fourth-section/6.webp';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Sliders_Left = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const sliderImages = [img1, img2, img3, img4, img5, img6];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = -currentSlide * (100 / 3); // 100% / 3 positions = 33.333% per slide
      sliderRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentSlide]);

  return (
    <section className="slider-left-brijesh-section">
      <div className="slider-left-slider_space">
        <button className='slider-left-arrow-left' onClick={prevSlide}>
          <IoIosArrowBack />
        </button>
        <button className='slider-left-arrow-Rigth' onClick={nextSlide}>
        <IoIosArrowForward />
        </button>
        <div className="slider-left-slider-container">
          <div ref={sliderRef} className='slider-left-slider-track'>
            {sliderImages.map((img, index) => (
              <div key={`slider-${index}`} className='slider-left-slider-item'>
                <img src={img} alt={`Slider ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {/* Duplicate first 2 images for seamless loop */}
            {sliderImages.slice(0, 2).map((img, index) => (
              <div key={`slider-duplicate-${index}`} className='slider-left-slider-item'>
                <img src={img} alt={`Slider ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="slider-left-content">
        <h2>Vivek  &  Palak</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic types.
        </p>
      </div>
    </section>
  );
};

export default Sliders_Left;