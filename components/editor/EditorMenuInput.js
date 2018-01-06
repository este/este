// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuText } from './EditorMenu';
import * as Draft from 'draft-js';
import { validate } from './jsonSchema';
import * as RovingTabIndex from '../RovingTabIndex';

// Note we don't update editor by prop value. I don't think we have to.
// Also, I don't know how to update editor state without losing caret position.
// TODO: Investigate whether it's safe.

// from draft.js keyCommandMoveSelectionToEndOfBlock
const moveSelectionToEndOfBlock = (
  editorState: Draft.EditorState,
): Draft.EditorState => {
  const selection = editorState.getSelection();
  const endKey = selection.getEndKey();
  const content = editorState.getCurrentContent();
  const textLength = content.getBlockForKey(endKey).getLength();
  return Draft.EditorState.set(editorState, {
    selection: selection.merge({
      anchorKey: endKey,
      anchorOffset: textLength,
      focusKey: endKey,
      focusOffset: textLength,
      isBackward: false,
    }),
    forceSelection: true,
  });
};

// from draft.js keyCommandMoveSelectionToStartOfBlock
const moveSelectionToStartOfBlock = (
  editorState: Draft.EditorState,
): Draft.EditorState => {
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  return Draft.EditorState.set(editorState, {
    selection: selection.merge({
      anchorKey: startKey,
      anchorOffset: 0,
      focusKey: startKey,
      focusOffset: 0,
      isBackward: false,
    }),
    forceSelection: true,
  });
};

type LabelProps = {
  isValid: *,
  onClick: *,
  name: *,
};

class Label extends React.PureComponent<LabelProps> {
  render() {
    const { isValid, onClick, name } = this.props;
    return (
      <EditorMenuText color={isValid ? 'white' : 'warning'} onClick={onClick}>
        {name}:{' '}
      </EditorMenuText>
    );
  }
}

type EditorMenuInputProps = {|
  name: string,
  value: string,
  schema: Object,
  last: boolean,
  onChange: (value: string, name: string) => void,
|};

type EditorMenuInputState = {|
  editorState: Draft.EditorState,
|};

class EditorMenuInput extends React.PureComponent<
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

  focus(focusToEnd: boolean) {
    if (!this.editor) return;
    this.editor.focus();
    const moveSelection = focusToEnd
      ? moveSelectionToEndOfBlock
      : moveSelectionToStartOfBlock;
    this.setState(({ editorState }) => ({
      editorState: moveSelection(editorState),
    }));
  }

  isValid() {
    const value = this.getValue();
    return validate(this.props.schema, value);
  }

  handleLabelClick = () => {
    this.focus(true);
  };

  delayedChangeTimer: number;

  dispatchChange() {
    // Delay it's good for UX. We don't want to update UI for any key stroke.
    const delay = 500;
    clearTimeout(this.delayedChangeTimer);
    this.delayedChangeTimer = setTimeout(() => {
      if (!this.isValid()) return;
      const value = this.state.editorState.getCurrentContent().getPlainText();
      if (value === this.props.value) return;
      this.props.onChange(value, this.props.name);
    }, delay);
  }

  handleEditorChange = (editorState: Draft.EditorState) => {
    this.dispatchChange();
    this.setState({ editorState });
  };

  handleEditorRef = (ref: *) => {
    this.editor = ref;
  };

  handleRovingTabIndexFocus = (focusToEnd: boolean) => {
    this.focus(focusToEnd);
  };

  render() {
    const { editorState } = this.state;

    return (
      <Box flexDirection="row">
        <Label
          name={this.props.name}
          isValid={this.isValid()}
          onClick={this.handleLabelClick}
        />
        <EditorMenuText>
          <div>
            {/* min-width: 1px; ensures caret visibility for empty text */}
            <style jsx>{`
              div :global(.public-DraftEditor-content) {
                min-width: 1px;
              }
            `}</style>
            <RovingTabIndex.Consumer onFocus={this.handleRovingTabIndexFocus}>
              {(tabIndex, onFocus, onKeyDown) => (
                <Draft.Editor
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  stripPastedStyles={true}
                  tabIndex={tabIndex}
                  editorKey={this.props.name} // SSR
                  editorState={editorState}
                  onChange={this.handleEditorChange}
                  handleReturn={EditorMenuInput.handleReturn}
                  ref={this.handleEditorRef}
                  onFocus={onFocus}
                  onUpArrow={e => {
                    if (e.shiftKey) return;
                    onKeyDown(e);
                  }}
                  onDownArrow={e => {
                    if (e.shiftKey) return;
                    onKeyDown(e);
                  }}
                  onLeftArrow={e => {
                    if (!editorState.isSelectionAtStartOfContent()) return;
                    onKeyDown(e);
                  }}
                  onRightArrow={e => {
                    if (!editorState.isSelectionAtEndOfContent()) return;
                    onKeyDown(e);
                  }}
                />
              )}
            </RovingTabIndex.Consumer>
          </div>
        </EditorMenuText>
        {!this.props.last && <EditorMenuText>, </EditorMenuText>}
      </Box>
    );
  }
}

export default EditorMenuInput;
