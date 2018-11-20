// @flow
import PropTypes from 'prop-types';
import React, { type Node, type ComponentType } from 'react';
import type { ColorName } from '../../themes/types';
import useTheme from '../../hooks/useTheme';
import { StyleSheet, Text as NativeText } from 'react-native';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

export type TextProps = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: ColorName,
  decoration?: 'none' | 'underline' | 'line-through' | 'underline line-through',
  italic?: boolean,
  size?: number,
  style?: TextStyleProp,
  children?: Node,
  // React Native does not export Text props Flow types yet, so add them as-go.
  // Feel free to add any used prop.
  accessibilityRole?: any,
  onMouseDown?: any,
  onMouseEnter?: any,
  onMouseLeave?: any,
  href?: any,
  contentEditable?: boolean,
  target?: string,
  onPress?: (event: Event) => void,
|};

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

const getColorStyle = (themeStyles, color) => {
  switch (color) {
    case 'primary':
      return themeStyles.textPrimary;
    case 'success':
      return themeStyles.textSuccess;
    case 'warning':
      return themeStyles.textWarning;
    case 'danger':
      return themeStyles.textDanger;
    case 'black':
      return themeStyles.textBlack;
    case 'white':
      return themeStyles.textWhite;
    case 'gray':
      return themeStyles.textGray;
    default:
      // eslint-disable-next-line no-unused-expressions
      (color: empty);
      return null;
  }
};

function Text(props: TextProps) {
  const {
    align,
    bold,
    color,
    decoration,
    italic,
    size,
    style,
    // $FlowFixMe Intentionally ignored, will be removed soon anyway.
    isInAParentText,
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <NativeText
      style={[
        !isInAParentText && theme.styles.text,
        style,
        align != null && alignStyles[align],
        bold != null &&
          (bold ? theme.styles.textWeightBold : theme.styles.textWeightNormal),
        color != null && getColorStyle(theme.styles, color),
        decoration != null && decorationStyles[decoration],
        italic != null && (italic ? italicStyles.italic : italicStyles.normal),
        size != null
          ? theme.typography.fontSizeWithLineHeight(size)
          : !isInAParentText && theme.typography.fontSizeWithLineHeight(0),
      ]}
      {...rest}
    />
  );
}

// For legacy context.
// TODO: Remove it. RNW soon will use new React context.
function withIsInAParentText<Props: {}>(
  Component: ComponentType<Props>,
): ComponentType<$Diff<Props, { isInAParentText: boolean | void }>> {
  class IsInAParentText extends React.Component<Props> {
    static contextTypes = {
      isInAParentText: PropTypes.bool,
    };
    context: {
      isInAParentText: ?true,
    };
    render() {
      const { isInAParentText } = this.context;
      return <Component {...this.props} isInAParentText={isInAParentText} />;
    }
  }
  return IsInAParentText;
}

export default withIsInAParentText(Text);
