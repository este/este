// @flow
import * as React from 'react';
import EditorMenuSection from './EditorMenuSection';
import EditorMenuButton from './EditorMenuButton';

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
