// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';

class EditorMenuSectionTheme extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton autoFocus section="typography">
          typography
        </EditorMenuButton>
        <EditorMenuButton>colors</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionTheme;
