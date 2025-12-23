import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Fifth.scss";
import image1 from "../../../assets/fifth-section/1.webp";
import image2 from "../../../assets/fifth-section/2.webp";
import image3 from "../../../assets/fifth-section/3.webp";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";

const Fifth = React.memo(() => {
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

  const blogs = useMemo(() => [
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
  ], []);

  // Memoize blog positions and transforms to prevent recalculation on every render
  const blogTransforms = useMemo(() => {
    return blogs.map((blog) => {
      // Calculate which position each blog should be in based on currentIndex
      // Pattern: 1→2, 2→3, 3→1 (rotating right)
      const targetPosition = (blog.id + currentIndex) % 3;

      // Calculate transform to slide from natural flex position to target
      const currentFlexPos = blog.id; // 0, 1, or 2
      const slotOffset = targetPosition - currentFlexPos;
      const translateX = slotOffset * 100; // Move by 100% of item width per slot
      const isCenterPosition = targetPosition === 1;

      return {
        blog,
        targetPosition,
        translateX,
        isCenterPosition,
      };
    });
  }, [blogs, currentIndex]);

  return (
    <div className="fifth-section">
      <div className="fifth-section-content">
        <div className="text-container">
          <h1 className="main-heading">Stories & Sparks</h1>
          <h2 className="sub-heading">WE'RE EXCITED TO PHOTOGRAPH YOUR FAMILY, MATERNITY MOMENTS,OR SPECIAL MILESTONES.
            PLEASE LEAVE A MESSAGE BELOW,
            AND WE’LL BE IN TOUCH SOON.</h2>
        </div>
        <div
          className="blogs-container"
          data-current-index={currentIndex}
        >
          {blogTransforms.map(({ blog, targetPosition, translateX, isCenterPosition }) => (
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
                  loading="lazy"
                />
                <p className="blog-caption">{blog.caption}</p>
              </div>
            </div>
          ))}
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
});

export default Fifth;
