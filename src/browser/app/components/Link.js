// @flow
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import styled from './styled';
import { Link as ReactRouterLink } from 'react-router';

type LinkProps = TextProps & {
  download?: boolean,
  exactly?: boolean,
  target?: string,
  to: string,
};

const createLink = (tag, passProps) => styled((theme, {
  color = 'primary',
}) => ({
  $extends: [Text, ({
    color,
  }: Strict<TextProps>)],
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
}), tag, passProps);

const AnchorLink = createLink('a', [
  'download', 'href', 'target',
]);

const RouterLink = createLink(ReactRouterLink, [
  'activeOnlyWhenExact', 'activeStyle', 'to',
]);

const isExternalLink = to => to.includes('://');
const routerLinkActiveStyle = { textDecoration: 'underline' };

const Link: Styled<LinkProps> = props => (
  isExternalLink(props.to) ?
    <AnchorLink
      {...props}
      href={props.to}
      target="_blank"
    />
  :
    <RouterLink
      {...props}
      activeOnlyWhenExact={props.exactly}
      activeStyle={routerLinkActiveStyle}
    />
);

export default Link;
