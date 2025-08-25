import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SecondaryButton } from '../ButtonStyles';
import { styled } from 'styled-components';

type LogoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledLogoutButton = styled(SecondaryButton)`
  background-color: var(--bg-dark) !important;
`;

const LogoutButton: React.FC<LogoutButtonProps> = ({ ...props }) => {
  const { logout } = useAuth0();

  return (
    <StyledLogoutButton
      className='btn btn-secondary'
      onClick={() =>
        logout({
          logoutParams: { returnTo: window.location.origin },
        })
      }
      {...props}
    >
      Log Out
    </StyledLogoutButton>
  );
};

export default LogoutButton;
