import React from "react";
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
          <img src={logo} alt="Shade & Light Photo Studio" />
        </div>

        <nav className="footer-nav">
          <a href="#home" className="nav-link">
            HOME
          </a>
          <a href="#about" className="nav-link">
            ABOUT
          </a>
          <a href="#services" className="nav-link">
            SERVICES
          </a>
          <a href="#portfolio" className="nav-link">
            PORTFOLIO
          </a>
          <a href="#blog" className="nav-link">
            BLOG
          </a>
          <a href="#contact" className="nav-link">
            CONTACT
          </a>
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
