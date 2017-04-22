// @flow
import NextLink from 'next/link';

type LinkProps = {|
  children: any,
  href: string,
  prefetch?: boolean,
|};

const Link = (props: LinkProps) => <NextLink {...props} />;

export default Link;
