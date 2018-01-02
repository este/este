// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuText } from './EditorMenu';
import * as Draft from 'draft-js';
import { validate } from './jsonSchema';
import * as RovingTabIndex from '../RovingTabIndex';

type EditorMenuInputProps = {|
  name: string,
  value: string,
  schema: Object,
  last: boolean,
|};

type EditorMenuInputState = {|
  editorState: Draft.EditorState,
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

  // Enforce single line editor.
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
    this.state = { editorState };
  }

  getValue() {
    const value = this.state.editorState.getCurrentContent().getPlainText();
    const { type } = this.props.schema;
    if (type === 'number' || type === 'integer') return Number(value);
    return value;
  }

  editor: *;

  focusToEnd() {
    if (!this.editor) return;
    const editorState = Draft.EditorState.moveFocusToEnd(
      this.state.editorState,
    );
    this.setState({ editorState });
  }

  handleLabelClick = () => {
    this.focusToEnd();
  };

  handleEditorChange = (editorState: Draft.EditorState) => {
    this.setState({ editorState });
  };

  handleEditorRef = (ref: *) => {
    this.editor = ref;
  };

  isValid() {
    const value = this.getValue();
    return validate(this.props.schema, value);
  }

  render() {
    return (
      <Box flexDirection="row">
        <EditorMenuText
          color={this.isValid() ? 'white' : 'warning'}
          onClick={this.handleLabelClick}
        >
          {this.props.name}:{' '}
        </EditorMenuText>
        <EditorMenuText>
          <div>
            {/* min-width: 1px; ensures caret visibility for empty text */}
            <style jsx>{`
              div :global(.public-DraftEditor-content) {
                min-width: 1px;
              }
            `}</style>
            <RovingTabIndex.Consumer
              // onFocus={this.jooTohleJeVono}
              render={(tabIndex, onFocus, onKeyDown) => (
                <Draft.Editor
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  stripPastedStyles={true}
                  tabIndex={tabIndex}
                  editorKey={this.props.name} // SSR
                  editorState={this.state.editorState}
                  onChange={this.handleEditorChange}
                  handleReturn={EditorMenuInput.handleReturn}
                  ref={this.handleEditorRef}
                  onFocus={onFocus}
                  onUpArrow={onKeyDown}
                  onDownArrow={onKeyDown}
                  onLeftArrow={e => {
                    if (this.state.editorState.isSelectionAtStartOfContent()) {
                      onKeyDown(e);
                    }
                  }}
                  onRightArrow={e => {
                    if (this.state.editorState.isSelectionAtEndOfContent()) {
                      onKeyDown(e);
                    }
                  }}
                />
              )}
            />
          </div>
        </EditorMenuText>
        {!this.props.last && <EditorMenuText>, </EditorMenuText>}
      </Box>
    );
  }
}

export default EditorMenuInput;
