// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

class EditorMenuSectionElement extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton>style</EditorMenuButton>
        <EditorMenuButton>clone</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionElement;
