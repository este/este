// @flow
import * as React from 'react';
import A from './A';
import Block from './Block';
import Text from './Text';

type BlockquoteProps = {|
  children: React.Node,
  href: string,
  source: string,
|};

const Blockquote = ({ children, href, source }: BlockquoteProps) => (
  <Block>
    <Text>
      <Text italic>{children}</Text>
      <Text> — </Text>
      <A href={href}>{source}</A>
    </Text>
  </Block>
);

export default Blockquote;
