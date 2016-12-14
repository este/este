/* @flow */

// Vertical rhythm
//  - inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm (the best article)
//  - 24ways.org/2006/compose-to-a-vertical-rhythm
//  - zellwk.com/blog/why-vertical-rhythms
//  - scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm
//  - basehold.it
// Modular scale
//  - 24ways.org/2011/composing-the-new-canon (the best article)
//  - www.modularscale.com/

type createTypographyProps = {|
  baseFontSize: number,
  lineHeightRatio: number,
  scaleRatio: number,
|};

const createTypography = ({
  baseFontSize,
  lineHeightRatio,
  scaleRatio,
}: createTypographyProps) => {
  const fontSize = number => Array
    .from(Array(Math.abs(number)))
    .reduce(
      size => number > 0 ? size * scaleRatio : size / scaleRatio,
      baseFontSize,
    );
  const lineHeight = baseFontSize * lineHeightRatio;

  return {
    lineHeight,
    // Modular scale.
    fontSizes: {
      smallest: fontSize(-3),
      smaller: fontSize(-2),
      small: fontSize(-1),
      medium: fontSize(0),
      big: fontSize(1),
      bigger: fontSize(2),
      biggest: fontSize(3),
      step0: 0,
      step1: fontSize(1),
      step2: fontSize(2),
      step3: fontSize(3),
      step4: fontSize(4),
      step5: fontSize(5),
      step6: fontSize(6),
      step7: fontSize(7),
      step8: fontSize(8),
      step9: fontSize(9),
      step10: fontSize(10),
      step11: fontSize(11),
      step12: fontSize(12),
      step13: fontSize(13),
      step14: fontSize(14),
      step15: fontSize(15),
      step16: fontSize(16),
    },
    // Vertical rhythms for padding, margins, etc.
    sizes: {
      // Basic values.
      smallest: lineHeight / 8,
      smaller: lineHeight / 4,
      small: lineHeight / 2,
      medium: lineHeight,
      big: lineHeight * 2,
      bigger: lineHeight * 4,
      biggest: lineHeight * 8,
      // Granular values. Yes, it's music scale. Musical interval ratios ftw.
      // 24ways.org/2011/composing-the-new-canon
      step0: 0,
      step1: (15 / 16) * lineHeight,
      step2: (8 / 9) * lineHeight,
      step3: (5 / 6) * lineHeight,
      step4: (4 / 5) * lineHeight,
      step5: (3 / 4) * lineHeight,
      step6: (1 / Math.SQRT2) * lineHeight,
      step7: (2 / 3) * lineHeight,
      step8: (5 / 8) * lineHeight,
      step9: (3 / 5) * lineHeight,
      step10: (9 / 16) * lineHeight,
      step11: (8 / 15) * lineHeight,
      step12: (1 / 2) * lineHeight,
      step13: (2 / 5) * lineHeight,
      step14: (3 / 8) * lineHeight,
      step15: (1 / 3) * lineHeight,
      step16: (1 / 4) * lineHeight,
    },
  };
};

export default createTypography;
