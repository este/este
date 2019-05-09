// Typed styles are easily composable. Spread ftw.
// As for light / dark stuff:
//  1) We can have two themes. One light and one dark.
//  2) We can have one theme containing both light and dark colors.
//  3) We can have both.
// It means:
//  1) Start with semantic names. Like foreground and background colors.
//  2) Then add foreground-whatever (e.g. foreground-dark).
// That's all.
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// https://yeun.github.io/open-color/
export const colors = {
  background: '#fff',
  danger: '#fa5252',
  foreground: 'rgb(51, 51, 51)',
  foregroundInverse: '#fff',
  gray: 'rgb(153, 163, 173)',
  grayLight: 'rgb(225, 225, 225)',
  primary: '#228be6',
};

export const dimensions = {
  space: 24, // Like default lineHeight, should be somehow referenced.
  spaceBig: 48,
  spaceSmall: 12,
};

// https://www.modularscale.com/
const modularScale = {
  step0: 1,
  step1: 16 / 15,
  step2: 9 / 8,
  step3: 6 / 5,
  step4: 5 / 4,
  step5: 4 / 3,
  step6: Math.SQRT2,
  step7: 3 / 2,
  step8: 8 / 5,
  step9: 5 / 3,
  step10: 16 / 9,
  step11: 15 / 8,
  step12: 2,
  step13: 5 / 2,
  step14: 8 / 3,
  step15: 3,
  step16: 4,
};

const createTypography = ({
  fontSize,
  lineHeight,
  scale,
}: {
  fontSize: number;
  lineHeight: number;
  scale: keyof typeof modularScale;
}) => {
  // http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
  const computeRhythmLineHeight = (modularFontSize: number) => {
    const lines = Math.ceil(modularFontSize / lineHeight);
    return lines * lineHeight;
  };
  return {
    fontSize,
    lineHeight,
    scale: (level: number) => {
      const modularFontSize = fontSize * modularScale[scale] ** level;
      const rhythmLineHeight = computeRhythmLineHeight(modularFontSize);
      return {
        fontSize: modularFontSize,
        lineHeight: rhythmLineHeight,
      };
    },
  };
};

type Colors = typeof colors;
type Dimensions = typeof dimensions;

// No interface, because we extract Theme type from StyleSheet.create.
export class LightTheme {
  text: TextStyle;
  textSmall: TextStyle;
  textSmallGray: TextStyle;
  marginBottom: ViewStyle;
  marginTop: ViewStyle;
  paragraph: TextStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  layoutScrollView: ViewStyle;
  layoutScrollViewContentContainer: ViewStyle;
  layoutHeader: ViewStyle;
  layoutBody: ViewStyle;
  layoutFooter: ViewStyle;
  layoutFooterText: TextStyle;
  link: TextStyle;
  linkActive: TextStyle;
  spacer: ViewStyle;
  borderGrayLight: ViewStyle;
  textInputOutline: TextStyle;
  row: ViewStyle;
  buttons: ViewStyle;
  button: TextStyle;
  buttonPrimary: TextStyle;
  buttonDanger: TextStyle;
  buttonSecondary: TextStyle;
  buttonDisabled: TextStyle;
  validationError: TextStyle;
  marginStartAuto: ViewStyle;
  label: TextStyle;

  constructor(colors: Colors, dimensions: Dimensions) {
    const typography = createTypography({
      fontSize: 16,
      lineHeight: 24,
      scale: 'step5',
    });

    this.text = {
      color: colors.foreground,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      ...typography.scale(0),
    };

    this.textSmall = {
      ...this.text,
      ...typography.scale(-1),
    };

    this.textSmallGray = {
      ...this.textSmall,
      color: colors.gray,
    };

    this.marginBottom = {
      marginBottom: typography.lineHeight,
    };

    this.marginTop = {
      marginTop: typography.lineHeight,
    };

    this.paragraph = {
      ...this.text,
      ...this.marginBottom,
    };

    this.heading1 = {
      ...this.text,
      ...this.marginBottom,
      ...typography.scale(2),
      color: colors.gray,
      fontWeight: 'bold',
    };

    this.heading2 = {
      ...this.heading1,
      ...typography.scale(1),
    };

    this.layoutScrollView = {
      flex: 1,
      backgroundColor: colors.background,
    };

    const layoutWidth = {
      marginHorizontal: 'auto',
      maxWidth: 768,
      // https://css-tricks.com/tale-width-max-width/
      width: '100%',
      paddingHorizontal: 16,
    };

    this.layoutScrollViewContentContainer = {
      ...layoutWidth,
      // Ensure the footer is always at the bottom.
      minHeight: '100%',
    };

    this.layoutHeader = {
      ...layoutWidth,
      flexDirection: 'row',
      paddingVertical: dimensions.space,
    };

    this.layoutBody = {
      flex: 1,
      paddingTop: dimensions.spaceSmall,
    };

    this.layoutFooter = {
      marginTop: dimensions.space,
      borderTopColor: colors.gray,
      borderTopWidth: 1,
      paddingVertical: dimensions.spaceSmall,
    };

    this.layoutFooterText = {
      ...this.text,
      ...typography.scale(-1),
    };

    this.link = {
      // Link does not extend text, because link can be in any text and inherits
      // it's styles like fontFamily and fontSize. Therefore, Link must be always
      // wrapped by Text.
      color: colors.primary,
    };

    this.linkActive = {
      textDecorationLine: 'underline',
    };

    this.spacer = {
      width: dimensions.spaceSmall,
    };

    this.borderGrayLight = {
      borderColor: colors.grayLight,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    };

    this.textInputOutline = {
      ...this.text,
      ...this.borderGrayLight,
      paddingHorizontal: typography.lineHeight / 2,
      paddingVertical: typography.lineHeight / 4,
      width: typography.fontSize * 16,
    };

    // TODO: Rename to flexRowFlexWrap.
    this.row = {
      flexDirection: 'row',
      flexWrap: 'wrap',
    };

    this.buttons = {
      ...this.row,
      marginHorizontal: -(typography.lineHeight / 4),
    };

    this.button = {
      ...this.text,
      margin: typography.lineHeight / 4,
    };

    // Button helper styles. It can be refactored but this is fine enough.
    const buttonPadding = {
      paddingHorizontal: typography.lineHeight / 2,
      paddingVertical: typography.lineHeight / 8,
    };

    const buttonBorderPrimary = {
      ...this.borderGrayLight,
      borderColor: colors.primary,
    };

    const buttonBorderDanger = {
      ...this.borderGrayLight,
      borderColor: colors.danger,
    };

    this.buttonPrimary = {
      ...this.button,
      ...buttonPadding,
      ...buttonBorderPrimary,
      backgroundColor: colors.primary,
      color: colors.foregroundInverse,
    };

    this.buttonDanger = {
      ...this.button,
      ...buttonPadding,
      ...buttonBorderDanger,
      backgroundColor: colors.danger,
      color: colors.foregroundInverse,
    };

    this.buttonSecondary = {
      ...this.button,
      ...buttonPadding,
      ...this.borderGrayLight,
    };

    this.buttonDisabled = {
      opacity: 0.5,
    };

    this.validationError = {
      ...this.textSmall,
      color: colors.danger,
      fontWeight: 'bold',
      minHeight: typography.lineHeight,
    };

    this.marginStartAuto = {
      marginStart: 'auto',
    };

    this.label = {
      ...this.textSmall,
      color: colors.gray,
      padding: typography.lineHeight / 6,
      textTransform: 'uppercase',
    };
  }
}

export const lightTheme = StyleSheet.create(new LightTheme(colors, dimensions));
export type Theme = typeof lightTheme;
