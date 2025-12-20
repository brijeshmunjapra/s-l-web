import React, { useState, useEffect, useRef } from "react";
import "./Fifth.scss";
import image1 from "../../../assets/fifth-section/1.webp";
import image2 from "../../../assets/fifth-section/2.webp";
import image3 from "../../../assets/fifth-section/3.webp";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";

const Fifth = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation functions for mobile
  const nextBlog = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevBlog = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };
  // const timeoutRef = useRef(null);
  // const indexRef = useRef(0);
  // const lastUpdateTimeRef = useRef(performance.now());

  // useEffect(() => {
  //   const ROTATION_INTERVAL = 3000; // Exactly 3000ms between each change

  //   const scheduleNext = () => {
  //     const now = performance.now();
  //     const elapsed = now - lastUpdateTimeRef.current;
      
  //     // Calculate how long to wait to maintain exactly 3 seconds between updates
  //     const remainingTime = ROTATION_INTERVAL - elapsed;
  //     const waitTime = Math.max(0, remainingTime);

  //     timeoutRef.current = setTimeout(() => {
  //       const updateTime = performance.now();
  //       indexRef.current = (indexRef.current + 1) % 3;
  //       setCurrentIndex(indexRef.current);
  //       lastUpdateTimeRef.current = updateTime;
  //       scheduleNext();
  //     }, waitTime);
  //   };

  //   // Initialize
  //   lastUpdateTimeRef.current = performance.now();
  //   scheduleNext();

  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //       timeoutRef.current = null;
  //     }
  //   };
  // }, []); // Empty dependency array ensures this runs only once

  const blogs = [
    {
      image: image1,
      alt: "Brijesh & Radhika",
      caption: "Brijesh & Radhika",
      id: 0,
    },
    {
      image: image2,
      alt: "Parth & Meghal",
      caption: "Parth & Meghal",
      id: 1,
    },
    {
      image: image3,
      alt: "Sagar & Jenny",
      caption: "Sagar & Jenny",
      id: 2,
    },
  ];

  // Calculate which position each blog should be in based on currentIndex
  // On mobile, just show current image, on desktop use carousel
  const getBlogPosition = (blogId) => {
    if (isMobile) {
      return blogId === currentIndex ? 1 : 0; // 1 = visible, 0 = hidden
    }
    // Desktop carousel logic
    // blog0 starts at position 0, blog1 at 1, blog2 at 2
    // When currentIndex = 0: blog0→0, blog1→1, blog2→2
    // When currentIndex = 1: blog0→1, blog1→2, blog2→0 (rotated right once)
    // When currentIndex = 2: blog0→2, blog1→0, blog2→1 (rotated right twice)
    return (blogId + currentIndex) % 3;
  };

  return (
    <div className="fifth-section">
      <div className="fifth-section-content">
        <div className="text-container">
          <h1 className="main-heading section-heading">Stories & Sparks</h1>
          <h2 className="sub-heading">Our latest Blogs</h2>
        </div>
        <div
          className={`blogs-container ${isMobile ? 'blogs-container-mobile' : ''}`}
          data-current-index={currentIndex}
        >
          {blogs.map((blog) => {
            const targetPosition = getBlogPosition(blog.id);

            if (isMobile) {
              // On mobile, only show the current blog
              if (targetPosition !== 1) return null;

              return (
                <div
                  key={blog.id}
                  className="blog-item blog-item-mobile"
                  data-blog-id={blog.id}
                  data-position={targetPosition}
                  data-slide-direction={slideDirection}
                >
                  <div className="blog-image-container">
                    <img
                      src={blog.image}
                      alt={blog.alt}
                      className="blog-image blog-image-mobile"
                    />
                    <p className="blog-caption blog-caption-mobile">{blog.caption}</p>
                  </div>
                </div>
              );
            }

            // Desktop carousel logic
            const currentFlexPos = blog.id; // 0, 1, or 2
            const slotOffset = targetPosition - currentFlexPos;
            const translateX = slotOffset * 100; // Move by 100% of item width per slot
            const isCenterPosition = targetPosition === 1;

            return (
              <div
                key={blog.id}
                className={`blog-item blog-item-position-${targetPosition}`}
                data-blog-id={blog.id}
                data-position={targetPosition}
                style={{
                  transform: `translateX(${translateX}%)`,
                }}
              >
                <div className="blog-image-container">
                  <img
                    src={blog.image}
                    alt={blog.alt}
                    className={`blog-image ${isCenterPosition ? "blog-image-middle" : ""}`}
                  />
                  <p className="blog-caption">{blog.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
        {isMobile && (
          <div className="mobile-navigation">
            <button
              className="nav-btn nav-btn-prev"
              onClick={prevBlog}
              aria-label="Previous blog"
            >
              <img src={leftArrow} alt="Previous" className="arrow-svg" />
            </button>
            <div className="mobile-indicators">
              {blogs.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    if (index > currentIndex) {
                      setSlideDirection('right');
                    } else if (index < currentIndex) {
                      setSlideDirection('left');
                    }
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
            <button
              className="nav-btn nav-btn-next"
              onClick={nextBlog}
              aria-label="Next blog"
            >
              <img src={rightArrow} alt="Next" className="arrow-svg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fifth;
