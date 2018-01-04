// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

class EditorMenuSectionWeb extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton section="theme">theme</EditorMenuButton>
        <EditorMenuButton>pages</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionWeb;
