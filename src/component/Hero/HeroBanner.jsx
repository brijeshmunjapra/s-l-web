import React, { useState, useEffect } from "react";
import "./HeroBanner.scss";
import logo from "../../assets/logo.png";
import leftArrow from "../../assets/hero/left-arrow.svg";
import rightArrow from "../../assets/hero/right-arrow.svg";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNavLink, setActiveNavLink] = useState("home");
  const [loadedImages, setLoadedImages] = useState(new Set());

  const BASE_URL =
    "https://event-pdf-crm.s3.ap-south-1.amazonaws.com/wesite-images/";
  const bannerImages = [
    "banner-1.jpg",
    "banner-2.jpg",
    "banner-3.jpg",
    "banner-4.jpg",
    "banner-5.jpg",
  ];
  const slides = bannerImages.map((image) => `${BASE_URL}${image}`);
  const totalSlides = slides.length;

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About Us", href: "#about" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "contact", label: "Contact Us", href: "#contact" },
  ];

  // Preload all images and track which ones are loaded
  useEffect(() => {
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
  }, [slides]);

  // Start slideshow immediately
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
