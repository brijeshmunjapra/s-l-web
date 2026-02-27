import React, { useEffect, useRef, useState } from 'react';
import "./Sliders-Left.scss";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';

const Sliders_Left = ({ coupleName, shortDescription, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCurrentSlide, setPopupCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Use images from props, fallback to empty array if not provided
  const sliderImages = images || [];

  // Create extended array for infinite loop (duplicate images at start and end)
  const extendedImages = [
    ...sliderImages.slice(-2), // Last 2 images at the beginning
    ...sliderImages,           // Original images
    ...sliderImages.slice(0, 2) // First 2 images at the end
  ];

  // Start at position 2 (after the duplicated images at start)
  const [internalSlide, setInternalSlide] = useState(2);

  const nextSlide = () => {
    setInternalSlide((prev) => {
      const next = prev + 1;
      if (next >= extendedImages.length - 2) {
        // If reaching the end duplicates, jump back to start (disable transition)
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setInternalSlide(2);
            setCurrentSlide(0);
            // Force reflow
            sliderRef.current.offsetHeight;
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = '';
              }
            }, 50);
          }
        }, 300); // Wait for transition to complete
        return next;
      }
      const newCurrentSlide = (currentSlide + 1) % sliderImages.length;
      setCurrentSlide(newCurrentSlide);
      return next;
    });
  };

  const prevSlide = () => {
    setInternalSlide((prev) => {
      const next = prev - 1;
      if (next < 0) {
        // If reaching the start duplicates, jump to end (disable transition)
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setInternalSlide(extendedImages.length - 4);
            setCurrentSlide(sliderImages.length - 1);
            // Force reflow
            sliderRef.current.offsetHeight;
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = '';
              }
            }, 50);
          }
        }, 300); // Wait for transition to complete
        return next;
      }
      const newCurrentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
      setCurrentSlide(newCurrentSlide);
      return next;
    });
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
      const slideItems = sliderRef.current.children;

      // Calculate the total width of all slides up to internal slide position
      // This ensures sliding is based on actual image widths, not fixed amounts
      let totalWidth = 0;
      for (let i = 0; i < internalSlide && i < slideItems.length; i++) {
        // Ensure the element has loaded and has a width
        if (slideItems[i] && slideItems[i].offsetWidth > 0) {
          totalWidth += slideItems[i].offsetWidth;
        }
      }

      // Move slider to show current slide at the start position
      sliderRef.current.style.transform = `translateX(-${totalWidth}px)`;
    }
  }, [internalSlide]);

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
            {extendedImages.map((img, index) => {
              // Calculate the original index for popup functionality
              let originalIndex;
              if (index < 2) {
                // First 2 are duplicates of last 2
                originalIndex = sliderImages.length - 2 + index;
              } else if (index < 2 + sliderImages.length) {
                // Middle images are original
                originalIndex = index - 2;
              } else {
                // Last 2 are duplicates of first 2
                originalIndex = index - 2 - sliderImages.length;
              }

              return (
                <div key={`slider-${index}`} className='slider-left-slider-item'>
                  <img
                    src={img.imageUrl}
                    alt={img.altText || `Slider ${originalIndex + 1}`}
                    loading="lazy"
                    onClick={() => openPopup(originalIndex)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="slider-left-content">
        <h2>{coupleName || 'Couple Name'}</h2>
        <p>
          {shortDescription || 'Description not available'}
        </p>
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
                src={sliderImages[popupCurrentSlide]?.imageUrl}
                alt={sliderImages[popupCurrentSlide]?.altText || `Popup Slider ${popupCurrentSlide + 1}`}
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

export default Sliders_Left;