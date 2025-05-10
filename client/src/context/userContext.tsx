import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import useAuthToken from '@/hooks/useAuthToken'; // The hook where roles are fetched

// Define the context's data structure
interface UserContextType {
  roles: string[] | null;
  isAuthenticated: boolean;
}

// Default context values
const defaultContext: UserContextType = {
  roles: null,
  isAuthenticated: false,
};

const UserContext = createContext<UserContextType>(defaultContext);
export { UserContext };

// The provider component that will wrap the app and provide user data
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { roles, token } = useAuthToken(); // Get the roles and token from the custom hook
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Update authentication status and roles when the token changes
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true); // User is authenticated if the token exists
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, [token]);

  return <UserContext.Provider value={{ roles, isAuthenticated }}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context data
export const useUser = () => useContext(UserContext);
