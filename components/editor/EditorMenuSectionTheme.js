// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionTheme = ({ setActiveSection }: *) => (
  <EditorMenuSection>
    <EditorMenuButton autoFocus onPress={() => setActiveSection('typography')}>
      typography
    </EditorMenuButton>
    <EditorMenuButton>colors</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionTheme;
