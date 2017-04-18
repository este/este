// @flow
import Text, { type TextProps } from './text';

const Heading = (props: TextProps) => (
  <Text
    style={() => {
      const {
        // color = 'black',
        ...restProps
      } = props;
      return { ...restProps };
    }}
  />
);

export default Heading;
