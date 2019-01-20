import gravatar from 'gravatar';
import React from 'react';
import { Image } from 'react-native';

interface GravatarProps {
  email: string;
  size?: number;
  rounded?: boolean;
  inline?: boolean;
}

const Gravatar: React.FunctionComponent<GravatarProps> = props => {
  const { email, size = 100, rounded, inline } = props;

  return (
    <Image
      source={{
        uri: gravatar.url(email, {
          default: 'retro',
          rating: 'x',
          size: size.toString(),
        }),
      }}
      style={{
        height: size,
        width: size,
        ...(rounded && { borderRadius: size / 2 }),
        // http://doctype.com/anchor-tag-containing-only-img-extends-below-bottom-image
        ...(inline && { display: 'flex' }),
      }}
    />
  );
};

export default Gravatar;
