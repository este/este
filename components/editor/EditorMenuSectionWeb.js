// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionWeb = () => (
  <EditorMenuSection>
    <EditorMenuButton section="theme">theme</EditorMenuButton>
    <EditorMenuButton>pages</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionWeb;
