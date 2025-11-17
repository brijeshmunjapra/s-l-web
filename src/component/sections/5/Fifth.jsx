import React, { useState, useEffect, useRef } from "react";
import "./Fifth.scss";
import image1 from "../../../assets/fifth-section/1.webp";
import image2 from "../../../assets/fifth-section/2.webp";
import image3 from "../../../assets/fifth-section/3.webp";

const Fifth = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);
  const lastUpdateTimeRef = useRef(performance.now());

  useEffect(() => {
    const ROTATION_INTERVAL = 3000; // Exactly 3000ms between each change

    const scheduleNext = () => {
      const now = performance.now();
      const elapsed = now - lastUpdateTimeRef.current;
      
      // Calculate how long to wait to maintain exactly 3 seconds between updates
      const remainingTime = ROTATION_INTERVAL - elapsed;
      const waitTime = Math.max(0, remainingTime);

      timeoutRef.current = setTimeout(() => {
        const updateTime = performance.now();
        indexRef.current = (indexRef.current + 1) % 3;
        setCurrentIndex(indexRef.current);
        lastUpdateTimeRef.current = updateTime;
        scheduleNext();
      }, waitTime);
    };

    // Initialize
    lastUpdateTimeRef.current = performance.now();
    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

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
  // Pattern: 1→2, 2→3, 3→1 (rotating right)
  const getBlogPosition = (blogId) => {
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
          <h1 className="main-heading">Stories & Sparks</h1>
          <h2 className="sub-heading">Our latest Blogs</h2>
        </div>
        <div 
          className="blogs-container"
          data-current-index={currentIndex}
        >
          {blogs.map((blog) => {
            const targetPosition = getBlogPosition(blog.id);
            // Calculate transform to slide from natural flex position to target
            // Natural positions: blog0→left(0), blog1→middle(1), blog2→right(2)
            // With space-between and flex: 1, items are evenly distributed
            // Each slot movement is approximately equal to the spacing between items
            const currentFlexPos = blog.id; // 0, 1, or 2
            const slotOffset = targetPosition - currentFlexPos;
            
            // Use transform for smooth sliding animation
            // translateX(%) moves relative to element width, but with flex: 1,
            // items have similar widths, so this approximates slot-to-slot movement
            // Adjust multiplier for smooth sliding (test and tune as needed)
            const translateX = slotOffset * 100; // Move by 100% of item width per slot
            
            // Center position (1) always gets the big size, regardless of which image
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
      </div>
    </div>
  );
};

export default Fifth;
