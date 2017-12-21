// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionTheme = () => (
  <EditorMenuSection>
    <EditorMenuButton autoFocus section="typography">
      typography
    </EditorMenuButton>
    <EditorMenuButton>colors</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionTheme;
