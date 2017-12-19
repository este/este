// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

type EditorMenuSectionWebProps = {|
  setActiveSection: *,
|};

const EditorMenuSectionWeb = ({
  setActiveSection,
}: EditorMenuSectionWebProps) => (
  <EditorMenuSection>
    <EditorMenuButton onPress={() => setActiveSection('theme')}>
      theme
    </EditorMenuButton>
    {/* <EditorMenuButton onPress={() => setActiveSection('pages')}>
      pages
    </EditorMenuButton> */}
  </EditorMenuSection>
);

export default EditorMenuSectionWeb;
