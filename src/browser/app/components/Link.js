/* @flow */
/* aeslint-disable no-unused-vars, ajsx-a11y/anchor-has-content */
import type { TextProps } from './Text';
import type { Theme } from '../themes';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router';
import { createComponent } from 'react-fela';
import { textStyles } from './Text';

type LinkProps = {
  download?: boolean,
  exactly?: boolean,
  target?: string,
  to: string,
} & TextProps;

const linkStyles = (props: LinkProps & { theme: Theme }) => ({
  ...textStyles(props),
  color: props.inverted ? props.theme.colors.white : props.theme.colors.primary,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

const AnchorLink = (props: LinkProps) => {
  const Component = createComponent(linkStyles, 'a', {
    href: true,
    download: true,
    target: true,
  });
  return (
    <Component
      {...props}
      href={props.to}
    />
  );
};

const RouterLink = (props: LinkProps) => {
  const Component = createComponent(linkStyles, ReactRouterLink, {
    to: true,
    activeOnlyWhenExact: true,
    activeStyle: true,
  });
  // TODO: Should be in theme.
  const activeStyle = { textDecoration: 'underline' };
  return (
    <Component
      {...props}
      activeOnlyWhenExact={props.exactly}
      activeStyle={activeStyle}
    />
  );
};

const isExternalLink = to => to.includes('://');
const shouldRenderAnchor = isExternalLink;

const Link = (props: LinkProps) => (
  shouldRenderAnchor(props.to) ?
    <AnchorLink {...props} />
  :
    <RouterLink {...props} />
);

export default Link;
