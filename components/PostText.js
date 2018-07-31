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
import isURL from 'validator/lib/isURL';
import hotKey from '../browser/hotKey';

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
type BlockNode = ParagraphNode | HeadingOneNode | HeadingTwoNode;
export type BlockNodeType = $ElementType<BlockNode, 'type'>;

type BoldMark = { type: 'bold' };
type ItalicMark = { type: 'italic' };
type Mark = BoldMark | ItalicMark;
export type MarkType = $ElementType<Mark, 'type'>;

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

  // TODO: Merge handleEditorKeyDown and handlePostTextActionsAction somehow.

  handleEditorKeyDown = (event: KeyboardEvent) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    const { value } = this.state;
    const { mod, alt, key, code } = hotKey(event);
    if (mod && key === 'b') {
      editor.change(toggleMark('bold'));
    } else if (mod && key === 'i') {
      editor.change(toggleMark('italic'));
    } else if (mod && alt && code === 49) {
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
      <View>
        <Editor
          ref={this.editorRef}
          // autoFocus
          value={this.state.value}
          onChange={this.handleEditorChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          placeholder={this.props.intl.formatMessage(messages.placeholder)}
          schema={schema}
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
