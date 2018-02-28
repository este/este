// @flow
import * as React from 'react';
import EditorMenuSection from './EditorMenuSection';
import EditorMenuButton from './EditorMenuButton';
import type { Path, EditorDispatch } from './Editor';

type EditorMenuSectionElementProps = {|
  activePath: Path,
  dispatch: EditorDispatch,
|};

class EditorMenuSectionElement extends React.PureComponent<
  EditorMenuSectionElementProps,
> {
  handleDeletePress = () => {
    this.props.dispatch({ type: 'DELETE_PATH', path: this.props.activePath });
  };

  render() {
    return (
      <EditorMenuSection>
        {/* <EditorMenuButton>style</EditorMenuButton> */}
        {/* <EditorMenuButton>clone</EditorMenuButton> */}
        {/* <EditorMenuButton>unwrap?</EditorMenuButton> */}
        <EditorMenuButton onPress={this.handleDeletePress}>
          delete
        </EditorMenuButton>
        <EditorMenuButton section="add">add</EditorMenuButton>
        <EditorMenuButton>style</EditorMenuButton>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionElement;
