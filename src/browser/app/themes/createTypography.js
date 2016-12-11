/* @flow */

type createTypographyProps = {
  baseFontSize: number,
  lineHeightRatio: number,
  scaleRatio: number,
};

// Modular scale
//  - www.modularscale.com/
//  - 24ways.org/2011/composing-the-new-canon
// Vertical rhythm
//  - inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm (the best article)
//  - 24ways.org/2006/compose-to-a-vertical-rhythm
//  - zellwk.com/blog/why-vertical-rhythms
//  - scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm
//  - basehold.it

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
    },
    // Vertical rhythm.
    sizes: {
      smallest: lineHeight / 2,
      smaller: lineHeight,
      small: lineHeight * 2,
      medium: lineHeight * 3,
      big: lineHeight * 4,
      bigger: lineHeight * 5,
      biggest: lineHeight * 6,
    },
  };
};

export default createTypography;
