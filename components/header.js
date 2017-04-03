// @flow
import Link from 'next/link';

const Header = () => (
  <div>
    <Link prefetch href="/"><a>home</a></Link>
    <Link prefetch href="/about"><a>about</a></Link>
  </div>
);

export default Header;
