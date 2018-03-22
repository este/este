// @flow
import { StyleSheet } from 'react-native';
import type { StyleSheetStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
// 24ways.org/2011/composing-the-new-canon
// modularscale.com
// type-scale.com

export const scale = {
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

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const createFontSizeWithLineHeightStyles = (fontSize, lineHeight) => {
  const lines = Math.ceil(fontSize / lineHeight);
  return StyleSheet.create({
    style: {
      fontSize,
      lineHeight: lines * lineHeight,
    },
  }).style;
};

const createTypography = ({
  fontSize,
  fontSizeScale,
  lineHeight,
}: {|
  fontSize: number,
  fontSizeScale: number | $Keys<typeof scale>,
  lineHeight: number,
|}) => {
  const scaleRatio =
    typeof fontSizeScale === 'string' ? scale[fontSizeScale] : fontSizeScale;
  const computeFontSize = (level: number) => fontSize * scaleRatio ** level;
  // Cached dynamic styles FTW.
  const fontSizeLineHeightCache: { [level: number]: StyleSheetStyle } = {};

  return {
    fontSize: computeFontSize,
    lineHeight,
    rhythm: (ratio: number) => lineHeight * ratio,
    fontSizeWithLineHeight: (level: number) => {
      if (!fontSizeLineHeightCache[level]) {
        fontSizeLineHeightCache[level] = createFontSizeWithLineHeightStyles(
          computeFontSize(level),
          lineHeight,
        );
      }
      return fontSizeLineHeightCache[level];
    },
  };
};

export default createTypography;
