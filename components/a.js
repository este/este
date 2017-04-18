// @flow
import Text, { type TextProps } from './text';

const A = (props: TextProps) => (
  <Text
    style={() => {
      const {
        // display inline?
        // color = 'primary',
        ...restProps
      } = props;
      return { ...restProps };
    }}
  />
);

export default A;
