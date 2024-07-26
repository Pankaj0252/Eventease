import React from "react";
import footerlogo from "../assets/logo-footer.jpeg";
import instalogo from "../assets/insta.jpeg";
import fablogo from "../assets/fablogo.jpeg";
import locationImg from "../assets/location_img.png";
import emaillogo from "../assets/emaillogo.jpg";
import phoneLogo from "../assets/phoneLogo.png";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="/">
                    <img src={footerlogo} className="img-fluid" alt="logo" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-social-icon">
                <span>Follow us</span>
                <a href="https://instagram.com">
                  <img src={instalogo} alt="Instagram" className="icon-image" />
                </a>
                <a href="https://facebook.com">
                  <img src={fablogo} alt="Facebook" className="icon-image" />
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="feedback-section">
                <h3 className="text-white">Please Submit Your Feedback</h3>
                <Link to="/feedback" className="card-link text-decoration-none mt-2 text-center">
                  <span className="fs-4">Click Here</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta d-flex align-items-center">
                <img src={locationImg} alt="Location" className="icon-image" />
                <div className="cta-text ms-3">
                  <h4>Find us</h4>
                  <span>105 Onward Avenue, Kitchener, Canada</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta d-flex align-items-center">
                <img src={phoneLogo} alt="Phone" className="icon-image" />
                <div className="cta-text ms-3">
                  <h4>Call us</h4>
                  <span>548-333-2572</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta d-flex align-items-center">
                <img src={emaillogo} alt="Email" className="icon-image" />
                <div className="cta-text ms-3">
                  <h4>Mail us</h4>
                  <span>EventEase@Events.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>
                  Copyright &copy; {year}, All Rights Reserved
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
              <div className="footer-menu">
                <ul>
                  {/* Add any footer menu items here if needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
