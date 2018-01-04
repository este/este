// @flow
import * as React from 'react';
import Set, { type SetProps } from '../Set';

const EditorMenuSection = (props: SetProps) => {
  const { marginBottom = 0, ...restProps } = props;
  return <Set marginBottom={marginBottom} {...restProps} />;
};

export default EditorMenuSection;
