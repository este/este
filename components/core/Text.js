// @flow
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
  fixWebFontSmoothing:
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
  static contextTypes = {
    isInAParentText: PropTypes.bool,
  };

  context: {
    isInAParentText: ?true,
  };

  render() {
    const {
      align,
      bold,
      color,
      decoration,
      italic,
      size,
      fixWebFontSmoothing,
      style,
      ...props
    } = this.props;
    const { isInAParentText } = this.context;

    return (
      <Theme>
        {theme => {
          return (
            <NativeText
              style={[
                !isInAParentText && theme.styles.text.font,
                style,
                align != null && alignStyles[align],
                bold != null &&
                  (bold
                    ? theme.styles.text.weightBold
                    : theme.styles.text.weightNormal),
                color != null && theme.styles.text[color],
                decoration != null && decorationStyles[decoration],
                italic != null &&
                  (italic ? italicStyles.italic : italicStyles.normal),
                size != null
                  ? theme.typography.fontSizeWithLineHeight(size)
                  : !isInAParentText &&
                    theme.typography.fontSizeWithLineHeight(0),
                fixWebFontSmoothing === true && styles.fixWebFontSmoothing,
              ]}
              {...props}
            />
          );
        }}
      </Theme>
    );
  }
}

export default Text;
