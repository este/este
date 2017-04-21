// @flow
import Box, { type BoxProps } from './box';

// Image requires size to prevents flash of unloaded content.
// TODO: It should be universally responsive, some how.

type ImageProps = BoxProps & {
  size: {|
    height: number,
    width: number,
  |},
  src: string,
};

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

const Image = (props: ImageProps) => (
  <Box
    style={theme => {
      const { as = 'img', size, ...restProps } = props;
      return {
        as,
        ...verticalRhythmSize(size, theme.typography.lineHeight),
        ...restProps,
      };
    }}
  />
);

export default Image;
