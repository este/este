// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

class EditorMenuSectionPage extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton>title</EditorMenuButton>
        <EditorMenuButton>publish</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionPage;
