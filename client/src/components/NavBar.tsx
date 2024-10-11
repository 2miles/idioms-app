import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarWrapper = styled.nav`
  background-color: var(--color-canvas-inverted);
  color: var(--color-text-inverted);
  padding: var(--padding-md);
  width: 100%;
  z-index: 1000;

  .navbar-brand a {
    text-decoration: none;
    font-size: var(--font-xxl);
    color: var(--color-brand-primary);
    padding-right: var(--padding-xxl);
  }
`;

type NavbarLinksProps = {
  $isOpen: boolean;
};

const NavbarLinks = styled.div<NavbarLinksProps>`
  display: flex;
  gap: var(--space-xxl);

  a {
    color: var(--color-text-inverted);
    text-decoration: none;
    font-size: var(--font-lg);
  }

  @media (max-width: 770px) {
    position: absolute;
    top: 80px;
    right: 0;
    background-color: var(--color-canvas-inverted);
    flex-direction: column;
    width: 100%;
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  margin-right: var(--space-xxl);

  .bar {
    width: 32px;
    height: 4px;
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
    padding: var(--padding-sm) var(--padding-md);
    cursor: pointer;
    border-radius: var(--radius-sm);
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
    <NavBarWrapper ref={navRef} className='navbar navbar-expand-lg'>
      <div className='d-flex align-items-center'>
        <Hamburger onClick={toggleMenu} className='navbar-toggler'>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </Hamburger>
        <div className='navbar-brand'>
          <Link to='/' onClick={closeMenu}>
            IdiomVault
          </Link>
        </div>
        <NavbarLinks className={`navbar-collapse ${isOpen ? 'open' : ''}`} $isOpen={isOpen}>
          <Link to='/' onClick={closeMenu} className='nav-link'>
            Home
          </Link>
          <Link to='/about' onClick={closeMenu} className='nav-link'>
            About
          </Link>
          <Link to='/list' onClick={closeMenu} className='nav-link'>
            List
          </Link>
        </NavbarLinks>
      </div>
      <NavbarLogin>
        <button className='btn btn-secondary'>Login</button>
      </NavbarLogin>
    </NavBarWrapper>
  );
};

export default NavBar;
