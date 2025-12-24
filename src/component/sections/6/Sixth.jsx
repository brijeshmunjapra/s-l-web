import React, { useState, useEffect, useRef } from "react";
import "./Sixth.scss";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";
import Video from "../../../../src/assets/sixth-section/backroudVideo.mp4"

const Sixth = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  
  const reviews = [
    {
      id: 0,
      text: "Ethan's Urban Session Is Probably The Most Fun I've Ever Had While Someone Was Taking Pictures Of Me. If You're Looking To Get Amazing Pictures While Going For A Fun Walk - I Definitely Recommend This Guy!",
      author: "John Deo",
    },
    {
      id: 1,
      text: "Absolutely incredible experience! The photos turned out better than I could have imagined. The photographer made us feel so comfortable and captured our genuine moments perfectly.",
      author: "Sarah Johnson",
    },
    {
      id: 2,
      text: "Professional, creative, and so much fun to work with! Every shot was a masterpiece. Highly recommend for anyone looking for stunning photography with a personal touch.",
      author: "Michael Chen",
    },
    {
      id: 3,
      text: "The best photography session we've ever had! The attention to detail and ability to capture emotions is unmatched. We're thrilled with every single photo.",
      author: "Emily Rodriguez",
    },
  ];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
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
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <div
        ref={sectionRef}
        className="sixth-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      <div className="review-content">
        <p className="review-text" key={`text-${currentIndex}`}>
          {reviews[currentIndex].text}
        </p>
        <p className="review-author" key={`author-${currentIndex}`}>
          - {reviews[currentIndex].author}
        </p>
      </div>

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
    </div>
    </>
  );
});

export default Sixth;
