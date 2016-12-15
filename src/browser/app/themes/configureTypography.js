/* @flow */

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
// www.modularscale.com/

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
    },
  };
};

export default configureTypography;
