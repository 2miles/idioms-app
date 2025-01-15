import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type LoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LoginButton: React.FC<LoginButtonProps> = ({ className, ...props }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className={className} onClick={() => loginWithRedirect()} {...props}>
      Log In
    </button>
  );
};

export default LoginButton;
