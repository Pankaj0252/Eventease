import React from "react";
import Navbar from "./Navbar";
import "../style.css";
const Hero = () => {
  return (
    <>
      <Navbar />
      <section class="hero-section" id="section_1">
        <div class="section-overlay"></div>

        <div class="container d-flex justify-content-center align-items-center">
          <div class="row">
            <div class="col-12 mt-auto mb-5 text-center">
              <small>Event Ease</small>

              <h1 class="text-white mb-5">2024</h1>

              <a class="btn custom-btn smoothscroll" href="">
                Let's begin
              </a>
            </div>

            <div class="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center"></div>
          </div>
        </div>

        <div class="video-wrap">
          <video autoPlay loop muted class="custom-video" poster="">
            <source src="video/pexels-2022395.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
};

export default Hero;
