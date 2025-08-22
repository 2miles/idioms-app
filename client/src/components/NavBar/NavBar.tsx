import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Avatar from '@/components/Avatar';
import HamburgerIcon from '@/images/hamburger.svg?react';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { useUser } from '@/context/userContext';
import PageContainer from '../PageContainer';

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
  padding-left: var(--padding-lg);
  gap: var(--space-xxl);

  a {
    color: var(--color-text-inverted);
    text-decoration: none;
    font-size: var(--font-lg);
  }

  @media (max-width: 770px) {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--bg-nav);
    flex-direction: column;
    width: 100%;
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    gap: 0;
    a {
      padding: 1rem;
      border-bottom: 1px solid var(--color-border);
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
    color: var(--color-text-inverted);
  }

  @media (max-width: 770px) {
    display: flex;
    align-items: center;
    justify-content: center;
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

const ProfileArea = styled.div`
  display: flex;
  button {
    margin-left: var(--margin-lg);
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { loginWithRedirect, logout, user } = useAuth0();
  const { isAuthenticated } = useUser();

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
    <NavBackground>
      <NavContainer>
        <NavBarWrapper ref={navRef} className='navbar navbar-expand-lg'>
          <NavLeft>
            {/* <Hamburger
        onClick={toggleMenu}
        aria-label='Toggle navigation'
        data-testid='navbar-hamburger'
      >
        <HamburgerIcon />
      </Hamburger> */}

            <div className='navbar-brand'>
              <Link to='/' onClick={closeMenu}>
                IdiomVault
              </Link>
            </div>

            {/* <NavbarLinks className={`navbar-collapse ${isOpen ? 'open' : ''}`} $isOpen={isOpen}>
        <Link to='/' onClick={closeMenu} className='nav-link'>
          Home
        </Link>
        <Link to='/about' onClick={closeMenu} className='nav-link'>
          About
        </Link>
        <Link to='/list' onClick={closeMenu} className='nav-link'>
          List
        </Link>
      </NavbarLinks> */}
          </NavLeft>

          <NavbarLogin>
            {isAuthenticated ? (
              <ProfileArea>
                <Avatar email={user?.email || ''} />
                <LogoutButton
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </LogoutButton>
              </ProfileArea>
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
