// @flow
import Box, { type BoxProps } from '../components/box';

// Horizontal container for buttons.

const Buttons = (props: BoxProps) => (
  <Box
    style={theme => {
      const {
        flexDirection = 'row',
        flexWrap = 'wrap',
        // Button has default horizontal margin, which is subtract on edges.
        marginHorizontal = -theme.button.marginHorizontal,
        ...restProps
      } = props;
      return {
        flexDirection,
        flexWrap,
        marginHorizontal,
        ...restProps,
      };
    }}
  />
);

export default Buttons;
