import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '@/context/userContext';

// @ts-expect-error Suppress vi.MockedFunction type issue
const mockUseAuth0 = useAuth0 as vi.MockedFunction<typeof useAuth0>;

describe('NavBar', () => {
  const setup = (contextOverrides = {}) => {
    const defaultContext = {
      isAuthenticated: true,
      isAdmin: false,
      roles: [],
      ...contextOverrides,
    };
    render(
      <MemoryRouter>
        <UserContext.Provider value={defaultContext}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders IdiomVault brand link linking to /', () => {
    mockUseAuth0.mockReturnValue({ isAuthenticated: false, user: null } as any);
    setup();
    const brandLink = screen.getByRole('link', { name: /idiomvault/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders navigation menu links', () => {
    mockUseAuth0.mockReturnValue({ isAuthenticated: false, user: null } as any);
    setup();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /list/i })).toBeInTheDocument();
  });

  test('toggles menu when clicking hamburger', async () => {
    mockUseAuth0.mockReturnValue({ isAuthenticated: false, user: null } as any);
    const user = userEvent.setup();
    setup();

    const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
    const menuLinksContainer = screen
      .getByRole('navigation')
      .querySelector('[class*="navbar-collapse"]');

    expect(menuLinksContainer).not.toHaveClass('open');
    await user.click(hamburger);
    expect(menuLinksContainer).toHaveClass('open');
    await user.click(hamburger);
    expect(menuLinksContainer).not.toHaveClass('open');
  });

  test('closes the menu when clicking outside', async () => {
    mockUseAuth0.mockReturnValue({ isAuthenticated: false, user: null } as any);
    const user = userEvent.setup();
    setup();

    const hamburger = screen.getByRole('button', { name: /toggle navigation/i });
    const menuLinksContainer = screen
      .getByRole('navigation')
      .querySelector('[class*="navbar-collapse"]');

    await user.click(hamburger);
    expect(menuLinksContainer).toHaveClass('open');
    await user.click(document.body);
    expect(menuLinksContainer).not.toHaveClass('open');
  });

  test('renders Login button if not authenticated', () => {
    mockUseAuth0.mockReturnValue({ isAuthenticated: false, user: null } as any);
    setup({ isAuthenticated: false });
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('renders user avatar and Logout button if authenticated', () => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email: 'test@example.com' },
    } as any);
    setup({ isAuthenticated: true });
    expect(screen.getByText(/te/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });
});
