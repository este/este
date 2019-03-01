import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import React from 'react';
import { Platform, Text, TextStyle, StyleProp } from 'react-native';
import { Assign, Omit, Overwrite } from 'utility-types';
import useAppContext from '../hooks/useAppContext';
import { AppHref } from '../types';

type LinkProps = Assign<
  Overwrite<
    Omit<NextLinkProps, 'passHref'>,
    {
      // Allow string etc.
      children: React.ReactNode;
      // Make href required and typed.
      href: AppHref;
    }
  >,
  WithRouterProps & {
    style?: StyleProp<TextStyle>;
    activeStyle?: StyleProp<TextStyle>;
  }
>;

const Link: React.FunctionComponent<LinkProps> = props => {
  const { theme } = useAppContext();
  const [isActive, setIsActive] = React.useState(false);
  const { children, style, activeStyle, router, href, ...rest } = props;

  const routeIsActive = () => {
    if (router == null) return false;
    const linkPathname = typeof href === 'object' ? href.pathname : href;
    const linkQuery = typeof href === 'object' ? href.query : null;
    return (
      linkPathname === router.pathname &&
      JSON.stringify(linkQuery || {}) === JSON.stringify(router.query || {})
    );
  };

  return (
    <NextLink {...rest} href={href} passHref>
      <Text
        style={[
          style || theme.link,
          (isActive || routeIsActive()) && (activeStyle || theme.linkActive),
        ]}
        {...Platform.select({
          web: {
            accessibilityRole: 'link',
            onMouseEnter: () => setIsActive(true),
            onMouseLeave: () => setIsActive(false),
          },
        })}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export default withRouter(Link);
