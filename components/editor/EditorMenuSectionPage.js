// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

class EditorMenuSectionPage extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton>title</EditorMenuButton>
        <EditorMenuButton>publish</EditorMenuButton>
        <EditorMenuButton section="add">add</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionPage;
