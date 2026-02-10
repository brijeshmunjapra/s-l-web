import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../../store/slices/reviewsSlice";
import "./Sixth.scss";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";

const Sixth = React.memo(() => {
  const dispatch = useDispatch();
  const { data: reviewsData, loading, error } = useSelector((state) => state.reviews);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  // Transform API data to match component format
  const reviews = reviewsData?.success
    ? reviewsData.data.reviews
        .filter(review => review.active) // Only show active reviews
        .map(review => ({
          id: review.id,
          text: review.reviewContent, // Map reviewContent to text
          author: review.clientName, // Map clientName to author
        }))
    : [];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const currentElement = sectionRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && bgRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calculate when the sixth section is in view
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Show background when section is in viewport
        if (scrollY >= sectionTop - windowHeight && scrollY <= sectionBottom) {
          bgRef.current.style.opacity = '1';
          bgRef.current.style.visibility = 'visible';
        } else {
          bgRef.current.style.opacity = '0';
          bgRef.current.style.visibility = 'hidden';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Set up new interval only if visible and not paused
    if (isVisible && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex === reviews.length - 1 ? 0 : prevIndex + 1;
          return nextIndex;
        });
      }, 4000); // Auto-advance every 4 seconds
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, isPaused, reviews.length]);

  // Fetch reviews on component mount
  useEffect(() => {
    if (!reviewsData) {
      dispatch(fetchReviews());
    }
  }, [dispatch, reviewsData]);

  // Reset currentIndex if it exceeds available reviews
  useEffect(() => {
    if (currentIndex >= reviews.length && reviews.length > 0) {
      setCurrentIndex(0);
    }
  }, [reviews.length, currentIndex]);

  return (
    <>
      <div
        ref={bgRef}
        className="sixth-bg-fixed"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="sixth-bg-video"
        >
          <source src="https://event-pdf-crm.s3.ap-south-1.amazonaws.com/wesite-images/V%26V+INSTA+STORY+2.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        ref={sectionRef}
        className="sixth-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      <div className="review-content">
        {loading ? (
          <div className="loading-state">
            <p className="review-text">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p className="review-text">Unable to load reviews at this time.</p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            <p className="review-text" key={`text-${currentIndex}`}>
              {reviews[currentIndex].text}
            </p>
            <p className="review-author" key={`author-${currentIndex}`}>
              - {reviews[currentIndex].author}
            </p>
          </>
        ) : (
          <div className="no-reviews-state">
            <p className="review-text">No reviews available.</p>
          </div>
        )}
      </div>

      {reviews.length > 1 && (
        <div className="carousel-arrow-container">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={handlePrevious}
          >
            <img src={leftArrow} alt="Previous" />
          </button>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={handleNext}
          >
            <img src={rightArrow} alt="Next" />
          </button>
        </div>
      )}
    </div>
    </>
  );
});

export default Sixth;
