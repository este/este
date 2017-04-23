// @flow
import Text, { type TextProps } from './text';

const Heading = (props: TextProps) => (
  <Text
    style={theme => {
      const {
        bold = true,
        fontFamily = theme.heading.fontFamily,
        marginBottom = theme.heading.marginBottom,
        ...restProps
      } = props;
      return { bold, fontFamily, marginBottom, ...restProps };
    }}
  />
);

export default Heading;
