/* @flow */
import React from 'react';
import { Base } from 'rebass';

// TODO: Enforce height and width with invariant check.

const Image = (props: Object) => (
  <Base {...props} tagName="img" />
);

export default Image;
