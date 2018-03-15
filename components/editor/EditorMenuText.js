// @flow
import * as React from 'react';
import Text, { type TextProps } from '../core/Text';
import { editorMenuItemProps } from './EditorMenu';

const EditorMenuText = (props: TextProps) => (
  <Text {...editorMenuItemProps} {...props} />
);

export default EditorMenuText;
