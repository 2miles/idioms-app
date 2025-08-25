import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import useAuthToken from '@/hooks/useAuthToken';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/utils/theme';

export interface UserContextType {
  roles: string[] | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  loadingTheme: boolean;
}

const UserContext = createContext<UserContextType>({
  roles: null,
  isAuthenticated: false,
  isAdmin: false,
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
  loadingTheme: false,
});
export { UserContext };

export function UserProvider({ children }: { children: ReactNode }) {
  const { roles, token } = useAuthToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  useEffect(() => {
    setIsAdmin(isAuthenticated && roles?.includes('Admin') === true);
  }, [isAuthenticated, roles]);

  const { theme, setTheme, toggleTheme, loading } = useTheme({
    token,
    apiBase: import.meta.env.VITE_API_BASE_URL,
  });

  return (
    <UserContext.Provider
      value={{
        roles,
        isAuthenticated,
        isAdmin,
        theme,
        setTheme,
        toggleTheme,
        loadingTheme: loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
