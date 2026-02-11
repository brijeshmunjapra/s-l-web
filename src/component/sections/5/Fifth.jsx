import React, { useState, useEffect, useMemo } from "react";
import "./Fifth.scss";
import image1 from "../../../assets/fifth-section/1.webp";
import image2 from "../../../assets/fifth-section/2.webp";
import image3 from "../../../assets/fifth-section/3.webp";
// import leftArrow from "../../../assets/left-arrow.svg";
// import rightArrow from "../../../assets/right-arrow.svg";

const Fifth = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isMobile, setIsMobile] = useState(false);



  // Navigation functions for mobile


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
          <h2 className="sub-heading ">we're excited to photograph your family, maternity moments,or special milestones.
            please leave a message below,
            and we’ll be in touch soon</h2>
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
                <p className="blog-caption sub-heading">{blog.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Fifth;
