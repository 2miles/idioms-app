import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import HamburgerIcon from '@/images/hamburger.svg?react';
import LoginButton from '@/components/NavBar/LoginButton';
import { useUser } from '@/context/userContext';
import PageContainer from '../PageContainer';
import AvatarDropdown from '../Dropdown/AvatarDropdown';

const NavContainer = styled(PageContainer)`
  margin-bottom: 0;
`;

const NavBackground = styled.div`
  background-color: var(--bg-nav);
`;

const NavBarWrapper = styled.nav`
  background-color: var(--bg-nav);
  padding-top: 0px;
  padding-bottom: 0px;
  width: 100%;
  z-index: 1000;
  height: 68px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .navbar-brand a {
    text-decoration: none;
    font-size: var(--font-xxl);
    color: var(--color-brand-primary);
    font-family: var(--font-brand);
    font-weight: 800;
    letter-spacing: 0.5px;
  }
`;

type NavbarLinksProps = {
  $isOpen: boolean;
};

const NavbarLinks = styled.div<NavbarLinksProps>`
  display: flex;
  gap: var(--space-xxl);
  padding-left: var(--padding-lg);
  font-size: 1.2rem;

  @media (max-width: 770px) {
    border-top: 1px solid var(--color-border);
    position: fixed;
    top: 68px;
    left: 0;
    right: 0;
    background-color: var(--bg-nav);
    flex-direction: column;
    width: 100%;
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    gap: 0;
    z-index: 999;

    a {
      text-align: center;
      font-size: 1.2rem;
      padding: 1rem;
      border-bottom: 1px solid var(--color-border);
      width: 100%;
    }
  }
`;

const Hamburger = styled.button`
  display: none;
  cursor: pointer;
  margin-right: var(--space-xxl);
  background: none;
  border: none;

  svg {
    width: 48px;
    height: 48px;
    color: var(--color-text-primary);
  }

  @media (max-width: 770px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--margin-sm);
  }

  ${process.env.NODE_ENV === 'test' &&
  `
    display: flex !important;
  `}
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarLogin = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

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
    <NavBackground>
      <NavContainer>
        <NavBarWrapper ref={navRef} className='navbar navbar-expand-lg'>
          <NavLeft>
            <Hamburger
              onClick={toggleMenu}
              aria-label='Toggle navigation'
              data-testid='navbar-hamburger'
            >
              <HamburgerIcon />
            </Hamburger>

            <div className='navbar-brand'>
              <Link to='/' onClick={closeMenu}>
                IdiomVault
              </Link>
            </div>

            <NavbarLinks className={`navbar-collapse ${isOpen ? 'open' : ''}`} $isOpen={isOpen}>
              <Link to='/' onClick={closeMenu} className='nav-link'>
                List
              </Link>
              <Link to='/about' onClick={closeMenu} className='nav-link'>
                About
              </Link>
              <Link to='/' onClick={closeMenu} className='nav-link'>
                Request
              </Link>
            </NavbarLinks>
          </NavLeft>

          <NavbarLogin>
            {isAuthenticated ? (
              <AvatarDropdown />
            ) : (
              <LoginButton onClick={() => loginWithRedirect()}>Log In</LoginButton>
            )}
          </NavbarLogin>
        </NavBarWrapper>
      </NavContainer>
    </NavBackground>
  );
};

export default NavBar;
