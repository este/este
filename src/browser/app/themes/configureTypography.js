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

const configureTypography = ({
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
    // Vertical rhythm for padding, margins, etc.
    sizes: {
      smallest: lineHeight / 8,
      smaller: lineHeight / 4,
      small: lineHeight / 2,
      medium: lineHeight,
      big: lineHeight * 2,
      bigger: lineHeight * 4,
      biggest: lineHeight * 8,
      step0: 0,
      step1: (1 / 4) * lineHeight,
      step2: (1 / 3) * lineHeight,
      step3: (3 / 8) * lineHeight,
      step4: (2 / 5) * lineHeight,
      step5: (1 / 2) * lineHeight,
      step6: (8 / 15) * lineHeight,
      step7: (9 / 16) * lineHeight,
      step8: (3 / 5) * lineHeight,
      step9: (5 / 8) * lineHeight,
      step10: (2 / 3) * lineHeight,
      step11: (1 / Math.SQRT2) * lineHeight,
      step12: (3 / 4) * lineHeight,
      step13: (4 / 5) * lineHeight,
      step14: (5 / 6) * lineHeight,
      step15: (8 / 9) * lineHeight,
      step16: (15 / 16) * lineHeight,
    },
  };
};

export default configureTypography;
