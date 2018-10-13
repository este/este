// @flow
import * as React from 'react';
import type { Editor as Data } from './__generated__/Editor.graphql';
import Head from 'next/head';
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
import EditorMenu, { type EditorMenuType } from './EditorMenu';
import hotKey from '../browser/hotKey';
import withTheme, { type Theme } from './core/withTheme';
import A from './core/A';
import { parse } from 'url';
import EditorBreadcrumb from './EditorBreadcrumb';
import { View } from 'react-native';

// Test data.
// const slateValue = {
//   object: 'value',
//   document: {
//     object: 'document',
//     data: { style: { backgroundColor: '#fafafa', flex: 1 } },
//     nodes: [
//       {
//         object: 'block',
//         type: 'view',
//         data: {
//           name: 'container',
//           style: {
//             maxWidth: 768,
//             width: '100%',
//             marginHorizontal: 'auto',
//             paddingHorizontal: 12,
//           },
//         },
//         nodes: [
//           {
//             object: 'block',
//             type: 'headingOne',
//             data: {},
//             nodes: [
//               {
//                 object: 'text',
//                 leaves: [{ object: 'leaf', text: 'Title', marks: [] }],
//               },
//             ],
//           },
//           {
//             object: 'block',
//             type: 'headingTwo',
//             data: {},
//             nodes: [
//               {
//                 object: 'text',
//                 leaves: [{ object: 'leaf', text: 'Subtitle', marks: [] }],
//               },
//             ],
//           },
//           {
//             object: 'block',
//             type: 'text',
//             data: {},
//             nodes: [
//               {
//                 object: 'text',
//                 leaves: [
//                   { object: 'leaf', text: 'Odstavec s ', marks: [] },
//                   {
//                     object: 'leaf',
//                     text: 'bold',
//                     marks: [{ object: 'mark', type: 'bold', data: {} }],
//                   },
//                   { object: 'leaf', text: ' a ', marks: [] },
//                   {
//                     object: 'leaf',
//                     text: 'italic',
//                     marks: [{ object: 'mark', type: 'italic', data: {} }],
//                   },
//                   { object: 'leaf', text: ' a ', marks: [] },
//                   {
//                     object: 'leaf',
//                     text: 'oboje',
//                     marks: [
//                       { object: 'mark', type: 'bold', data: {} },
//                       { object: 'mark', type: 'italic', data: {} },
//                     ],
//                   },
//                   { object: 'leaf', text: '. ', marks: [] },
//                 ],
//               },
//               {
//                 object: 'inline',
//                 type: 'link',
//                 data: { href: 'https://google.com' },
//                 nodes: [
//                   {
//                     object: 'text',
//                     leaves: [{ object: 'leaf', text: 'Link', marks: [] }],
//                   },
//                 ],
//               },
//               {
//                 object: 'text',
//                 leaves: [{ object: 'leaf', text: '.', marks: [] }],
//               },
//             ],
//           },
//           {
//             object: 'block',
//             type: 'list',
//             data: {},
//             nodes: [
//               {
//                 object: 'block',
//                 type: 'listItem',
//                 data: {},
//                 nodes: [
//                   {
//                     object: 'text',
//                     leaves: [{ object: 'leaf', text: 'jedna', marks: [] }],
//                   },
//                 ],
//               },
//               {
//                 object: 'block',
//                 type: 'listItem',
//                 data: {},
//                 nodes: [
//                   {
//                     object: 'text',
//                     leaves: [{ object: 'leaf', text: 'dve', marks: [] }],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             object: 'block',
//             type: 'text',
//             data: {},
//             nodes: [
//               {
//                 object: 'text',
//                 leaves: [{ object: 'leaf', text: 'Footer', marks: [] }],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };
//
// const flat = [];
//
// const walk = (object: Object, path: Array<number>) => {
//   const { nodes, leaves, ...rest } = object;
//   flat.push({
//     ...rest,
//     path: path.join(''),
//   });
//   const children: ?Array<Object> = nodes || leaves;
//   if (!Array.isArray(children)) return;
//   children.forEach((child, index) => {
//     walk(child, path.concat(index));
//   });
// };
//
// walk(slateValue.document, [1]);
// console.log(JSON.stringify(flat, null, 2));

export type EditorAction =
  | {| type: 'BOLD' |}
  | {| type: 'ITALIC' |}
  | {| type: 'HEADING-ONE' |}
  | {| type: 'HEADING-TWO' |}
  | {| type: 'BLOCKQUOTE' |}
  // It's must to use passed change, if any. Slate requires it in onKeyDown.
  | {| type: 'LINK', href: ?string, change?: Object |}
  | {| type: 'FOCUS' |}
  | {| type: 'STYLE', nodeKey: string, style: Object |};

export type OnEditorAction = (action: EditorAction) => void;

// Note Flow types does not replace Slate schema.

export type BlockNodeType =
  | 'view'
  | 'text'
  | 'headingOne'
  | 'headingTwo'
  | 'blockquote'
  | 'list';

export type InlineNodeType = 'listItem' | 'link';

export type NodeType = BlockNodeType | InlineNodeType;

export type MarkType = 'bold' | 'italic';

type BlockNodeData = {| style: { [string]: string | number }, name?: string |};

type TextNode = {|
  leaves: Array<{| text: string |}>,
  object: 'text',
|};

export type BlockNode = {|
  data?: BlockNodeData,
  nodes: Array<BlockNode | TextNode>,
  object: 'block',
  type: BlockNodeType,
|};

export type DocumentNode = {|
  nodes: Array<BlockNode>,
  data?: BlockNodeData,
|};

type DefaultValue = {| object: 'value', document: DocumentNode |};

const defaultValue: DefaultValue = {
  object: 'value',
  document: {
    nodes: [
      {
        object: 'block',
        type: 'view',
        nodes: [
          {
            object: 'block',
            type: 'text',
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
        data: {
          name: 'container',
          style: {
            // https://css-tricks.com/tale-width-max-width/
            maxWidth: 768,
            width: '100%',
            marginHorizontal: 'auto',
            paddingHorizontal: 12,
            // TODO: Should work.
            // flex: 1,
          },
        },
      },
    ],
    data: {
      style: {
        backgroundColor: '#fafafa',
        flex: 1,
      },
    },
  },
};

type EditorHeadProps = {|
  title: string,
|};

class EditorHead extends React.PureComponent<EditorHeadProps> {
  render() {
    return (
      <Head>
        <title>{this.props.title}</title>
      </Head>
    );
  }
}

type EditorProps = {|
  theme: Theme,
  data: Data,
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
    const json = (page && page.content) || defaultValue;
    // console.log(JSON.stringify(json));
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
      const content = value.toJSON();
      this.throttleCommit(content);
    }
  };

  // On space, if it was after an auto-markdown shortcut, convert the current
  // node into the shortcut's corresponding type.
  handleKeySpace = (event, change, next) => {
    const { value } = change;
    const { selection } = value;
    if (selection.isExpanded) return next();

    const { startBlock } = value;
    const { start } = selection;

    const onlyInlines = startBlock.type === 'listItem';
    if (onlyInlines) return next();
    const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '');

    // Get the block type for a series of auto-markdown shortcut `chars`.
    const type = {
      '-': 'listItem',
      '>': 'blockquote',
      '#': 'headingOne',
      '##': 'headingTwo',
    }[chars];

    if (!type) return next();
    event.preventDefault();
    change.setBlocks(type);
    if (type === 'listItem') {
      change.wrapBlock('list');
    }
    change.moveFocusToStartOfNode(startBlock).delete();
  };

  // On backspace, if at the start of a non-text, convert it back into a
  // text node.
  handleKeyBackspace = (event, change, next) => {
    const { value } = change;
    const { selection } = value;
    if (selection.isExpanded) return next();
    if (selection.start.offset !== 0) return next();

    const { startBlock } = value;
    if (startBlock.type === 'text') return next();

    event.preventDefault();
    change.setBlocks('text');

    if (startBlock.type === 'listItem') {
      change.unwrapBlock('list');
    }
  };

  handleKeyEnter = (event, change, next) => {
    const { value } = change;
    const { selection } = value;
    const { start, end, isExpanded } = selection;
    if (isExpanded) return next();

    const { startBlock } = value;
    const caretOnEmptyText = start.offset === 0 && startBlock.text.length === 0;
    if (caretOnEmptyText) return this.handleKeyBackspace(event, change, next);
    const caretInsideBlockText = end.offset !== startBlock.text.length;
    if (caretInsideBlockText) return next();

    const putParagraphAfter =
      startBlock.type === 'headingOne' ||
      startBlock.type === 'headingTwo' ||
      startBlock.type === 'blockquote';
    if (putParagraphAfter) {
      event.preventDefault();
      change.splitBlock().setBlocks('text');
      return;
    }
    return next();
  };

  handleEditorKeyDown = (event: KeyboardEvent, change, next) => {
    const { value } = this.state;
    const { mod, alt, key, code } = hotKey(event);

    switch (key) {
      case ' ':
        return this.handleKeySpace(event, change, next);
      case 'Backspace':
        return this.handleKeyBackspace(event, change, next);
      case 'Enter':
        return this.handleKeyEnter(event, change, next);
    }

    if (!mod) return next();
    switch (key) {
      case 'b':
        this.toggleMark('bold', change);
        return;
      case 'i':
        this.toggleMark('italic', change);
        return;
      case 'k': {
        const { current: editorMenu } = this.editorMenuRef;
        if (editorMenu != null) editorMenu.handleKeyModK(change);
        return;
      }
    }

    if (!alt) return next();
    const onlyInlines = value.startBlock.type === 'listItem';
    if (onlyInlines) return next();

    switch (code) {
      case 49:
        this.toggleBlocks('headingOne', change);
        break;
      case 50:
        this.toggleBlocks('headingTwo', change);
        break;
      default:
        return next();
    }
  };

  handleEditorAction = (action: EditorAction) => {
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
      case 'STYLE': {
        const { nodeKey, style } = action;
        this.change(change => {
          change.setNodeByKey(nodeKey, { data: { style } });
        });
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
      change.setBlocks(isActive ? 'text' : type);
    }, change);
  }

  renderNode = (props, next) => {
    const { attributes, node, children } = props;
    const { styles } = this.props.theme;
    const type = node.type;
    switch (type) {
      case 'view': {
        const style = node.data.get('style');
        return (
          <View {...attributes} style={style}>
            {children}
          </View>
        );
      }
      case 'text':
      case 'headingOne':
      case 'headingTwo': {
        const size = type === 'text' ? 0 : type === 'headingTwo' ? 1 : 2;
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
      default:
        return next();
    }
  };

  renderMark = (props, next) => {
    const { children, mark, attributes } = props;
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
      default:
        return next();
    }
  };

  render() {
    const { page } = this.props.data;
    if (page == null) return null;
    // https://github.com/relayjs/eslint-plugin-relay/issues/35
    // eslint-disable-next-line no-unused-expressions
    page.title;

    const { value } = this.state;
    const documentStyle = value.document.data.get('style');
    return (
      <>
        <EditorHead title={page.draftTitle} />
        <SlateEditor
          autoCorrect={false}
          spellCheck={false}
          ref={this.editorRef}
          autoFocus
          value={value}
          onChange={this.handleEditorChange}
          style={documentStyle}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          onFocus={this.handleEditorFocus}
          onKeyDown={this.handleEditorKeyDown}
        />
        <EditorMenu
          // $FlowFixMe https://github.com/este/este/issues/1571
          ref={this.editorMenuRef}
          value={value}
          onEditorAction={this.handleEditorAction}
        />
        <EditorBreadcrumb
          document={value.document}
          focusPathString={value.selection.focus.path.join(',')}
          onEditorAction={this.handleEditorAction}
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
      }
    }
  `,
);
