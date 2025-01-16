import React from 'react';

type AvatarProps = {
  email: string;
  size?: number;
  className?: string;
};

const generateAvatarColor = (email: string) => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate a color by using the hash value
  const color = `#${((hash >> 24) & 0xff).toString(16)}${((hash >> 16) & 0xff).toString(16)}${(
    (hash >> 8) &
    0xff
  ).toString(16)}`;
  return color;
};

const Avatar: React.FC<AvatarProps> = ({ email, size = 40, className }) => {
  // Extract the first two characters of the email for initials
  const initials = email.substring(0, 2).toUpperCase();

  // Generate a background color based on the email for uniqueness
  const backgroundColor = generateAvatarColor(email + '10');

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: backgroundColor, // Use the generated color
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
