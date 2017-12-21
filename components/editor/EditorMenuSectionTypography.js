// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

// fontFamily:
//   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// fontSize: 16,
// fontSizeScale: 0.75,
// lineHeight: 24,

const EditorMenuSectionTypography = () => (
  <EditorMenuSection>
    <EditorMenuButton back section="theme" />
    <EditorMenuButton>fontFamily</EditorMenuButton>
    <EditorMenuButton>fontSize</EditorMenuButton>
    <EditorMenuButton>fontSizeScale</EditorMenuButton>
    <EditorMenuButton>lineHeight</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionTypography;
