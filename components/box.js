// @flow
import { getRenderer } from '../lib/fela';

/*
  Box is the basic UI primitive for typed, themed, and universal styles.
    Box -> Container
    Box -> Text -> Heading

  Style props define the lowest common denominator for all React platforms.
    <Box margin="auto" />

  Some style props values are restricted to a theme constants.
    <Box
      backgroundColor="primary" // theme.colors
      padding={1} // theme.baseline * n
    />

  Use style prop directly for platform specific styles.
    <Box style={theme => ({ whateverFelaSupport: value })} />

  We can style any component with as property.
    <Box color="primary" as><input /></Box>

  And more, for example: vertical rhythm, font smoothing, etc.

  TODO:
    - Add back React Native support from previous Este.
    - Autodetect View and Text in React Native.
*/

const renderer = getRenderer();

// flow.org/en/docs/types/objects/#toc-exact-object-types
export type BoxProps = {|
  children?: any,
  style?: Object,

  fontFamily?: string,

  // margin?: 'auto',
|};

const Box = (props: BoxProps) => {
  const {
    children,
    style,

    // margin,
    ...styleProps
  } = props;

  const className = renderer.renderRule(() => ({
    ...styleProps,
    ...style,
    // backgroundColor: 'blue',
    // color: 'red',
  }));
  return <div className={className}>{children}</div>;
};

export default Box;
