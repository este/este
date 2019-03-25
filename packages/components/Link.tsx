import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { useState, FunctionComponent } from 'react';
import { Platform, Text, TextStyle, StyleProp } from 'react-native';
import { Assign, Omit, Overwrite } from 'utility-types';
import useAppContext from '@app/hooks/useAppContext';
import useAppHref, { AppHref } from '@app/hooks/useAppHref';

export type LinkProps = Assign<
  Overwrite<
    Omit<NextLinkProps, 'passHref'>,
    {
      // Allow string etc.
      children: React.ReactNode;
      // Make href required and typed.
      href: AppHref;
    }
  >,
  {
    accessible?: boolean;
    download?: string;
    style?: StyleProp<TextStyle>;
    activeStyle?: StyleProp<TextStyle>;
    // We use it for manual focus.
    nativeID?: string;
  }
>;

const Link: FunctionComponent<LinkProps> = props => {
  const { theme } = useAppContext();
  const [hasHover, setHasHover] = useState(false);
  const appHref = useAppHref();
  const {
    children,
    accessible,
    style,
    activeStyle,
    href,
    download,
    nativeID,
    ...rest
  } = props;

  const isActive = appHref.isActive(href);

  return (
    <NextLink {...rest} href={href} passHref>
      <Text
        style={[
          style || theme.link,
          (isActive || hasHover) && (activeStyle || theme.linkActive),
        ]}
        accessibilityRole="link"
        accessible={accessible}
        nativeID={nativeID}
        {...Platform.select({
          web: {
            download,
            onMouseEnter: () => setHasHover(true),
            onMouseLeave: () => setHasHover(false),
          },
        })}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export default Link;
