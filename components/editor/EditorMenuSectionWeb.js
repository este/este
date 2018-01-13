// @flow
import * as React from 'react';
import EditorMenuSection from './EditorMenuSection';
import EditorMenuButton from './EditorMenuButton';

class EditorMenuSectionWeb extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection>
        <EditorMenuButton section="theme">theme</EditorMenuButton>
        <EditorMenuButton>pages</EditorMenuButton>
        {/* History timeline with quick review, jump, etc. */}
        {/* <EditorMenuButton>history</EditorMenuButton> */}
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionWeb;
