import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import useAuthToken from '@/hooks/useAuthToken';
interface UserContextType {
  roles: string[] | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const defaultContext: UserContextType = {
  roles: null,
  isAuthenticated: false,
  isAdmin: false,
};

const UserContext = createContext<UserContextType>(defaultContext);
export { UserContext };

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { roles, token } = useAuthToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  useEffect(() => {
    setIsAdmin(isAuthenticated && roles?.includes('Admin') === true);
  }, [isAuthenticated, roles]);

  return (
    <UserContext.Provider value={{ roles, isAuthenticated, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context data
export const useUser = () => useContext(UserContext);
