/* @flow */
/* eslint-disable jsx-a11y/img-has-alt */
import React from 'react';

type ImageProps = {|
  alt?: string,
  height: number,
  src: string | number, // number, because src={require('./foo.png')}
  width: number,
|};

const altOrRolePresentation = (alt) => alt
  ? { alt }
  : { role: 'presentation' };

const Image = (props: ImageProps) => (
  <img
    {...altOrRolePresentation(props.alt)}
    height={props.height}
    src={props.src}
    width={props.width}
  />
);

export default Image;
