// @flow
import * as React from 'react';
import A from './A';
import P from './P';
import Text from './Text';

type BlockquoteProps = {|
  children: React.Node,
  href: string,
  source: string,
|};

const Blockquote = ({ children, href, source }: BlockquoteProps) => (
  <P>
    <Text italic>{children}</Text>
    <Text>
      {' '}
      — <A href={href}>{source}</A>
    </Text>
  </P>
);

export default Blockquote;
