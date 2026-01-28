import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeroBanners } from "../../store/slices/heroBannerSlice";
import "./HeroBanner.scss";
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";

const HeroBanner = () => {
  // console.log('HeroBanner component is rendering');
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector((state) => state.heroBanner);


  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hasFetched, setHasFetched] = useState(false);

  const slides = banners.map((banner) => banner.imageUrl);
  const totalSlides = slides.length;

  // Fetch hero banners on component mount (only once)
  useEffect(() => {
    console.log('useEffect running with:', { hasFetched, loading });
    if (!hasFetched && !loading) {
      console.log('About to dispatch fetchHeroBanners');
      setHasFetched(true);
      dispatch(fetchHeroBanners());
    }
  }, [hasFetched, loading, dispatch]); // dispatch is stable from useDispatch

  // Preload all images and track which ones are loaded
  useEffect(() => {
    if (slides.length > 0) {
      slides.forEach((slideUrl, index) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]));
        };
        img.onerror = () => {
          // Still mark as loaded to avoid infinite blur
          setLoadedImages((prev) => new Set([...prev, index]));
        };
        img.src = slideUrl;
      });
    }
  }, [slides]);

  // Start slideshow immediately when slides are available
  useEffect(() => {
    if (totalSlides > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="hero-banner">
        <div className="slides-container">
          <div className="slide loading">
            <div className="loading-spinner">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="hero-banner">
        <div className="slides-container">
          <div className="slide error">
            <div className="error-message">Failed to load banners: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no slides
  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className="hero-banner">
      {/* Slides Container */}
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={banners[index].id}
            className={`slide ${index === currentSlide ? "active" : ""} ${
              loadedImages.has(index) ? "loaded" : "blurred"
            }`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button className="prev-btn" onClick={prevSlide}>
          <img src={leftArrow} alt="Previous" className="arrow-svg" />
        </button>
        <div className="pagination-info">
          <div className="pagination-bottom">
            {/*<span className="current-slide">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>*/}
            <button className="next-btn" onClick={nextSlide}>
              <img src={rightArrow} alt="Next" className="arrow-svg" />
            </button>
            {/*<span className="total-slides">
              {String(totalSlides).padStart(2, "0")}
            </span>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
