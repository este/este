// @flow
import React from 'react';
import LocaleLink from './LocaleLink';
import Text, { type TextProps } from './Text';

type AProps = {
  href: string,
  isActive?: boolean,
  prefetch?: boolean,
} & TextProps;

const A = (props: AProps) => {
  const {
    as = 'a',
    color = 'primary',
    href,
    isActive,
    prefetch,
    style,
    ...restProps
  } = props;
  return (
    <LocaleLink href={href} prefetch={prefetch}>
      <Text
        as={as}
        color={color}
        decoration={isActive ? 'underline' : 'none'}
        style={{
          ':hover': { textDecoration: 'underline' },
          ...style,
        }}
        {...restProps}
      />
    </LocaleLink>
  );
};

export default A;
