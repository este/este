// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuText } from './EditorMenu';
import * as Draft from 'draft-js';
import { dataCaretEdgeAttr, type CaretEdge } from '../../lib/maybeMoveFocus';
import { validate } from './jsonSchema';

type EditorMenuInputProps = {|
  name: string,
  value: string,
  schema: Object,
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

  static getCaretEdge(editorState: Draft.EditorState): CaretEdge {
    const start = editorState.isSelectionAtStartOfContent();
    const end = editorState.isSelectionAtEndOfContent();
    if (start && end) return 'both';
    if (start) return 'start';
    if (end) return 'end';
    return 'none';
  }

  // Enforce editor is single line.
  // Stop new lines being inserted by always handling the return.
  static handleReturn() {
    return 'handled';
  }

  constructor(props: EditorMenuInputProps) {
    super(props);
    // https://github.com/facebook/draft-js/issues/1199#issuecomment-331677160
    const contentState = EditorMenuInput.createContentState(
      this.props.name,
      this.props.value,
    );
    const editorState = Draft.EditorState.createWithContent(contentState);
    const caretEdge = EditorMenuInput.getCaretEdge(editorState);
    this.state = { editorState, caretEdge };
  }

  getValue() {
    const value = this.state.editorState.getCurrentContent().getPlainText();
    const { type } = this.props.schema;
    if (type === 'number' || type === 'integer') return Number(value);
    return value;
  }

  editor: *;

  handleLabelClick = () => {
    if (this.editor) this.editor.focus();
  };

  handleEditorChange = (editorState: Draft.EditorState) => {
    const caretEdge = EditorMenuInput.getCaretEdge(editorState);
    this.setState({ editorState, caretEdge });
  };

  handleEditorRef = (ref: *) => {
    this.editor = ref;
  };

  isValid() {
    const value = this.getValue();
    return validate(this.props.schema, value);
  }

  render() {
    // https://github.com/zeit/styled-jsx/issues/329
    const caretEdgeProps = { [dataCaretEdgeAttr]: this.state.caretEdge };
    const isValid = this.isValid();

    return (
      <Box flexDirection="row">
        <EditorMenuText
          color={isValid ? 'white' : 'warning'}
          onClick={this.handleLabelClick}
        >
          {this.props.name}:{' '}
        </EditorMenuText>
        <EditorMenuText>
          <div {...caretEdgeProps}>
            <style jsx>{`
              div :global(.public-DraftEditor-content) {
                min-width: 1px;
              }
            `}</style>
            <Draft.Editor
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              stripPastedStyles={true}
              tabIndex={-1}
              editorKey={this.props.name} // SSR
              editorState={this.state.editorState}
              onChange={this.handleEditorChange}
              handleReturn={EditorMenuInput.handleReturn}
              ref={this.handleEditorRef}
            />
          </div>
        </EditorMenuText>
        <EditorMenuText>; </EditorMenuText>
      </Box>
    );
  }
}

export default EditorMenuInput;
