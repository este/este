// @flow
import * as React from 'react';
import EditorMenuSection from './EditorMenuSection';
import EditorMenuButton from './EditorMenuButton';

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
