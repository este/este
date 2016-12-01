/* @flow */
import type { TextProps } from './Text';
import type { Theme } from '../themes';
import React from 'react';
import style from './style';
import { Link as ReactRouterLink } from 'react-router';
import { textStyle } from './Text';

type LinkProps = {
  download?: boolean,
  exactly?: boolean,
  target?: string,
  to: string,
} & TextProps;

const linkStyle = (props: LinkProps, theme: Theme) => ({
  ...textStyle(props, theme),
  color: props.inverted ? theme.colors.white : theme.colors.primary,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

const AnchorLink = (props: LinkProps) => {
  const Component = style(linkStyle, 'a', [
    'download', 'href', 'target',
  ]);
  return (
    <Component
      {...props}
      href={props.to}
    />
  );
};

const RouterLink = (props: LinkProps) => {
  const Component = style(linkStyle, ReactRouterLink, [
    'activeOnlyWhenExact', 'activeStyle', 'to',
  ]);
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
