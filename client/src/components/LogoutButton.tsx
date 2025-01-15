import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type LogoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LogoutButton: React.FC<LogoutButtonProps> = ({ className, ...props }) => {
  const { logout } = useAuth0();

  return (
    <button
      className={className}
      onClick={() =>
        logout({
          logoutParams: { returnTo: window.location.origin }, // Use 'logoutParams' for redirection
        })
      }
      {...props}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
