// @flow
/* eslint-env browser */
import * as React from 'react';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import throttle from 'lodash/throttle';
import { onChangeTextThrottle } from './core/TextInput';
import withMutation from './core/withMutation';
import withStore, { type Store } from './core/withStore';
import { pipe } from 'ramda';
import SetPostTextMutation, {
  type SetPostTextCommit,
} from '../mutations/SetPostTextMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostText.graphql';
import { Editor } from 'slate-react';
import { Value, KeyUtils } from 'slate';
import Block from './core/Block';
import Text from './core/Text';
import { View, findNodeHandle } from 'react-native';
import PostTextActions, { type PostTextAction } from './PostTextActions';
import isURL from 'validator/lib/isURL';
import { isKeyHotkey } from 'is-hotkey';

export const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'postText.textInput.placeholder',
  },
});

type ParagraphNode = { type: 'paragraph' };
type ImageNode = { type: 'image' };
type HeadingOneNode = { type: 'headingOne' };
type HeadingTwoNode = { type: 'headingTwo' };
type BlockNodes = ParagraphNode | HeadingOneNode | HeadingTwoNode;
type BlockNodeType = $ElementType<BlockNodes, 'type'>;

type BoldMark = { type: 'bold' };
type ItalicMark = { type: 'italic' };
export type Mark = BoldMark | ItalicMark;
type MarkType = $ElementType<Mark, 'type'>;

type Schema = {
  document: {|
    nodes: [
      { match: [ParagraphNode, ImageNode, HeadingOneNode, HeadingTwoNode] },
    ],
  |},
  blocks: Object,
  marks: [BoldMark, ItalicMark],
};

const schema: Schema = {
  document: {
    nodes: [
      {
        match: [
          { type: 'paragraph' },
          { type: 'image' },
          { type: 'headingOne' },
          { type: 'headingTwo' },
        ],
      },
    ],
  },
  blocks: {
    paragraph: { nodes: [{ match: { object: 'text' } }] },
    headingOne: { nodes: [{ match: { object: 'text' } }] },
    headingTwo: { nodes: [{ match: { object: 'text' } }] },
    paragraph: { nodes: [{ match: { object: 'text' } }] },
    image: { isVoid: true, data: { src: url => url && isURL(url) } },
  },
  marks: [{ type: 'bold' }, { type: 'italic' }],
};

const emptyText = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
};

const collapseToStartWithFocus = change => {
  change.collapseToStart().focus();
};

const toggleMark = (mark: MarkType) => change => {
  change.toggleMark(mark);
};

const DEFAULT_NODE = 'paragraph';

const toggleBlocks = (blocks, type: BlockNodeType) => change => {
  const isActive = blocks.some(node => node.type == type);
  change.setBlocks(isActive ? DEFAULT_NODE : type);
};

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');

type PostTextProps = {|
  data: generated.PostText,
  intl: IntlShape,
  commit: SetPostTextCommit,
  store: Store,
  disabled?: boolean,
|};

type PostTextState = {|
  value: Object,
  menuPosition: ?[number, number],
|};

class PostText extends React.PureComponent<PostTextProps, PostTextState> {
  throttleCommit = throttle(text => {
    const input = {
      id: this.props.data.id,
      text,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  viewRef = React.createRef();
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    const { text } = this.props.data;
    const json = text == null ? emptyText : JSON.parse(text);
    // Resets Slate's internal key generating function to its default state.
    // This is useful for server-side rendering.
    KeyUtils.resetGenerator();
    const value = Value.fromJSON(json);
    this.state = { value, menuPosition: null };
  }

  updateMenuPosition() {
    this.setState(state => {
      const menuPosition = this.getMenuPosition(state.value);
      // Tab key blurs, but we still need the last menuPosition.
      if (!menuPosition) return;
      return { menuPosition };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      // setState in componentDidUpdate is valid for tooltips.
      // https://reactjs.org/docs/react-component.html#componentdidmount
      this.updateMenuPosition();
    }
  }

  getMenuPosition(value) {
    // isBlurred is must, otherwise getSelectionRect will fail.
    // isCollapsed is used instead of isEmpty as temp workaround.
    // https://github.com/ianstormtaylor/slate/issues/2004
    const hideMenu = value.isBlurred || value.isCollapsed;
    if (hideMenu) return null;
    const { current } = this.viewRef;
    if (!current) return null;
    const node = findNodeHandle(current);
    if (
      node == null ||
      typeof node === 'number' ||
      typeof node.getBoundingClientRect !== 'function'
    ) {
      return null;
    }
    const viewRect = node.getBoundingClientRect();
    const selectionRect = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    const left = selectionRect.left - viewRect.left;
    const top = selectionRect.bottom - viewRect.top;
    return [left, top];
  }

  // handleEditorFocus = (event, change) => {
  //   // https://github.com/ianstormtaylor/slate/issues/1989
  //   change.focus();
  // };

  handleEditorChange = ({ value }) => {
    this.setState({ value });
    if (value.document !== this.state.value.document) {
      const text = JSON.stringify(value.toJSON());
      this.throttleCommit(text);
    }
  };

  // TODO: Merge handleEditorKeyDown and handlePostTextActionsAction somehow,
  // if possible. But remember, duplication is cheaper than bad abstraction.

  handleEditorKeyDown = event => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    if (event.key === 'Escape') {
      editor.change(collapseToStartWithFocus);
      return;
    }
    if (isBoldHotkey(event)) {
      editor.change(toggleMark('bold'));
    } else if (isItalicHotkey(event)) {
      editor.change(toggleMark('italic'));
    }
  };

  handlePostTextActionsAction = (action: PostTextAction) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    const { value } = this.state;
    switch (action.type) {
      case 'ESCAPE':
        editor.change(collapseToStartWithFocus);
        break;
      case 'BOLD':
        editor.change(toggleMark('bold'));
        break;
      case 'ITALIC':
        editor.change(toggleMark('italic'));
        break;
      case 'HEADING-ONE':
        editor.change(toggleBlocks(value.blocks, 'headingOne'));
        break;
      case 'HEADING-TWO':
        editor.change(toggleBlocks(value.blocks, 'headingTwo'));
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
  };

  renderNode = props => {
    const { children, attributes, node } = props;
    const { type } = node;
    // TODO: Add default with Flow empty.
    switch (type) {
      case 'paragraph':
      case 'headingOne':
      case 'headingTwo': {
        const size = type === 'paragraph' ? 0 : type === 'headingTwo' ? 1 : 2;
        return (
          <Block>
            <Text size={size} {...attributes}>
              {children}
            </Text>
          </Block>
        );
      }
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;
    // TODO: Add default with Flow empty.
    switch (mark.type) {
      case 'bold':
        return (
          <Text bold {...attributes}>
            {children}
          </Text>
        );
      case 'italic':
        return (
          <Text italic {...attributes}>
            {children}
          </Text>
        );
    }
  };

  render() {
    return (
      <View ref={this.viewRef}>
        <Editor
          ref={this.editorRef}
          // autoFocus
          value={this.state.value}
          onChange={this.handleEditorChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          placeholder={this.props.intl.formatMessage(messages.placeholder)}
          schema={schema}
          // onFocus={this.handleEditorFocus}
          onKeyDown={this.handleEditorKeyDown}
        />
        <PostTextActions
          value={this.state.value}
          position={this.state.menuPosition}
          onAction={this.handlePostTextActionsAction}
        />
      </View>
    );
  }
}

export default createFragmentContainer(
  pipe(
    injectIntl,
    withStore,
    withMutation(SetPostTextMutation),
  )(PostText),
  graphql`
    fragment PostText on Post {
      id
      text
    }
  `,
);
