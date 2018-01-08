// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuButton } from './EditorMenu';
import type { Web, Path } from './Editor';

type Props = {|
  web: Web,
  // path: Path,
|};

class EditorMenuSectionElement extends React.PureComponent<Props> {
  render() {
    // this.props.web;
    // this.props.path;
    // console.log(this.props.path);
    return (
      <EditorMenuSection>
        <EditorMenuButton>style</EditorMenuButton>
        {/* <EditorMenuButton>clone</EditorMenuButton> */}
        <EditorMenuButton>add</EditorMenuButton>
        <EditorMenuButton>delete</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionElement;
