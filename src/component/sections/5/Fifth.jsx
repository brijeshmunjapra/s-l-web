import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Fifth.scss";
import { fetchBlogCouples } from "../../../store/slices/blogCouplesSlice";
// import leftArrow from "../../../assets/left-arrow.svg";
// import rightArrow from "../../../assets/right-arrow.svg";

const Fifth = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { couples, loading, error } = useSelector((state) => state.blogCouples);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogCouples());
  }, [dispatch]);



  // Navigation functions for mobile


  const blogs = useMemo(() => {
    if (!couples || couples.length === 0) return [];

    return couples.slice(0, 3).map((couple, index) => ({
      image: couple.images && couple.images.length > 0 ? couple.images[0].imageUrl : '',
      alt: couple.coupleName || `Couple ${index + 1}`,
      caption: couple.coupleName || `Couple ${index + 1}`,
      id: index,
      coupleId: couple.id,
    }));
  }, [couples]);

  // Handle blog item click
  const handleBlogClick = (coupleId) => {
    navigate(`/blog/${coupleId}`);
  };

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

  // Loading state
  if (loading) {
    return (
      <div className="fifth-section">
        <div className="fifth-section-content">
          <div className="text-container">
            <h1 className="main-heading">Stories & Sparks</h1>
            <h2 className="sub-heading">Loading stories...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fifth-section">
        <div className="fifth-section-content">
          <div className="text-container">
            <h1 className="main-heading">Stories & Sparks</h1>
            <h2 className="sub-heading">Unable to load stories at this time.</h2>
          </div>
        </div>
      </div>
    );
  }

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
                cursor: 'pointer',
              }}
              onClick={() => handleBlogClick(blog.coupleId)}
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
