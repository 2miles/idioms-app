import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarWrapper = styled.nav`
  background-color: var(--color-canvas-inverted);
  color: var(--color-text-inverted);
  padding: 1rem;
  width: 100%;
  z-index: 1000;

  .navbar-brand a {
    text-decoration: none;
    font-size: 32px;
    color: var(--color-brand-primary);
    padding-right: 40px;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: var(--color-text-inverted);
    text-decoration: none;
    font-size: 1.25rem;
  }

  @media (max-width: 770px) {
    position: absolute;
    top: 60px;
    right: 0;
    background-color: var(--color-canvas-inverted);
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.3rem;
  cursor: pointer;
  margin-right: 2rem;

  .bar {
    width: 25px;
    height: 3px;
    background-color: var(--color-text-inverted);
  }

  @media (max-width: 770px) {
    display: flex;
  }
`;

const NavbarLogin = styled.div`
  margin-left: auto;

  button {
    color: var(--color-white);
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
  }
`;

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
    <NavBarWrapper ref={navRef} className="navbar navbar-expand-lg">
      <div className="d-flex align-items-center">
        <Hamburger onClick={toggleMenu} className="navbar-toggler">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </Hamburger>
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>
            IdiomVault
          </Link>
        </div>
        <NavbarLinks
          className={`navbar-collapse ${isOpen ? 'open' : ''}`}
          isOpen={isOpen}
        >
          <Link to="/" onClick={closeMenu} className="nav-link">
            Home
          </Link>
          <Link to="/about" onClick={closeMenu} className="nav-link">
            About
          </Link>
          <Link to="/list" onClick={closeMenu} className="nav-link">
            List
          </Link>
        </NavbarLinks>
      </div>
      <NavbarLogin className="ml-auto">
        <button className="btn btn-secondary">Login</button>
      </NavbarLogin>
    </NavBarWrapper>
  );
};

export default NavBar;
