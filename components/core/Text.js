// @flow
import Box, { type BoxProps } from './Box';
import PropTypes from 'prop-types';
import * as React from 'react';
import type { ColorName } from '../../themes/types';
import Theme from './Theme';
import { Platform, StyleSheet, Text as NativeText } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type TextProps = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: ColorName,
  decoration?: 'none' | 'underline' | 'line-through' | 'underline line-through',
  italic?: boolean,
  size?: number,
  fixWebFontSmoothing?: boolean,
  style?: StyleObj,
  children?: React.Node,
};

// Strutural aka non-themeable styles.

const styles = StyleSheet.create({
  // http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
  // tl;dr Enable font smoothing only for the light text on the dark background.
  fixFontSmoothing:
    Platform.OS === 'web'
      ? // $FlowFixMe Nothing to fix, it's only for the web.
        {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
        }
      : {},
});

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

class Text extends React.PureComponent<TextProps> {
  render() {
    const {
      align,
      bold,
      color,
      decoration,
      italic,
      size = 0,
      fixWebFontSmoothing,
      style,
      children,
      ...props
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
              fixWebFontSmoothing === true && styles.fixFontSmoothing,
              this.props.style,
            ]}
            {...props}
          >
            {this.props.children}
          </NativeText>
        )}
      </Theme>
    );
  }
}

export default Text;
