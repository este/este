// @flow
import * as React from 'react';
import LocaleLink, { type LocaleLinkBaseProps } from './LocaleLink';

// Generic link without styles.
// Use it for image or any other non text component.
// For text, use A.

type LinkProps = LocaleLinkBaseProps & { children: React.Node };

const Link = ({ children, href, prefetch, replace }: LinkProps) => (
  <LocaleLink href={href} prefetch={prefetch} replace={replace}>
    <a>{children}</a>
  </LocaleLink>
);

export default Link;
