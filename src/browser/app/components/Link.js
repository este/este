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

// TODO: Can't be dynamic, but should be github.com/rofrischmann/fela/issues/151
const StyledAnchorLink = style(linkStyle, 'a', [
  'download', 'href', 'target',
]);

const AnchorLink = (props: LinkProps) => (
  <StyledAnchorLink {...props} href={props.to} />
);

// TODO: Should be in theme, but how? Will be solved with found router anyway.
const activeStyle = { textDecoration: 'underline' };

const StyledRouterLink = style(linkStyle, ReactRouterLink, [
  'activeOnlyWhenExact', 'activeStyle', 'to',
]);

const RouterLink = (props: LinkProps) => (
  <StyledRouterLink
    {...props}
    activeOnlyWhenExact={props.exactly}
    activeStyle={activeStyle}
  />
);

const isExternalLink = to => to.includes('://');
const shouldRenderAnchor = isExternalLink;

const Link = (props: LinkProps) => (
  shouldRenderAnchor(props.to) ?
    <AnchorLink {...props} />
  :
    <RouterLink {...props} />
);

export default Link;
