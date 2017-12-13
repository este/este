// @flow
import * as React from 'react';
import { Section, EditorMenuButton } from './EditorMenu';

const EditorMenuSectionElement = () => (
  <Section>
    <EditorMenuButton>style</EditorMenuButton>
    <EditorMenuButton>clone</EditorMenuButton>
  </Section>
);

export default EditorMenuSectionElement;
