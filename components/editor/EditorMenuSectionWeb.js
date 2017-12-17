// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';
import type { EditorDispatch } from './Editor';

type Props = {
  dispatch: EditorDispatch,
};

const EditorMenuSectionWeb = ({ dispatch }: Props) => (
  <EditorMenuSection>
    <EditorMenuButton
      onPress={() => dispatch({ type: 'SET_ACTIVE_SECTION', section: 'theme' })}
    >
      theme
    </EditorMenuButton>
    <EditorMenuButton>pages</EditorMenuButton>
  </EditorMenuSection>
);

export default EditorMenuSectionWeb;
