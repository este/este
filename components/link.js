// @flow
import type { Children } from 'react';
import LocaleLink from './locale-link';

// Generic link without styles.
// Use it for image or any other non text component.
// For text, use A.

type LinkProps = {|
  children?: Children,
  href: string,
  prefetch?: boolean,
|};

const Link = ({ children, ...props }: LinkProps) =>
  <LocaleLink {...props}><a>{children}</a></LocaleLink>;

export default Link;
