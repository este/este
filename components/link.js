// @flow
import type { Children } from 'react';
import NextLink from 'next/link';

// Generic link without styles.
// For texts, use A.

type LinkProps = {|
  children?: Children,
  href: string,
  prefetch?: boolean,
|};

const Link = ({ children, ...props }: LinkProps) =>
  <NextLink {...props}><a>{children}</a></NextLink>;

export default Link;
