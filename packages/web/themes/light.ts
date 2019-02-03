// Typed JSON styles are easily composable and extendable. Spread ftw.
// As for light / dark stuff:
//  1) We can have two themes. One light and one dark.
//  2) We can have one theme containing both light and dark colors.
//  3) We can have both.
// It means:
//  1) Start with semantic names. Like foreground and background colors.
//  2) Then add foreground-whatever (e.g. foreground-dark).
// That's all.
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const name = 'light';

// https://yeun.github.io/open-color/
export const colors = {
  background: '#fff',
  danger: '#fa5252',
  error: '#fa5252',
  foreground: 'rgb(51, 51, 51)',
  foregroundInverse: '#fff',
  gray: 'rgb(153, 163, 173)',
  grayLight: 'rgb(225, 225, 225)',
  primary: '#228be6',
};

type Colors = typeof colors;

export const dimensions = {
  space: 24, // Like default lineHeight
  spaceBig: 48,
  spaceSmall: 12,
};

type Dimensions = typeof dimensions;

// modularscale.com
export const ModularScale = {
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
  // tslint:disable-next-line:object-literal-sort-keys
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
  scale: keyof typeof ModularScale;
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
      const modularFontSize = fontSize * ModularScale[scale] ** level;
      const rhythmLineHeight = computeRhythmLineHeight(modularFontSize);
      return {
        fontSize: modularFontSize,
        lineHeight: rhythmLineHeight,
      };
    },
  };
};

export const createTheme = (colors: Colors, dimensions: Dimensions) => {
  const typography = createTypography({
    fontSize: 16,
    lineHeight: 24,
    scale: 'step5',
  });

  const text: TextStyle = {
    color: colors.foreground,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    ...typography.scale(0),
  };

  const textSmall: TextStyle = {
    ...text,
    ...typography.scale(-1),
  };

  const textSmallGray: TextStyle = {
    ...textSmall,
    color: colors.gray,
  };

  const marginBottom: ViewStyle = {
    marginBottom: typography.lineHeight,
  };

  const marginTop: ViewStyle = {
    marginTop: typography.lineHeight,
  };

  const paragraph: TextStyle = {
    ...text,
    ...marginBottom,
  };

  const heading1: TextStyle = {
    ...text,
    ...marginBottom,
    ...typography.scale(2),
    color: colors.gray,
    fontWeight: 'bold',
  };

  const heading2: TextStyle = {
    ...heading1,
    ...typography.scale(1),
  };

  const layout: ViewStyle = {
    // That's why we have separate layout and layoutContainer.
    // layoutContainer can have a different bg color than the whole page.
    backgroundColor: colors.background,
    // minHeight ensures the footer is always at the bottom. Flex 1 can't help,
    // because we do not use ScrollView. Check _document.tsx overflow comment.
    minHeight: '100%',
  };

  const layoutContainer: ViewStyle = {
    flex: 1,
    marginHorizontal: 'auto',
    maxWidth: 768,
    paddingHorizontal: dimensions.spaceSmall,
    // https://css-tricks.com/tale-width-max-width/
    width: '100%',
  };

  const layoutHeader: ViewStyle = {
    flexDirection: 'row',
    paddingVertical: dimensions.space,
  };

  const layoutBody: ViewStyle = {
    flex: 1,
    paddingTop: dimensions.spaceSmall,
  };

  const layoutFooter: ViewStyle = {
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    paddingVertical: dimensions.spaceSmall,
  };

  const layoutFooterText: TextStyle = {
    ...text,
    ...typography.scale(-1),
  };

  const link: TextStyle = {
    // Link does not extend text, because link can be in any text and inherits
    // it's styles like fontFamily and fontSize. Therefore, Link must be always
    // wrapped by Text.
    color: colors.primary,
  };

  const linkActive: TextStyle = {
    textDecorationLine: 'underline',
  };

  const spacer: ViewStyle = {
    width: dimensions.spaceSmall,
  };

  const borderGrayLight: ViewStyle = {
    borderColor: colors.grayLight,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  };

  const textInputOutline: TextStyle = {
    ...text,
    ...borderGrayLight,
    paddingHorizontal: typography.lineHeight / 2,
    paddingVertical: typography.lineHeight / 4,
    width: typography.fontSize * 16,
  };

  const row: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  const buttons: ViewStyle = {
    ...row,
    marginHorizontal: -(typography.lineHeight / 4),
  };

  const button: TextStyle = {
    ...text,
    margin: typography.lineHeight / 4,
  };

  const buttonPadding = {
    paddingHorizontal: typography.lineHeight / 2,
    paddingVertical: typography.lineHeight / 8,
  };

  const borderPrimary = {
    ...borderGrayLight,
    borderColor: colors.primary,
  };

  const borderDanger = {
    ...borderGrayLight,
    borderColor: colors.danger,
  };

  const buttonPrimary: TextStyle = {
    ...button,
    ...buttonPadding,
    ...borderPrimary,
    backgroundColor: colors.primary,
    color: colors.foregroundInverse,
  };

  const buttonDanger: TextStyle = {
    ...button,
    ...buttonPadding,
    ...borderDanger,
    backgroundColor: colors.danger,
    color: colors.foregroundInverse,
  };

  const buttonSecondary: TextStyle = {
    ...button,
    ...buttonPadding,
    ...borderGrayLight,
  };

  const buttonDisabled: TextStyle = {
    opacity: 0.5,
  };

  const validationError: TextStyle = {
    ...textSmall,
    color: colors.error,
    fontWeight: 'bold',
    minHeight: typography.lineHeight,
  };

  const marginStartAuto: ViewStyle = {
    marginStart: 'auto',
  };

  const label: TextStyle = {
    ...textSmall,
    color: colors.gray,
    padding: typography.lineHeight / 6,
    // @ts-ignore Because it was added in RN56.
    textTransform: 'uppercase',
  };

  return {
    button,
    buttonDanger,
    buttonDisabled,
    buttonPrimary,
    buttonSecondary,
    buttons,
    heading1,
    heading2,
    label,
    layout,
    layoutBody,
    layoutContainer,
    layoutFooter,
    layoutFooterText,
    layoutHeader,
    link,
    linkActive,
    marginBottom,
    marginStartAuto,
    marginTop,
    paragraph,
    row,
    spacer,
    text,
    textInputOutline,
    textSmall,
    textSmallGray,
    validationError,
  };
};

const theme = StyleSheet.create(createTheme(colors, dimensions));
export type Theme = typeof theme;

export default theme;
