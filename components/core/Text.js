// @flow
import Box, { type BoxProps } from './Box';
import PropTypes from 'prop-types';
import * as React from 'react';
import type { ColorName } from '../../themes/types';
import Theme from './Theme';
import { StyleSheet, Text as NativeText } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type TextProps = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: ColorName,
  decoration?: 'none' | 'underline' | 'line-through',
  italic?: boolean,
  size?: number,
  fixBrowserFontSmoothing?: boolean,
  style?: StyleObj,
  children?: React.Node,
};

// Strutural aka non-themeable styles.

const alignStyles = StyleSheet.create({
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
});

const decorationStyles = StyleSheet.create({
  none: { textDecorationLine: 'none' },
  underline: { textDecorationLine: 'underline' },
  'line-through': { textDecorationLine: 'line-through' },
  'underline line-through': { textDecorationLine: 'underline line-through' },
});

const italicStyles = StyleSheet.create({
  normal: { fontStyle: 'normal' },
  italic: { fontStyle: 'italic' },
});

const browserStyles = StyleSheet.create({
  // http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
  // tldr; Fix font smoothing only for the light text on the dark background.
  // $FlowFixMe Nothing to fix, it's only for browsers.
  fixFontSmoothing: {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  },
});

class Text extends React.PureComponent<TextProps> {
  render() {
    const {
      align,
      bold,
      color,
      decoration,
      italic,
      size = 0,
      fixBrowserFontSmoothing,
      style,
      children,
    } = this.props;

    return (
      <Theme>
        {theme => (
          <NativeText
            style={[
              theme.styles.text.font,
              align != null && alignStyles[align],
              bold != null &&
                (bold
                  ? theme.styles.text.weightBold
                  : theme.styles.text.weightNormal),
              color != null && theme.styles.text[color],
              decoration != null && decorationStyles[decoration],
              italic != null &&
                (italic ? italicStyles.italic : italicStyles.normal),
              theme.typography.fontSizeWithLineHeight(size),
              fixBrowserFontSmoothing === true &&
                process.browser === true &&
                browserStyles.fixFontSmoothing,
              this.props.style,
            ]}
          >
            {this.props.children}
          </NativeText>
        )}
      </Theme>
    );
  }
}

export default Text;
