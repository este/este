// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuText } from './EditorMenu';
import * as Draft from 'draft-js';
import { validate } from './jsonSchema';
import * as RovingTabIndex from '../RovingTabIndex';
import Big from 'big.js';
import * as R from 'ramda';

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
      <EditorMenuText color={isValid ? 'gray' : 'warning'} onClick={onClick}>
        {name}:{' '}
      </EditorMenuText>
    );
  }
}

type Value = string | number;

type EditorMenuInputProps = {|
  name: string,
  value: Value,
  schema: Object,
  last: boolean,
  onChange: (value: Value, name: string) => void,
|};

type EditorMenuInputState = {|
  editorState: Draft.EditorState,
|};

type Delay = 0 | 500;

class EditorMenuInput extends React.PureComponent<
  EditorMenuInputProps,
  EditorMenuInputState,
> {
  // https://github.com/facebook/draft-js/issues/1199#issuecomment-331677160
  static createContentState(name: string, value: Value) {
    return Draft.convertFromRaw({
      entityMap: {},
      blocks: [
        {
          text: value.toString(),
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

  static keyBindingFn = (event: SyntheticKeyboardEvent<*>) => {
    if (Draft.KeyBindingUtil.hasCommandModifier(event)) {
      // For some reason, draft.js bubbles cmd y (redo) which is opening browser
      // history tab. Custom binding can stop event propagation.
      switch (event.key) {
        case 'y':
          return 'myeditor-redo';
      }
    }
    return Draft.getDefaultKeyBinding(event);
  };

  constructor(props: EditorMenuInputProps) {
    super(props);
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

  changeTimeoutID: ?TimeoutID;

  dispatchChange(delay: Delay) {
    if (this.changeTimeoutID) clearTimeout(this.changeTimeoutID);
    this.changeTimeoutID = setTimeout(() => {
      if (!this.isValid()) return;
      const value = this.getValue();
      if (value === this.props.value) return;
      this.props.onChange(value, this.props.name);
    }, delay);
  }

  // Delay it's good for UX. We don't want to update UI for any key stroke.
  handleEditorChange = (editorState: Draft.EditorState, delay: Delay = 500) => {
    this.dispatchChange(delay);
    this.setState({ editorState });
  };

  handleEditorRef = (ref: *) => {
    this.editor = ref;
  };

  handleRovingTabIndexFocus = (focusToEnd: boolean) => {
    this.focus(focusToEnd);
  };

  handleKeyCommand = (command: string) => {
    if (command === 'myeditor-redo') {
      // For some reason, it must be handled manually. Check keyBindingFn.
      this.handleEditorChange(Draft.EditorState.redo(this.state.editorState));
      return 'handled';
    }
    return 'not-handled';
  };

  handleKeyArrow = (onKeyDown: *) => (event: *) => {
    const { editorState } = this.state;
    const isHorizontal =
      event.key === 'ArrowLeft' || event.key === 'ArrowRight';

    if (isHorizontal) {
      const atEnd =
        event.key === 'ArrowLeft'
          ? editorState.isSelectionAtStartOfContent()
          : editorState.isSelectionAtEndOfContent();
      if (atEnd) onKeyDown(event);
      return;
    }

    if (event.shiftKey) return;

    // Handiness. Vertical key with command for number inc / dec.
    if (Draft.KeyBindingUtil.hasCommandModifier(event)) {
      event.preventDefault();
      const numberRegEx = /[.0-9]+/;
      const text = editorState.getCurrentContent().getPlainText();
      const match = text.match(numberRegEx);
      if (!match) return;
      // Could be refactored but I have more interesting things to do.
      const value = Number(match[0]);
      const isUp = event.key === 'ArrowUp';
      let newValue;
      const { examples } = this.props.schema;
      if (examples) {
        const index = examples.indexOf(value);
        if (index !== -1) {
          const newIndex = index + (isUp ? 1 : -1);
          newValue = examples[R.clamp(0, examples.length - 1, newIndex)];
        } else {
          // eslint-disable-next-line prefer-destructuring
          newValue = examples[0];
        }
      } else {
        const step = this.props.schema.multipleOfPrecision || 1;
        const newStep = isUp ? step : -step;
        const bigValue = Number(new Big(value).plus(newStep).toString());
        newValue = Math.max(0, bigValue).toString();
      }
      const newText = text.replace(numberRegEx, newValue);
      const contentState = Draft.ContentState.createFromText(newText);
      // This works well, except it does not maintain caret position.
      // But undo/redo works, so it's good enough.
      const nextEditorState = Draft.EditorState.push(
        editorState,
        contentState,
        'apply-entity',
      );
      this.handleEditorChange(nextEditorState, 0);
      return;
    }
    onKeyDown(event);
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
                  keyBindingFn={EditorMenuInput.keyBindingFn}
                  handleKeyCommand={this.handleKeyCommand}
                  onUpArrow={this.handleKeyArrow(onKeyDown)}
                  onDownArrow={this.handleKeyArrow(onKeyDown)}
                  onLeftArrow={this.handleKeyArrow(onKeyDown)}
                  onRightArrow={this.handleKeyArrow(onKeyDown)}
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
