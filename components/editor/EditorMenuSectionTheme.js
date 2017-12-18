// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionTheme = () => (
  <EditorMenuSection>
    <EditorMenuButton autoFocus>typography</EditorMenuButton>
    <EditorMenuButton>colors</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionTheme;
