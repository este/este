/* @flow */
import React from 'react';

type ImageProps = {
  width: number,
  height: number,
};

const Image = (props: ImageProps) => (
  <img {...props} />
);

export default Image;
