// @flow
import type { Styled } from '../themes/types';
import styled from './styled';

type ImageProps = {|
  alt?: string,
  height: number,
  src: string | number, // number, because src={require('./foo.png')}
  title?: string,
  width: number,
|};

const heightToNearestBaseline = (height, lineHeight) => {
  const baselineHeight1 = Math.floor(height / lineHeight) * lineHeight;
  const baselineHeight2 = Math.ceil(height / lineHeight) * lineHeight;
  const use1 =
    Math.abs(baselineHeight1 - height) < Math.abs(baselineHeight2 - height);
  return use1 ? baselineHeight1 : baselineHeight2;
};

const verticalRhythmSize = (height, width, lineHeight) => {
  const rhythmHeight = heightToNearestBaseline(height, lineHeight);
  return {
    height: rhythmHeight,
    width: width * (rhythmHeight / height),
  };
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
const Image: Styled<ImageProps> = styled((theme, {
  height,
  width,
}) => ({
  display: 'block',
  // Waiting for Edge caniuse.com/#search=object-fit
  ...verticalRhythmSize(height, width, theme.typography.lineHeight),
}), 'img', ['alt', 'src', 'title']);

export default Image;
