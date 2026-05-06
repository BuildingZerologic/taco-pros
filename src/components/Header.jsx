import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import TacoButton from './TacoButton';
import { createPortal } from "react-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const moreRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  /* ✅ CLICK TO TOGGLE DROPDOWN */
  const handleToggleDropdown = (e) => {
    e.stopPropagation();

    if (!moreRef.current) return;

    const rect = moreRef.current.getBoundingClientRect();

    setDropdownPos({
      top: rect.bottom,
      left: rect.right - 180
    });

    setIsMoreOpen(prev => !prev);
  };

 
  useEffect(() => {
    const handleScroll = () => {
      setIsMoreOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✅ CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target) &&
        !e.target.closest(".dropdown-content")
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="nav-header">

      {/* LEFT: HAMBURGER */}
      <div className="nav-column mobile-only">
        <button className="nav-hamburger" onClick={toggleMenu}>
          <span className="nav-bar"></span>
          <span className="nav-bar"></span>
          <span className="nav-bar"></span>
        </button>
      </div>

      {/* LOGO */}
      <div className="nav-column logo-container">
        <Link to="/">
          <img src="/logo.png" alt="Taco Pros" className="nav-logo" />
        </Link>
      </div>

      {/* DESKTOP NAV */}
      <nav className="desktop-nav">
        <Link to="/" className="desktop-link">HOME</Link>
        <Link to="/our-story" className="desktop-link">OUR STORY</Link>
        <Link to="/menu" className="desktop-link">OUR MENU</Link>
        <Link to="/catering" className="desktop-link">CATERING MENU</Link>
        <Link to="/rewards" className="desktop-link">REWARDS</Link>

        {/* ✅ CLICK DROPDOWN */}
        <div
          className="dropdown"
          ref={moreRef}
          onClick={handleToggleDropdown}
        >
          <span className="desktop-link">MORE ▾</span>
        </div>
      </nav>

      {/* RIGHT BUTTON */}
      <div className="nav-column right">
        <TacoButton
          text="ORDER ONLINE"
          link="https://tacopros.com/order-online"
          styleClass="order-button-responsive"
          styleType="1"
          width="clamp(120px, 14vw, 190px)"
          height="57px"
          fontSize="clamp(18px, 1.8vw, 24px)"
        />
      </div>

      {/* ✅ DROPDOWN (PORTAL + FIXED) */}
      {isMoreOpen &&
        createPortal(
          <div
            className="dropdown-content"
            style={{
              position: "fixed",
              top: dropdownPos.top,
              left: dropdownPos.left
            }}
          >
            <Link to="/hiring">HIRING</Link>
            <Link to="/franchising">FRANCHISING</Link>
            <Link to="/locations">LOCATIONS</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/news">NEWS</Link>
          </div>,
          document.body
        )}

      {/* OVERLAY */}
      <div
        className={`nav-overlay ${isOpen ? 'nav-active' : ''}`}
        onClick={toggleMenu}
      />

      {/* DRAWER */}
      <aside className={`nav-drawer ${isOpen ? 'nav-open' : ''}`}>
        <button className="nav-close" onClick={toggleMenu}>&times;</button>

        <nav className="nav-menu">
          <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/menu" className="nav-link" onClick={toggleMenu}>Menu</Link>
          <Link to="/catering" className="nav-link" onClick={toggleMenu}>Catering</Link>
          <Link to="/hiring" className="nav-link" onClick={toggleMenu}>Hiring</Link>
          <Link to="/franchising" className="nav-link" onClick={toggleMenu}>Franchising</Link>
          <Link to="/locations" className="nav-link" onClick={toggleMenu}>Locations</Link>
          <Link to="/our-story" className="nav-link" onClick={toggleMenu}>Our Story</Link>
          <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
          <Link to="/news" className="nav-link" onClick={toggleMenu}>News</Link>
          <Link to="/rewards" className="nav-link" onClick={toggleMenu}>REWARDS</Link>
        </nav>
      </aside>

    </header>
  );
};

export default Header;