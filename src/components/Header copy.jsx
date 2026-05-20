import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import TacoButton from './TacoButton';
import { createPortal } from "react-dom";
import { useRef } from "react";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false); // State for dropdown

  const toggleMenu = () => setIsOpen(!isOpen);
const moreRef = useRef(null);
  return (
    <header className="nav-header">
      {/* 1. Mobile Hamburger (Hidden on Desktop) */}
      <div className="nav-column mobile-only">
        <button className="nav-hamburger" onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="nav-bar"></span>
          <span className="nav-bar"></span>
          <span className="nav-bar"></span>
        </button>
      </div>

      {/* 2. Left/Center Logo */}
      <div className="nav-column logo-container">
        <Link to={"/"}>
          <img src="/logo.png" alt="Taco Pros" className="nav-logo" />
        </Link>
      </div>

      {/* 3. Desktop Navigation (Hidden on Mobile) */}
      <nav className="desktop-nav">
        <Link to="/" className="desktop-link">HOME</Link>
        <Link to="/our-story" className="desktop-link">OUR STORY</Link>
        <Link to="/menu" className="desktop-link">OUR MENU</Link>
        <Link to="/catering" className="desktop-link">CATERING MENU</Link>
        <Link to="/rewards" className="desktop-link">REWARDS</Link>

        {/* Dropdown "More" */}
        <div
          className="dropdown"
          onMouseEnter={() => setIsMoreOpen(true)}
          onMouseLeave={() => setIsMoreOpen(false)}
        >
          <span className="desktop-link">MORE ▾</span>


          {isMoreOpen && (

            createPortal(
          
                <div className="dropdown-content">
                  <Link to="/hiring">HIRING</Link>
                  <Link to="/franchising">FRANCHISING</Link>
                  <Link to="/locations">LOCATIONS</Link>
                  <Link to="/contact">CONTACT</Link>
                  <Link to="/news">NEWS</Link>
                </div>,document.body
            
            )

          )}
        </div>
      </nav>

      {/* 4. Right CTA Button */}
      <div className="nav-column right">


        <TacoButton text="ORDER online"
          width={window.innerWidth < 768 ? "107px" : "191px"}
          height={window.innerWidth < 768 ? "51px" : "57px"}
          fontSize={window.innerWidth < 768 ? "16px" : "24px"}
          styleType="1"
        />


      </div>

      {/* Side Drawer (Mobile Only) */}
      <div className={`nav-overlay ${isOpen ? 'nav-active' : ''}`} onClick={toggleMenu}></div>
      <aside className={`nav-drawer ${isOpen ? 'nav-open' : ''}`}>
        <button className="nav-close" onClick={toggleMenu}>&times;</button>
        <nav className="nav-menu">
          <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>

          <Link to="/our-story" className="nav-link" onClick={toggleMenu}>Our Story</Link>

          <Link to="/menu" className="nav-link" onClick={toggleMenu}>Menu</Link>

          <Link to="/catering" className="nav-link" onClick={toggleMenu}>Catering</Link>

           <Link to="/rewards" className="nav-link">REWARDS</Link>

          <Link to="/hiring" className="nav-link" onClick={toggleMenu}>Hiring</Link>

          <Link to="/franchising" className="nav-link" onClick={toggleMenu}>Franchising</Link>

          <Link to="/locations" className="nav-link" onClick={toggleMenu}>Locations</Link>

          <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
          
          <Link to="/news" className="nav-link">News</Link>
         
        </nav>
      </aside>
    </header>
  );
};

export default Header;