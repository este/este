// @flow
import type { TextProps } from '../../common/components/Text';
import React from 'react';
import { Link as FoundRouterLink } from 'found';
import { Text } from '../../common/components';

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
  <FoundRouterLink
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
  const linkStyle = {
    ':hover': {
      textDecoration: 'underline',
    },
  };
  return (
    <Text
      as={AnchorOrRouterLink}
      color={color}
      decoration="none"
      style={(theme, textStyle) => ({
        ...linkStyle,
        ...(style && style(theme, { ...textStyle, ...linkStyle })),
      })}
      {...props}
    />
  );
};

export default Link;
