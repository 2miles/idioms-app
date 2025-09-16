import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

import { useAuth0 } from '@auth0/auth0-react';
import { UserContext, UserContextType } from '@/context/userContext';

// @ts-expect-error Suppress vi.MockedFunction type issue
const mockUseAuth0 = useAuth0 as vi.MockedFunction<typeof useAuth0>;

function makeUserContextMock(overrides: Partial<UserContextType> = {}): UserContextType {
  return {
    // minimal sensible defaults
    roles: [],
    isAuthenticated: false,
    isAdmin: false,
    isRegularUser: false,

    theme: 'light',
    loadingTheme: false,
    setTheme: vi.fn(),
    toggleTheme: vi.fn(),

    ...overrides,
  };
}

describe('NavBar', () => {
  const setup = (
    contextOverrides = {},
    auth0Overrides: Partial<ReturnType<typeof useAuth0>> = {},
  ) => {
    const defaultContext = {
      isAuthenticated: true,
      isAdmin: false,
      roles: [],
      ...contextOverrides,
    };

    mockUseAuth0.mockReturnValue({
      isAuthenticated: defaultContext.isAuthenticated,
      user: null,
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
      ...auth0Overrides,
    } as any);

    const ctx = makeUserContextMock({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <UserContext.Provider value={ctx}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders IdiomVault brand link linking to /', () => {
    setup();
    const brandLink = screen.getByRole('link', { name: /idiomvault/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders navigation menu links', () => {
    setup();
    expect(screen.getByRole('link', { name: /list/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('toggles menu when clicking hamburger', async () => {
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
    setup({ isAuthenticated: false });
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('renders user avatar and exposes Log out in dropdown when authenticated', async () => {
    const user = userEvent.setup();

    setup({ isAuthenticated: true }, { user: { email: 'test@example.com' } });

    // Find and open the avatar dropdown
    const trigger = screen.getByRole('button', { name: /user menu/i });
    await user.click(trigger);

    // Assert the dropdown option is present (roles unchanged: listbox/option)
    expect(await screen.findByRole('option', { name: /log out/i })).toBeInTheDocument();
  });
});
