// @flow
import Box, { type BoxProps } from './box';
import type { Color } from '../themes/types';

/*
  Text is the basic UI primitive for all text based elements.
    Text -> Heading
    Text -> Button
    Text -> Input

  Text works like React Native Text even in the browser.
    facebook.github.io/react-native/releases/0.43/docs/text.html#containers
*/

export type TextProps = BoxProps & {
  bold?: boolean,
  color?: Color,
  fontFamily?: string,
};

const Text = (props: $Exact<TextProps>) => (
  <Box
    // textFoo={bla ? s}
    style={theme => {
      const {
        bold,
        color = 'black',
        fontFamily = theme.text.fontFamily,
        ...restProps
      } = props;
      return {
        universalStyle: {
          color: theme.colors[color],
          fontFamily,
        },
        browserStyle: {
          ...(bold ? { fontWeight: theme.text.bold } : null),
          // Mimic React Native Text behavior.
          // facebook.github.io/react-native/releases/0.43/docs/text.html#containers
          '> *': { display: 'inline' },
        },
        nativeStyle: {
          ...(bold ? { fontWeight: String(theme.text.bold) } : null),
        },
        ...restProps,
      };
    }}
  />
);

export default Text;
