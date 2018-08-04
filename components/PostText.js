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
import { View } from 'react-native';
import PostTextActions, { type PostTextAction } from './PostTextActions';
// import isURL from 'validator/lib/isURL';
import hotKey from '../browser/hotKey';
import withTheme, { type Theme } from './core/withTheme';

export const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'postText.textInput.placeholder',
  },
});

type ParagraphNode = { type: 'paragraph' };
// type ImageNode = { type: 'image' };
type HeadingOneNode = { type: 'headingOne' };
type HeadingTwoNode = { type: 'headingTwo' };
type BlockquoteNode = { type: 'blockquote' };
type ListNode = { type: 'list' };
type BlockNode =
  | ParagraphNode
  | HeadingOneNode
  | HeadingTwoNode
  | BlockquoteNode
  | ListNode;
export type BlockNodeType = $ElementType<BlockNode, 'type'>;

type BoldMark = { type: 'bold' };
type ItalicMark = { type: 'italic' };
type Mark = BoldMark | ItalicMark;
export type MarkType = $ElementType<Mark, 'type'>;

// type Schema = {
//   document: {|
//     nodes: [
//       {
//         match: [
//           ParagraphNode,
//           HeadingOneNode,
//           HeadingTwoNode,
//           BlockquoteNode,
//           ListNode,
//           ImageNode,
//         ],
//       },
//     ],
//   |},
//   blocks: Object,
//   marks: [BoldMark, ItalicMark],
// };

// const schema: Schema = {
//   document: {
//     nodes: [
//       {
//         match: [
//           { type: 'paragraph' },
//           { type: 'headingOne' },
//           { type: 'headingTwo' },
//           { type: 'blockquote' },
//           { type: 'list' },
//           { type: 'image' },
//         ],
//       },
//     ],
//   },
//   blocks: {
//     paragraph: { nodes: [{ match: { object: 'text' } }] },
//     headingOne: { nodes: [{ match: { object: 'text' } }] },
//     headingTwo: { nodes: [{ match: { object: 'text' } }] },
//     blockquote: { nodes: [{ match: { object: 'text' } }] },
//     list: { nodes: [{ match: { object: 'text' } }] },
//     listtem: { nodes: [{ match: { object: 'text' } }] },
//     image: { isVoid: true, data: { src: url => url && isURL(url) } },
//   },
//   marks: [{ type: 'bold' }, { type: 'italic' }],
// };

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

const toggleMark = (mark: MarkType) => change => {
  change.toggleMark(mark);
};

const toggleBlocks = (blocks, type: BlockNodeType) => change => {
  const isActive = blocks.some(node => node.type === type);
  change.setBlocks(isActive ? 'paragraph' : type);
};

type PostTextProps = {|
  data: generated.PostText,
  intl: IntlShape,
  commit: SetPostTextCommit,
  store: Store,
  disabled?: boolean,
  theme: Theme,
|};

type PostTextState = {|
  value: Object,
|};

class PostText extends React.PureComponent<PostTextProps, PostTextState> {
  throttleCommit = throttle(text => {
    const input = {
      id: this.props.data.id,
      text,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  editorRef = React.createRef();

  constructor(props) {
    super(props);
    const { text } = this.props.data;
    const json = text == null ? emptyText : JSON.parse(text);
    // Resets Slate's internal key generating function to its default state.
    // This is useful for server-side rendering.
    KeyUtils.resetGenerator();
    const value = Value.fromJSON(json);
    this.state = { value };
  }

  handleEditorFocus = (event, change) => {
    // https://github.com/ianstormtaylor/slate/issues/1989
    change.focus();
  };

  handleEditorChange = ({ value }) => {
    this.setState({ value });
    const documentChanged = value.document !== this.state.value.document;
    if (documentChanged) {
      const text = JSON.stringify(value.toJSON());
      this.throttleCommit(text);
    }
  };

  // On space, if it was after an auto-markdown shortcut, convert the current
  // node into the shortcut's corresponding type.
  handleKeySpace = (event, change) => {
    const { value } = change;
    const { selection } = value;
    if (selection.isExpanded) return;

    const { startBlock } = value;
    const { start } = selection;

    const onlyInlines = startBlock.type === 'listItem';
    if (onlyInlines) return;
    const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '');

    // Get the block type for a series of auto-markdown shortcut `chars`.
    const type = {
      '-': 'listItem',
      '>': 'blockquote',
      '#': 'headingOne',
      '##': 'headingTwo',
    }[chars];

    if (!type) return;
    event.preventDefault();
    change.setBlocks(type);
    if (type === 'listItem') {
      change.wrapBlock('list');
    }
    change.moveFocusToStartOfNode(startBlock).delete();
    return true;
  };

  // On backspace, if at the start of a non-paragraph, convert it back into a
  // paragraph node.
  handleKeyBackspace = (event, change) => {
    const { value } = change;
    const { selection } = value;
    if (selection.isExpanded) return;
    if (selection.start.offset !== 0) return;

    const { startBlock } = value;
    if (startBlock.type === 'paragraph') return;

    event.preventDefault();
    change.setBlocks('paragraph');

    if (startBlock.type === 'listItem') {
      change.unwrapBlock('list');
    }

    return true;
  };

  // On return, if at the end of a node type that should not be extended,
  // create a new paragraph below it.
  hanleKeyEnter = (event, change) => {
    const { value } = change;
    const { selection } = value;
    const { start, end, isExpanded } = selection;
    if (isExpanded) return;

    const { startBlock } = value;
    if (start.offset === 0 && startBlock.text.length === 0)
      return this.handleKeyBackspace(event, change);
    if (end.offset !== startBlock.text.length) return;

    if (
      startBlock.type !== 'headingOne' &&
      startBlock.type !== 'headingTwo' &&
      startBlock.type !== 'blockquote'
    ) {
      return;
    }

    event.preventDefault();
    change.splitBlock().setBlocks('paragraph');
    return true;
  };

  // TODO: Merge handleEditorKeyDown and handlePostTextActionsAction somehow.

  handleEditorKeyDown = (event: KeyboardEvent, change) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    const { value } = this.state;
    switch (event.key) {
      case ' ':
        return this.handleKeySpace(event, change);
      case 'Backspace':
        return this.handleKeyBackspace(event, change);
      case 'Enter':
        return this.hanleKeyEnter(event, change);
    }
    const { mod, alt, key, code } = hotKey(event);
    if (mod && key === 'b') {
      editor.change(toggleMark('bold'));
    } else if (mod && key === 'i') {
      editor.change(toggleMark('italic'));
    }
    const onlyInlines = value.startBlock.type === 'listItem';
    if (onlyInlines) return;
    if (mod && alt && code === 49) {
      editor.change(toggleBlocks(value.blocks, 'headingOne'));
    } else if (mod && alt && code === 50) {
      editor.change(toggleBlocks(value.blocks, 'headingTwo'));
    }
  };

  handlePostTextActionsAction = (action: PostTextAction) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    const { value } = this.state;
    switch (action.type) {
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
      case 'BLOCKQUOTE':
        editor.change(toggleBlocks(value.blocks, 'blockquote'));
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
  };

  renderNode = props => {
    const { children, attributes, node } = props;
    const { styles } = this.props.theme;
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
      case 'blockquote': {
        return (
          <Block style={styles.postTextBlockquote}>
            <Text color="gray" {...attributes}>
              {children}
            </Text>
          </Block>
        );
      }
      case 'list': {
        return <Block {...attributes}>{children}</Block>;
      }
      // Only bullet list. We don't need numbers, they are superfluous.
      case 'listItem': {
        return (
          <Text {...attributes}>
            <Text style={styles.postTextListItem} contentEditable={false}>
              •
            </Text>
            {children}
          </Text>
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
      <View>
        <Editor
          ref={this.editorRef}
          // autoFocus
          value={this.state.value}
          onChange={this.handleEditorChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          placeholder={this.props.intl.formatMessage(messages.placeholder)}
          // TODO: Update schema for the last specification.
          // schema={schema}
          onFocus={this.handleEditorFocus}
          onKeyDown={this.handleEditorKeyDown}
        />
        <PostTextActions
          value={this.state.value}
          onAction={this.handlePostTextActionsAction}
        />
      </View>
    );
  }
}

export default createFragmentContainer(
  pipe(
    withTheme,
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
