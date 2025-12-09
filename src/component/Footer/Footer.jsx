import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../../assets/logo.png";
import fbIcon from "../../assets/footer/fb.svg";
import xIcon from "../../assets/footer/x.svg";
import ytIcon from "../../assets/footer/yt.svg";
import igIcon from "../../assets/footer/ig.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Shade & Light Photo Studio" />
          </Link>
        </div>

        <nav className="footer-nav">
          <Link to="/" className="nav-link">
            HOME
          </Link>
          <Link to="/about" className="nav-link">
            ABOUT
          </Link>
          <Link to="/services" className="nav-link">
            SERVICES
          </Link>
          <Link to="/portfolio" className="nav-link">
            PORTFOLIO
          </Link>
          <Link to="/blog" className="nav-link">
            BLOG
          </Link>
          <Link to="/contact" className="nav-link">
            CONTACT
          </Link>
        </nav>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <img src={fbIcon} alt="Facebook" />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <img src={xIcon} alt="Twitter" />
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <img src={ytIcon} alt="YouTube" />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <img src={igIcon} alt="Instagram" />
            </a>
          </div>

          <div className="footer-copyright">
            Copyright 2024 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
