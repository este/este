// @flow
import * as React from 'react';
import * as generated from './__generated__/Editor.graphql';
import Head from 'next/head';
import EditMainNav from './EditMainNav';
import PageTitle from './PageTitle';
import throttle from 'lodash/throttle';
import { onChangeTextThrottle } from './core/TextInput';
import withMutation from './core/withMutation';
import withStore, { type Store } from './core/withStore';
import { pipe } from 'ramda';
import SetPageContentMutation, {
  type SetPageContentCommit,
} from '../mutations/SetPageContentMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import { Editor as SlateEditor } from 'slate-react';
import { Value, KeyUtils } from 'slate';
import Block from './core/Block';
import Text from './core/Text';
import EditorMenu, {
  type EditorMenuAction,
  type EditorMenuType,
} from './EditorMenu';
import hotKey from '../browser/hotKey';
import withTheme, { type Theme } from './core/withTheme';
import A from './core/A';
import { parse } from 'url';

// TODO: Refactor types, maybe remove them entirely.
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

// TODO: Update schema for current specification.
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
//   marks: [{ type: 'bold' }, { type: 'italic' }, { type: 'link' }],
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

type EditorProps = {|
  theme: Theme,
  data: generated.Editor,
  commit: SetPageContentCommit,
  store: Store,
  disabled?: boolean,
  theme: Theme,
|};

type EditorState = {|
  value: Object,
|};

class Editor extends React.PureComponent<EditorProps, EditorState> {
  static toggleMark(editor, mark: MarkType) {
    editor.change(change => {
      change.toggleMark(mark);
    });
  }

  static toggleLinks(editor, href) {
    editor.change(change => {
      if (href != null) {
        const parsed = parse(href);
        const addProtocol = !parsed.protocol && !!parsed.pathname;
        const protocol = addProtocol ? 'https://' : '';
        change
          .wrapInline({ type: 'link', data: { href: `${protocol}${href}` } })
          .moveToEnd()
          .focus();
      } else {
        change
          .unwrapInline('link')
          .moveToEnd()
          .focus();
      }
    });
  }

  throttleCommit = throttle(content => {
    const { page } = this.props.data;
    if (page == null) return;
    const input = {
      id: page.id,
      content,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  editorRef = React.createRef();
  editorMenuRef: {
    current: null | React.ElementRef<EditorMenuType>,
  } = React.createRef();

  constructor(props: EditorProps) {
    super(props);
    const { page } = this.props.data;
    const content = page && page.content;
    const json = content != null ? JSON.parse(content) : emptyText;
    // console.log(json);
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
  handleKeyEnter = (event, change) => {
    const { value } = change;
    const { selection } = value;
    const { start, end, isExpanded } = selection;
    if (isExpanded) return;

    const { startBlock } = value;
    const caretOnEmptyText = start.offset === 0 && startBlock.text.length === 0;
    if (caretOnEmptyText) return this.handleKeyBackspace(event, change);
    const caretInsideBlockText = end.offset !== startBlock.text.length;
    if (caretInsideBlockText) return;

    const putParagraphAfter =
      startBlock.type === 'headingOne' ||
      startBlock.type === 'headingTwo' ||
      startBlock.type === 'blockquote';
    if (putParagraphAfter) {
      event.preventDefault();
      change.splitBlock().setBlocks('paragraph');
      // return true to prevent default behavior
      return true;
    }
  };

  handleEditorKeyDown = (event: KeyboardEvent, change) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    const { value } = this.state;
    const { mod, alt, key, code } = hotKey(event);

    switch (key) {
      case ' ':
        return this.handleKeySpace(event, change);
      case 'Backspace':
        return this.handleKeyBackspace(event, change);
      case 'Enter':
        return this.handleKeyEnter(event, change);
    }

    if (!mod) return;
    switch (key) {
      case 'b':
        Editor.toggleMark(editor, 'bold');
        return;
      case 'i':
        Editor.toggleMark(editor, 'italic');
        return;
      case 'k': {
        const { current: editorMenu } = this.editorMenuRef;
        if (editorMenu == null) return;
        editorMenu.handleKeyModK();
        return;
      }
    }

    if (!alt) return;
    const onlyInlines = value.startBlock.type === 'listItem';
    if (onlyInlines) return;
    switch (code) {
      case 49:
        this.toggleBlocks(editor, 'headingOne');
        break;
      case 50:
        this.toggleBlocks(editor, 'headingTwo');
        break;
    }
  };

  handleEditorMenuAction = (action: EditorMenuAction) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    switch (action.type) {
      case 'BOLD':
        Editor.toggleMark(editor, 'bold');
        break;
      case 'ITALIC':
        Editor.toggleMark(editor, 'italic');
        break;
      case 'LINK':
        Editor.toggleLinks(editor, action.href);
        break;
      case 'HEADING-ONE':
        this.toggleBlocks(editor, 'headingOne');
        break;
      case 'HEADING-TWO':
        this.toggleBlocks(editor, 'headingTwo');
        break;
      case 'BLOCKQUOTE':
        this.toggleBlocks(editor, 'blockquote');
        break;
      case 'FOCUS':
        editor.focus();
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
  };

  toggleBlocks(editor, type: BlockNodeType) {
    const { value } = this.state;
    editor.change(change => {
      const isActive = value.blocks.some(node => node.type === type);
      change.setBlocks(isActive ? 'paragraph' : type);
    });
  }

  renderNode = props => {
    const { attributes, node, children } = props;
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
          <Block style={styles.editorBlockquote}>
            <Text color="gray" {...attributes}>
              {children}
            </Text>
          </Block>
        );
      }
      case 'list': {
        return <Block {...attributes}>{children}</Block>;
      }
      // Only bullet list for now.
      case 'listItem': {
        return (
          <Text {...attributes}>
            <Text style={styles.editorListItem} contentEditable={false}>
              •
            </Text>
            {children}
          </Text>
        );
      }
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <A {...attributes} href={href}>
            {children}
          </A>
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
    const { page } = this.props.data;
    if (page == null) return null;
    // https://github.com/relayjs/eslint-plugin-relay/issues/35
    // eslint-disable-next-line no-unused-expressions
    page.title;
    return (
      <>
        <Head>
          <title>{page.draftTitle}</title>
        </Head>
        {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
        <EditMainNav data={page.web} />
        {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
        <PageTitle data={page} />
        <SlateEditor
          ref={this.editorRef}
          autoFocus
          value={this.state.value}
          onChange={this.handleEditorChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          // schema={schema}
          onFocus={this.handleEditorFocus}
          onKeyDown={this.handleEditorKeyDown}
        />
        <EditorMenu
          // $FlowFixMe https://github.com/este/este/issues/1571
          ref={this.editorMenuRef}
          value={this.state.value}
          onAction={this.handleEditorMenuAction}
        />
      </>
    );
  }
}

export default createFragmentContainer(
  pipe(
    withTheme,
    withStore,
    withMutation(SetPageContentMutation),
  )(Editor),
  graphql`
    fragment Editor on Query @argumentDefinitions(id: { type: "ID!" }) {
      page(id: $id) {
        id
        title @__clientField(handle: "draft")
        draftTitle
        content
        web {
          ...EditMainNav
        }
        ...PageTitle
      }
    }
  `,
);
