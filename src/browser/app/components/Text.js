// @flow
import type { BoxProps } from './Box';
import type {
  Color,
  ColorProps,
  Styled,
  TextAlign,
  TextDecoration,
  TextTransform,
} from '../themes/types';
import Box from './Box';
import color from 'color';
import styled from './styled';

export type TextProps = BoxProps & ColorProps & {
  // The lowest common denominator of:
  //  w3schools.com/css/css_text.asp
  //  facebook.github.io/react-native/releases/0.39/docs/text.html#text
  align?: TextAlign,
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  fontFamily?: string,
  size?: number,
  transform?: TextTransform,
  // Custom stuff.
  doNotFixFontSmoothing?: boolean,
};

// So we can have <Text primary or <Button danger etc.
const maybeColorProps = (theme, props) => {
  const color = Object.keys(props).find(item => item in theme.colors);
  if (!color) return {};
  return {
    box: {
      backgroundColor: color,
      border: true,
      borderColor: color,
    },
    color: 'white',
  };
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only on the light text on the dark background.
const maybeFixFontSmoothing = doNotFixFontSmoothing => style => {
  if (doNotFixFontSmoothing) return style;
  const hasColorAndBackgroundColor =
    style.color &&
    style.backgroundColor &&
    style.backgroundColor !== 'transparent';
  if (!hasColorAndBackgroundColor) return style;
  const colorIsLighterThanBackgroundColor =
    color(style.color).luminosity() > color(style.backgroundColor).luminosity();
  if (!colorIsLighterThanBackgroundColor) return style;
  return {
    ...style,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const fontSizeAndLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = typography.lineHeight * lines;
  return { fontSize, lineHeight: `${lineHeight}px` };
};

const Text: Styled<TextProps> = styled((theme, {
  align = 'left',
  bold = false,
  color = 'black',
  decoration = 'none',
  display = 'inline',
  doNotFixFontSmoothing,
  fontFamily = theme.text.fontFamily,
  size = 0,
  transform = 'none',
  ...props
}) => {
  const colorProps = maybeColorProps(theme, props);
  return {
    $extends: [Box, colorProps.box],
    $map: maybeFixFontSmoothing(doNotFixFontSmoothing),
    color: theme.colors[colorProps.color || color],
    display,
    fontFamily,
    fontWeight: bold ? theme.text.bold : 'normal',
    textAlign: align,
    textDecoration: decoration,
    textTransform: transform,
    ...fontSizeAndLineHeight(theme.typography, size),
  };
}, 'span');

export default Text;
