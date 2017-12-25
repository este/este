// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuText } from './EditorMenu';
import * as Draft from 'draft-js';
import { dataCaretEdge, type CaretEdge } from '../../lib/maybeMoveFocus';

type EditorMenuInputProps = {|
  name: string,
  value: string,
|};

type EditorMenuInputState = {|
  editorState: Draft.EditorState,
  caretEdge: CaretEdge,
|};

class EditorMenuInput extends React.Component<
  EditorMenuInputProps,
  EditorMenuInputState,
> {
  static createContentState(name: string, value: string) {
    return Draft.convertFromRaw({
      entityMap: {},
      blocks: [
        {
          text: value,
          key: name,
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
    });
  }

  static getCaretEdge(selection: Draft.SelectionState, valueLength: number) {
    if (selection.isCollapsed()) {
      const offset = selection.getFocusOffset();
      if (offset === 0) return 'left';
      if (offset === valueLength) return 'right';
    }
    return 'none';
  }

  constructor(props: EditorMenuInputProps) {
    super(props);
    // https://github.com/facebook/draft-js/issues/1199#issuecomment-331677160
    const contentState = EditorMenuInput.createContentState(
      this.props.name,
      this.props.value,
    );
    const editorState = Draft.EditorState.createWithContent(contentState);
    const caretEdge = this.getCaretEdge(editorState);
    this.state = { editorState, caretEdge };
  }

  onChange = (editorState: Draft.EditorState) => {
    const caretEdge = this.getCaretEdge(editorState);
    this.setState({ editorState, caretEdge });
  };

  getCaretEdge(editorState) {
    return EditorMenuInput.getCaretEdge(
      editorState.getSelection(),
      this.props.value.length,
    );
  }

  render() {
    return (
      <Box flexDirection="row">
        <EditorMenuText>{this.props.name}: </EditorMenuText>
        <EditorMenuText {...{ [dataCaretEdge]: this.state.caretEdge }}>
          <Draft.Editor
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            stripPastedStyles={true}
            tabIndex={-1}
            editorKey={this.props.name} // SSR
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </EditorMenuText>
      </Box>
    );
  }
}

export default EditorMenuInput;
