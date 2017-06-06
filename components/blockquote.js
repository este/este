// @flow
import type { Children } from 'react';
import A from './a';
import P from './p';
import Text from './text';

type BlockquoteProps = {|
  children?: Children,
  href: string,
  source: string,
|};

const Blockquote = ({ children, href, source }: BlockquoteProps) =>
  <P>
    <Text italic>
      {children}
    </Text>
    <Text> — <A href={href}>{source}</A></Text>
  </P>;

export default Blockquote;
