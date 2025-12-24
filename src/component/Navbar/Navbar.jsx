import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/logo.png";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About Us", path: "/about" },
  { id: "gallery", label: "Gallery", path: "/gallery" },
  { id: "contact", label: "Contact Us", path: "/contact" },
];
const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  // Derive active nav link from current route
  const activeNavLink = useMemo(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      return activeItem.id;
    } else if (currentPath === "/") {
      return "home";
    }
    return "home"; // fallback
  }, [location.pathname]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isHomePage ? "navbar-overlay" : ""}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img
              src={logo}
              alt="Shade & Light Photo Studio"
              className="logo-img"
            />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-link ${
                activeNavLink === item.id ? "active" : ""
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-link mobile-nav-link ${
                  activeNavLink === item.id ? "active" : ""
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

