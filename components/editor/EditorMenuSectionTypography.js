// @flow
import * as React from 'react';
import {
  EditorMenuSection,
  EditorMenuButton,
  EditorMenuInput,
} from './EditorMenu';
import Box from '../Box';
// import type { Web } from './Editor';

// Should be used for scheme validation in Editor.
export const TypographySchema = {
  type: 'object',
  properties: {
    fontFamily: { type: 'string' },
    fontSize: { type: 'number' },
    fontSizeScale: { type: 'number' },
    lineHeight: { type: 'number' },
  },
};

// fontFamily:
//   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
// fontSize: 16,
// fontSizeScale: 0.75,
// lineHeight: 24,
// style="flex-grow:1;flex-shrink:1"

// type EditorMenuSectionTypographyProps = {
//   web: Web,
// };

// web: { theme: { typography } },
const EditorMenuSectionTypography = () => (
  <EditorMenuSection>
    <EditorMenuButton back section="theme" />
    <Box flexDirection="row">
      <EditorMenuInput name="fontSize" value="16" />
      {/* <EditorMenuText>;</EditorMenuText>
      <EditorMenuText>fontSizeScale: </EditorMenuText>
      <EditorMenuTextInput defaultValue="0.75" />
      <EditorMenuText>;</EditorMenuText>
      <EditorMenuText>fontSizeScale: </EditorMenuText>
      <EditorMenuTextInput defaultValue="0.75" />
      <EditorMenuText>;</EditorMenuText>
      <EditorMenuText>fontSizeScale: </EditorMenuText>
      <EditorMenuTextInput defaultValue="0.75" />
      <EditorMenuText>;</EditorMenuText> */}
    </Box>
    {/* <Text backgroundColor="black">
      fontSize: 16; fontSizeScale: 0.75; lineHeight: 24; fontFamily:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, sans-serif;
    </Text> */}
    {/* <EditorMenuButton>fontSize</EditorMenuButton>
    {typography.fontSize}
    <EditorMenuButton>fontSizeScale</EditorMenuButton>
    {typography.fontSizeScale}
    <EditorMenuButton>lineHeight</EditorMenuButton>
    {typography.lineHeight}
    <EditorMenuButton>fontFamily</EditorMenuButton>
    {typography.fontFamily} */}
  </EditorMenuSection>
);

export default EditorMenuSectionTypography;
