// @flow
import Box, { type BoxProps } from './box';

const Text = (props: BoxProps) => {
  const {
    // font-family-sans-serif
    // github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
    fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    ...restProps
  } = props;
  return <Box fontFamily={fontFamily} {...restProps} />;
};

export default Text;
