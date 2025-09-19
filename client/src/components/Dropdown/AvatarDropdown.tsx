import { useAuth0 } from '@auth0/auth0-react';

import Dropdown from '@/components/Dropdown/Dropdown/Dropdown';
import Avatar from '@/components/NavBar/Avatar';

type AvatarDropdownProps = {
  // optional future props (e.g., onProfile, onSettings)
};

const AvatarDropdown = (_props: AvatarDropdownProps) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }

  const options = ['Profile', 'Settings', 'Log out'] as const;

  const handleOptionClick = (option: string | JSX.Element) => {
    if (option === 'Profile') {
      // route here
    } else if (option === 'Settings') {
      // route here
    } else if (option === 'Log out') {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  return (
    <Dropdown
      variant='avatar'
      label={<Avatar email={user?.email || ''} />}
      options={[...options]}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      hideCaret={true}
      ariaLabel='User menu'
    />
  );
};

export default AvatarDropdown;
