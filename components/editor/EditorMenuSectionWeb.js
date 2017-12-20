// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionWeb = ({ setActiveSection }: *) => (
  <EditorMenuSection>
    <EditorMenuButton onPress={() => setActiveSection('theme')}>
      theme
    </EditorMenuButton>
    {/* <EditorMenuButton section="pages" dispatch={dispatch}>
      pages
    </EditorMenuButton> */}
  </EditorMenuSection>
);

export default EditorMenuSectionWeb;
