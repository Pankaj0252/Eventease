import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/logo-footer.jpeg";
import "../style.css";
const Navbar = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <nav
        class={`navbar navbar-expand-lg mt-0 ${
          offset < 90 ? "fixed-top" : "bg-dark fixed-top"
        }`}
      >
        <div class="container">
          <a class="navbar-brand text-white " href="index.html">
            {/* Lord Butwal */}
            <img src={logo} alt="" style={{ height: "6rem", width: "10rem" }} />
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
              <li class="nav-item">
                <a class="nav-link click-scroll" href="#section_1">
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
