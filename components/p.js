// @flow
import Text, { type TextProps } from './text';

const P = (props: TextProps) => (
  <Text
    style={theme => {
      const { marginBottom = theme.p.marginBottom, ...restProps } = props;
      return { marginBottom, ...restProps };
    }}
  />
);

export default P;
