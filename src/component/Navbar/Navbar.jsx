import React, { useState, useEffect } from "react";
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
  const [activeNavLink, setActiveNavLink] = useState("home");
  const isHomePage = location.pathname === "/";

  // Update active nav link based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveNavLink(activeItem.id);
    } else if (currentPath === "/") {
      setActiveNavLink("home");
    }
  }, [location.pathname]);

  const handleNavClick = (navId) => {
    setActiveNavLink(navId);
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
        <div className="nav-links">
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
      </div>
    </nav>
  );
};

export default Navbar;

