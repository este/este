// @flow
import Box, { type BoxProps } from './Box';
import PropTypes from 'prop-types';
import React from 'react';
import colorLib from 'color';
import type { ColorName, Theme } from '../themes/types';
import withTheme, { type ThemeContext } from './withTheme';

/*
  Text is the basic UI primitive for all text components.
    Text -> Heading
    Text -> Button
    Text -> TextInput
    etc.

  Text inherits its styles.
  https://facebook.github.io/react-native/docs/text.html#limited-style-inheritance

  Text styles are restricted to work with React Native, but we can set any
  browser style via style property directly.
*/

export type TextProps = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: ColorName,
  decoration?: 'none' | 'underline' | 'line-through',
  fontFamily?: string,
  italic?: boolean,
  lineHeight?: number,
  size?: number,
  // TODO: shadowColor, shadowOffset, shadowRadius.
} & BoxProps;

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
export const computeFontSizeAndLineHeight = (
  { typography }: Theme,
  size: number,
) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

// http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only for light text on a dark background.
const fixBrowserFontSmoothing = (color, backgroundColor) => {
  const hasColorAndBackgroundColor =
    color !== 'transparent' && backgroundColor !== 'transparent';
  if (!hasColorAndBackgroundColor) return null;
  const colorIsLighterThanBackgroundColor =
    colorLib(color).luminosity() > colorLib(backgroundColor).luminosity();
  if (!colorIsLighterThanBackgroundColor) return null;
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

// React Native rethinked styles and web should follow that. By that, we can
// have multiplatform components. Check previous Este, I will re-add it soon.
// https://github.com/Microsoft/reactxp/blob/master/src/web/Text.tsx
const emulateReactNative = (theme, style, backgroundColor) => ({
  ...{
    position: 'relative',
    display: 'inline',
    // Why ReactXP uses it?
    // flexGrow: 0,
    // flexShrink: 0,
    // That's because Android.
    // overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    msHyphens: 'auto',
  },
  ...(backgroundColor
    ? fixBrowserFontSmoothing(style.color, theme.colors[backgroundColor])
    : null),
  ...style,
  lineHeight: `${style.lineHeight}px`, // browser needs px
});

class Text extends React.Component<TextProps> {
  static childContextTypes = {
    hasParentEsteText: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    hasParentEsteText: PropTypes.bool,
  };

  getChildContext() {
    // Let descendant components know that their nearest ancestor is Text.
    return { hasParentEsteText: true };
  }

  context: { hasParentEsteText: boolean } & ThemeContext;

  render() {
    const { theme, hasParentEsteText } = this.context;
    const {
      align = 'left',
      bold = false,
      color = theme.text.color,
      decoration = 'none',
      fontFamily = theme.text.fontFamily,
      italic = false,
      lineHeight,
      size = 0,
      ...restProps
    } = this.props;

    // Set all styles to ensure styles are isolated.
    let style = {
      color: theme.colors[color],
      fontFamily,
      ...computeFontSizeAndLineHeight(theme, size),
      textAlign: align,
      fontWeight: bold ? theme.text.bold : 'normal',
      textDecoration: decoration,
      fontStyle: italic ? 'italic' : 'normal',
      ...(lineHeight != null ? { lineHeight } : null),
      ...restProps.style,
    };

    // Enforce inheritance in a browser. All props are inherited by default.
    // https://facebook.github.io/react-native/docs/text.html#limited-style-inheritance
    if (hasParentEsteText) {
      if (this.props.color == null) delete style.color;
      if (this.props.fontFamily == null) delete style.fontFamily;
      if (this.props.size == null) delete style.fontSize;
      if (this.props.lineHeight == null) delete style.lineHeight;
      if (this.props.align == null) delete style.textAlign;
      if (this.props.bold == null) delete style.fontWeight;
      if (this.props.decoration == null) delete style.textDecoration;
      if (this.props.italic == null) delete style.fontStyle;
    }

    if (!restProps.isReactNative) {
      style = emulateReactNative(theme, style, restProps.backgroundColor);
    }

    return <Box {...restProps} style={style} />;
  }
}

withTheme(Text);

export default Text;
