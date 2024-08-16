import React, { useState, useEffect } from "react";
import logo from "../assets/logo-footer.jpeg";
// import "../style.css"; 
import "./navbar.css";
import { clearAccessToken, clearUserFromLocalstorage } from "../services/localstorage";

const Navbar = () => {
  const [offset, setOffset] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    clearAccessToken();
    clearUserFromLocalstorage();
    window.location.href = '/login';
  };

  const toggleNav = () => setIsNavOpen(prev => !prev);

  return (
    <nav className={`navbar ${offset > 50 ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
        <button className="navbar-toggler" onClick={toggleNav}>
          ☰
        </button>
        <div className={`navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">Events</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings">Settings</a>
            </li>
          </ul>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
