import React, { useState, useEffect } from "react";
import "./HeroBanner.scss";
import logo from "../../assets/logo.png";
import hero1 from "../../assets/hero/1.jpg";
import hero2 from "../../assets/hero/2.jpg";
import hero3 from "../../assets/hero/3.jpg";
import hero4 from "../../assets/hero/4.jpg";
import hero5 from "../../assets/hero/5.jpg";
import leftArrow from "../../assets/hero/left-arrow.svg";
import rightArrow from "../../assets/hero/right-arrow.svg";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNavLink, setActiveNavLink] = useState("home");
  const slides = [hero1, hero2, hero3, hero4, hero5];
  const totalSlides = slides.length;

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About Us", href: "#about" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "contact", label: "Contact Us", href: "#contact" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNavClick = (e, navId) => {
    e.preventDefault();
    setActiveNavLink(navId);
  };

  return (
    <div className="hero-banner">
      {/* Navigation Bar */}
      <nav className="hero-nav">
        <div className="logo-container">
          <img
            src={logo}
            alt="Shade & Light Photo Studio"
            className="logo-img"
          />
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${
                activeNavLink === item.id ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Slides Container */}
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
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
            <span className="current-slide">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <button className="next-btn" onClick={nextSlide}>
              <img src={rightArrow} alt="Next" className="arrow-svg" />
            </button>
            <span className="total-slides">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
