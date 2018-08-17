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

export type BlockNodeType =
  | 'paragraph'
  | 'headingOne'
  | 'headingTwo'
  | 'blockquote'
  | 'list';

export type MarkType = 'bold' | 'italic';

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
        this.toggleMark('bold', change);
        return;
      case 'i':
        this.toggleMark('italic', change);
        return;
      case 'k': {
        const { current: editorMenu } = this.editorMenuRef;
        if (editorMenu == null) return;
        editorMenu.handleKeyModK(change);
        return;
      }
    }

    if (!alt) return;
    const onlyInlines = value.startBlock.type === 'listItem';
    if (onlyInlines) return;
    switch (code) {
      case 49:
        this.toggleBlocks('headingOne', change);
        break;
      case 50:
        this.toggleBlocks('headingTwo', change);
        break;
    }
  };

  handleEditorMenuAction = (action: EditorMenuAction) => {
    switch (action.type) {
      case 'BOLD':
        this.toggleMark('bold');
        break;
      case 'ITALIC':
        this.toggleMark('italic');
        break;
      case 'LINK':
        this.toggleLinks(action.href, action.change);
        break;
      case 'HEADING-ONE':
        this.toggleBlocks('headingOne');
        break;
      case 'HEADING-TWO':
        this.toggleBlocks('headingTwo');
        break;
      case 'BLOCKQUOTE':
        this.toggleBlocks('blockquote');
        break;
      case 'FOCUS': {
        const { current: editor } = this.editorRef;
        if (editor) editor.focus();
        break;
      }
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
  };

  change(callback: (change: Object) => void, change: ?Object) {
    // For Editor onKeyDown, passed change object has to be used.
    if (change) {
      callback(change);
      return;
    }
    const { current: editor } = this.editorRef;
    if (!editor) return;
    editor.change(change => {
      callback(change);
    });
  }

  toggleMark(mark: MarkType, change: ?Object) {
    this.change(change => {
      change.toggleMark(mark);
    }, change);
  }

  toggleLinks(href, change) {
    this.change(change => {
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
    }, change);
  }

  toggleBlocks(type: BlockNodeType, change: ?Object) {
    const { value } = this.state;
    this.change(change => {
      const isActive = value.blocks.some(node => node.type === type);
      change.setBlocks(isActive ? 'paragraph' : type);
    }, change);
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
