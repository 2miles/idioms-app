import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-left">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            IdiomVault
          </Link>
        </div>
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
          <Link to="/list" onClick={closeMenu}>
            List
          </Link>
        </div>
      </div>
      <div className="navbar-login">
        <button className="btn btn-secondary">Login</button>
      </div>
    </nav>
  );
};

export default NavBar;
