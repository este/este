// @flow

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
// 24ways.org/2011/composing-the-new-canon
// modularscale.com
// type-scale.com

export const scale = {
  step0: 1,
  step1: 15 / 16,
  step2: 8 / 9,
  step3: 5 / 6,
  step4: 4 / 5,
  step5: 3 / 4,
  step6: 1 / Math.SQRT2,
  step7: 2 / 3,
  step8: 5 / 8,
  step9: 3 / 5,
  step10: 9 / 16,
  step11: 8 / 15,
  step12: 1 / 2,
  step13: 2 / 5,
  step14: 3 / 8,
  step15: 1 / 3,
  step16: 1 / 4,
};

const typography = ({
  fontSize,
  fontSizeScale,
  lineHeight,
}: {|
  fontSize: number,
  fontSizeScale: number | $Keys<typeof scale>,
  lineHeight: number,
|}) => {
  const scaleRatio =
    typeof fontSizeScale === 'string'
      ? scale[fontSizeScale]
      : fontSizeScale;
  return {
    fontSize: (level: number) => fontSize * (scaleRatio ** -level),
    lineHeight,
    rhythm: (ratio: number) => lineHeight * ratio,
  };
};

export default typography;
