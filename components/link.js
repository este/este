// @flow
import NextLink from 'next/link';

type LinkProps = {|
  children?: any,
  href: string,
  prefetch?: boolean,
|};

const Link = ({ children, ...props }: LinkProps) => (
  <NextLink {...props}><a>{children}</a></NextLink>
);

export default Link;
