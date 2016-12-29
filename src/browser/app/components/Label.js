// @flow
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

type LabelProps = TextProps & {
  inline?: boolean,
};

const Label: Styled<LabelProps> = styled((theme, {
  bold = true,
  inline,
  size = -1,
}) => ({
  $extends: [Text, ({
    bold,
    size,
  }: Strict<TextProps>)],
  // By default, label is aligned to the bottom.
  ...(inline ? {} : {
    position: 'relative',
    top: `${theme.typography.fontSize(size) / 2}px`,
  }),
}));

export default Label;
