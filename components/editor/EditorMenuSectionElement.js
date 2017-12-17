// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionElement = () => (
  <EditorMenuSection>
    <EditorMenuButton>style</EditorMenuButton>
    <EditorMenuButton>clone</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionElement;
