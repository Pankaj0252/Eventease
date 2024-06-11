import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/logo-footer.jpeg";
import "../style.css";

const Navbar = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav>
        <div className="container">
          <a className="navbar-brand text-white " href="index.html">
            <img src={logo} alt="" style={{ height: "6rem", width: "10rem" }} />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
              <li className="nav-item">
                <a className="nav-link click-scroll" href="#section_1">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
