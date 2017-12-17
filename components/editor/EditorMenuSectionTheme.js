// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

//active autoFocus
const EditorMenuSectionTheme = () => (
  <EditorMenuSection>
    <EditorMenuButton>typography</EditorMenuButton>
    <EditorMenuButton>colors</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionTheme;
