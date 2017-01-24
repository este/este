// @flow
import type { TextProps } from '../../common/components/Text';
import { Text } from '../../common/components';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router';

type LinkProps = TextProps & {
  to: string,
};

const isExternalLink = to => to.includes('://');

const Anchor = ({ to, ...props }) => (
  <a
    href={to}
    rel="noopener noreferrer"
    target="_blank"
    {...props}
  />
);

const RouterLink = (props) => (
  <ReactRouterLink
    activeStyle={{ textDecoration: 'underline' }}
    {...props}
  />
);

const Link = ({
  color = 'primary',
  style,
  ...props
}: LinkProps) => {
  const AnchorOrRouterLink = isExternalLink(props.to) ? Anchor : RouterLink;
  return (
    <Text
      as={AnchorOrRouterLink}
      color={color}
      style={(theme, textStyle) => ({
        textDecoration: 'none',
        ':hover': {
          textDecoration: 'underline',
        },
        ...(style && style(theme, textStyle)),
      })}
      {...props}
    />
  );
};

export default Link;
