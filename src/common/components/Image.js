// @flow
import type { BoxProps } from './Box';
import type { Theme } from '../themes/types';
import Box from './Box';
import React from 'react';
import isReactNative from '../app/isReactNative';

// TODO: Implement auto jsx-a11y/img-has-alt.

type Size = {|
  height: number,
  width: number,
|};

type ImageProps = BoxProps & {
  size: Size,
  src: string | number, // number, because src={require('./foo.png')}
};

type ImageContext = {
  Image: () => React.Element<*>,
  theme: Theme,
};

const heightToNearestBaseline = (height, lineHeight) => {
  const baselineHeight1 = Math.floor(height / lineHeight) * lineHeight;
  const baselineHeight2 = Math.ceil(height / lineHeight) * lineHeight;
  const use1 = Math.abs(baselineHeight1 - height) <
    Math.abs(baselineHeight2 - height);
  return use1 ? baselineHeight1 : baselineHeight2;
};

const verticalRhythmSize = ({ height, width }, lineHeight) => {
  const rhythmHeight = heightToNearestBaseline(height, lineHeight);
  return {
    height: rhythmHeight / lineHeight,
    width: width * (rhythmHeight / height) / lineHeight,
  };
};

const Image = (
  {
    size,
    src,
    ...props
  }: ImageProps,
  {
    Image: PlatformImage,
    theme,
  }: ImageContext,
) => (
  <Box
    as={PlatformImage}
    {...verticalRhythmSize(size, theme.typography.lineHeight)}
    {...{ [isReactNative ? 'source' : 'src']: src }}
    {...props}
  />
);

Image.contextTypes = {
  Image: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Image;
