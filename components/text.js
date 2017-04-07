// @flow
import Box, { type BoxProps } from './box';

const Text = (props: BoxProps) => {
  const {
    // github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
    // For some reason, "Segoe UI" breaks font rendering.
    // fontFamily = '... "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamily = '-apple-system, system-ui, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    ...restProps
  } = props;
  return <Box fontFamily={fontFamily} {...restProps} />;
};

export default Text;
