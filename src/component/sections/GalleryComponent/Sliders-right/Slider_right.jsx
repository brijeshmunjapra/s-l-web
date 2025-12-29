import React, { useEffect, useRef, useState } from 'react';
import "./Slider_rigth.scss";
import img1 from '../../../../assets/fourth-section/1.webp';
import img2 from '../../../../assets/fourth-section/2.webp';
import img3 from '../../../../assets/fourth-section/3.webp';
import img4 from '../../../../assets/fourth-section/4.webp';
import img5 from '../../../../assets/fourth-section/5.webp';
import img6 from '../../../../assets/fourth-section/6.webp';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';

const Slider_right = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCurrentSlide, setPopupCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const sliderImages = [img1, img2, img3, img4, img5, img6];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const openPopup = (startIndex) => {
    setPopupCurrentSlide(startIndex);
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextPopupSlide = () => {
    setPopupCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevPopupSlide = () => {
    setPopupCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = -currentSlide * (100 / 3); // 100% / 3 positions = 33.333% per slide
      sliderRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isPopupOpen) return;

      switch (event.key) {
        case 'Escape':
          closePopup();
          break;
        case 'ArrowLeft':
          prevPopupSlide();
          break;
        case 'ArrowRight':
          nextPopupSlide();
          break;
        default:
          break;
      }
    };

    if (isPopupOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopupOpen, popupCurrentSlide]);

  return (
    <section className="slider-right-brijesh-section">
      <div className="slider-right-content">
        <h2>Brijesh & Radhika</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic types.
        </p>
      </div>
      <div className="slider-right-slider_space">
        <button className='slider-right-arrow-left' onClick={prevSlide}>
          <IoIosArrowBack />
        </button>
        <button className='slider-right-arrow-Rigth' onClick={nextSlide}>
        <IoIosArrowForward />
        </button>
        <div className="slider-right-slider-container">
          <div ref={sliderRef} className='slider-right-slider-track'>
            {sliderImages.map((img, index) => (
              <div key={`slider-${index}`} className='slider-right-slider-item'>
                <img
                  src={img}
                  alt={`Slider ${index + 1}`}
                  loading="lazy"
                  onClick={() => openPopup(index)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
            {/* Duplicate first 2 images for seamless loop */}
            {sliderImages.slice(0, 2).map((img, index) => (
              <div key={`slider-duplicate-${index}`} className='slider-right-slider-item'>
                <img
                  src={img}
                  alt={`Slider ${index + 1}`}
                  loading="lazy"
                  onClick={() => openPopup(index)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup/Modal */}
      {isPopupOpen && (
        <div className="slider-popup-overlay" onClick={closePopup}>
          <div className="slider-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="slider-popup-close" onClick={closePopup}>
              <IoMdClose />
            </button>
            <div className="slider-popup-image-container">
              <button className="slider-popup-arrow slider-popup-arrow-left" onClick={prevPopupSlide}>
                <IoIosArrowBack />
              </button>
              <img
                src={sliderImages[popupCurrentSlide]}
                alt={`Popup Slider ${popupCurrentSlide + 1}`}
                className="slider-popup-image"
              />
              <button className="slider-popup-arrow slider-popup-arrow-right" onClick={nextPopupSlide}>
                <IoIosArrowForward />
              </button>
            </div>
            <div className="slider-popup-indicators">
              {sliderImages.map((_, index) => (
                <span
                  key={index}
                  className={`slider-popup-indicator ${index === popupCurrentSlide ? 'active' : ''}`}
                  onClick={() => setPopupCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Slider_right;
