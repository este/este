// @flow
import React from 'react';
import Box, { type BoxProps } from './Box';
import withTheme, { type ThemeContext } from './withTheme';

// For UI images, use size prop to enforce size and vertical rhythm.
// For responsive content images like photos, use relative % width.

// It’s impossible to ensure vertical rhythm on responsive images without
// runtime measurement with predefined aspect ratio.
// Perfectionism kills productivity. It's good enough as is.

type ImageProps = {
  size?: {| height: number, width: number |},
  src: string,
  srcset?: string,
} & BoxProps;

const heightToNearestBaseline = (height, lineHeight) => {
  const baselineHeight1 = Math.floor(height / lineHeight) * lineHeight;
  const baselineHeight2 = Math.ceil(height / lineHeight) * lineHeight;
  const use1 =
    Math.abs(baselineHeight1 - height) < Math.abs(baselineHeight2 - height);
  return use1 ? baselineHeight1 : baselineHeight2;
};

const verticalRhythmSize = ({ height, width }, lineHeight) => {
  const rhythmHeight = heightToNearestBaseline(height, lineHeight);
  return {
    height: rhythmHeight / lineHeight,
    width: width * (rhythmHeight / height) / lineHeight,
  };
};

const Image = (props: ImageProps, { theme }: ThemeContext) => {
  const { as = 'img', size, ...restProps } = props;
  return (
    <Box
      as={as}
      {...(size ? verticalRhythmSize(size, theme.typography.lineHeight) : null)}
      {...restProps}
    />
  );
};

withTheme(Image);

export default Image;
